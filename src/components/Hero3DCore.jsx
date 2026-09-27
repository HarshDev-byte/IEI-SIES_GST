import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RefreshCw, Eye, Zap, Layers } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Hero3DCore() {
  const mountRef = useRef(null);
  const [activePreset, setActivePreset] = useState('quantum'); // 'quantum' | 'gyro' | 'neural'
  const [isHovered, setIsHovered] = useState(false);
  const [fps, setFps] = useState(60);

  const presetRef = useRef(activePreset);
  presetRef.current = activePreset;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Group for all core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0062ff, 4, 20);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const goldLight = new THREE.PointLight(0xc28b38, 3, 20);
    goldLight.position.set(-5, -5, -3);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 15);
    cyanLight.position.set(0, 6, 2);
    scene.add(cyanLight);

    // 2. CENTRAL GEOMETRIES FOR MODES
    // Mode 1: Quantum Core (Icosahedron + Wireframe cage)
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x0062ff,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icosahedron);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x0044bb,
      emissiveIntensity: 0.4
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // Mode 2: Aerospace Gyro Gimbal Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x0062ff,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true
    });
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0xc28b38,
      metalness: 0.95,
      roughness: 0.1
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.035, 16, 100), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.025, 16, 100), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.03, 16, 100), ringMat3);
    
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // Mode 3: Particle Cloud (Orbital Telemetry Swarm)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cBlue = new THREE.Color(0x0062ff);
    const cGold = new THREE.Color(0xc28b38);
    const cCyan = new THREE.Color(0x00f0ff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? cBlue : Math.random() > 0.5 ? cCyan : cGold;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleCloud);

    // Mouse Tracking & Smooth Slerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotY = mouseX * 1.2;
      targetRotX = -mouseY * 1.2;
    };

    container.addEventListener('pointermove', handlePointerMove);

    // Click Shockwave Burst
    const handleClick = () => {
      audioEngine.playChapterPulse();
      // Expand rings & particles temporarily
      ring1.scale.set(1.15, 1.15, 1.15);
      ring2.scale.set(1.2, 1.2, 1.2);
      ring3.scale.set(1.25, 1.25, 1.25);
      innerSphere.scale.set(1.3, 1.3, 1.3);

      setTimeout(() => {
        ring1.scale.set(1, 1, 1);
        ring2.scale.set(1, 1, 1);
        ring3.scale.set(1, 1, 1);
        innerSphere.scale.set(1, 1, 1);
      }, 350);
    };

    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const startTime = performance.now();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;
      const currentPreset = presetRef.current;

      // FPS tracking
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      // Smooth camera / group rotation damping towards mouse
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.05;

      // Mode-specific rotational speeds
      if (currentPreset === 'quantum') {
        icosahedron.visible = true;
        innerSphere.visible = true;
        icosahedron.rotation.x = elapsedTime * 0.35;
        icosahedron.rotation.y = elapsedTime * 0.5;
        innerSphere.rotation.y = -elapsedTime * 0.2;

        ring1.rotation.x = elapsedTime * 0.4;
        ring1.rotation.y = elapsedTime * 0.2;
        ring2.rotation.y = -elapsedTime * 0.3;
        ring2.rotation.z = elapsedTime * 0.15;
        ring3.rotation.z = elapsedTime * 0.25;

        particleCloud.rotation.y = elapsedTime * 0.12;
      } else if (currentPreset === 'gyro') {
        icosahedron.visible = false;
        innerSphere.visible = true;

        ring1.rotation.x = elapsedTime * 0.9;
        ring2.rotation.y = elapsedTime * 0.7;
        ring3.rotation.z = -elapsedTime * 0.8;

        particleCloud.rotation.y = -elapsedTime * 0.08;
      } else if (currentPreset === 'neural') {
        icosahedron.visible = true;
        innerSphere.visible = false;
        icosahedron.rotation.x = elapsedTime * 0.15;
        icosahedron.rotation.y = elapsedTime * 0.2;

        ring1.rotation.x = elapsedTime * 0.1;
        ring2.rotation.y = elapsedTime * 0.15;
        ring3.rotation.z = elapsedTime * 0.08;

        particleCloud.rotation.y = elapsedTime * 0.35;
        particleCloud.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="relative w-full aspect-square max-w-[460px] rounded-3xl border border-black/10 bg-white/90 backdrop-blur-xl shadow-[0_25px_60px_-10px_rgba(0,98,255,0.15),_0_0_0_1px_rgba(255,255,255,0.9)_inset] p-5 flex flex-col justify-between overflow-hidden group select-none transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,98,255,0.22)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Architectural Vector Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top HUD Telemetry Strip */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-zinc-500 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-900 tracking-wider">3D SILICON KINETIC CORE</span>
        </div>
        
        <div className="flex items-center gap-2 font-mono text-[9px] bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-600">
          <span>{fps} FPS</span>
          <span>·</span>
          <span className="text-[#0062FF] font-bold">WEBGL 2.0</span>
        </div>
      </div>

      {/* Interactive 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="relative my-auto w-full aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Interactive 3D Engine: Drag to rotate, click to pulse"
      >
        {/* Central Overlay HUD Crosshair (When Hovered) */}
        <div className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-80' : 'opacity-0'
        }`}>
          <div className="w-48 h-48 rounded-full border border-[#0062FF]/20 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-dashed border-[#0062FF]/30 animate-spin" />
          </div>
        </div>

        {/* Central IEI Emblem Hover Badge */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-black/10 bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <img src="/iei-official-logo.png" alt="IEI Emblem" className="w-full h-full object-contain filter drop-shadow-xs" />
          </div>
        </div>
      </div>

      {/* Bottom Mode Switcher HUD Dock */}
      <div className="relative z-10 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-zinc-100/80 p-1 rounded-xl border border-black/5 font-mono text-[10px]">
          <button
            onClick={() => {
              setActivePreset('quantum');
              audioEngine.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
              activePreset === 'quantum' 
                ? 'bg-white text-[#0062FF] shadow-xs' 
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            QUANTUM
          </button>

          <button
            onClick={() => {
              setActivePreset('gyro');
              audioEngine.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
              activePreset === 'gyro' 
                ? 'bg-white text-[#0062FF] shadow-xs' 
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            GYRO
          </button>

          <button
            onClick={() => {
              setActivePreset('neural');
              audioEngine.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
              activePreset === 'neural' 
                ? 'bg-white text-[#0062FF] shadow-xs' 
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            NEURAL
          </button>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400">
          <Zap size={11} className="text-amber-500 animate-pulse" />
          <span>DRAG TO TILT</span>
        </div>
      </div>

    </div>
  );
}
