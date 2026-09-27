import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Ultra-Dynamic 3D WebGL Kinetic Sculpture with Circadian Chrono-Lighting
 * Features time-of-day chromatic lighting, particle vortex, mechanical gears,
 * and mouse-reactive cyber geometry.
 */
export default function EngineeringCanvas({ 
  lightingMode, 
  blueprintMode = false,
  interactiveRPM = 1.0,
  explodedView = false
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const objectsRef = useRef({});
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 19);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Dynamic Chrono-Lighting Rig
    const ambientLight = new THREE.AmbientLight(lightingMode?.ambientLight || 0x070b14, 2.8);
    scene.add(ambientLight);
    objectsRef.current.ambientLight = ambientLight;

    const keyLight = new THREE.DirectionalLight(lightingMode?.keyLight || 0x00f0ff, 4.2);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);
    objectsRef.current.keyLight = keyLight;

    const rimLight = new THREE.DirectionalLight(lightingMode?.rimLight || 0x8a2be2, 5.0);
    rimLight.position.set(-14, -10, -12);
    scene.add(rimLight);
    objectsRef.current.rimLight = rimLight;

    const pointLight = new THREE.PointLight(lightingMode?.pointLight || 0x00ffff, 3.5, 40);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);
    objectsRef.current.pointLight = pointLight;

    // 4. Kinetic Engineering Assemblage
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    objectsRef.current.root = rootGroup;

    // Layer A: Precision Gear Wheel Armature with 24 Teeth
    const gearGroup = new THREE.Group();
    rootGroup.add(gearGroup);
    objectsRef.current.gearGroup = gearGroup;

    const gearCoreGeo = new THREE.TorusGeometry(6.4, 0.22, 16, 120);
    const gearCoreMat = new THREE.MeshStandardMaterial({
      color: 0x90a0b8,
      metalness: 0.95,
      roughness: 0.18
    });
    const gearCore = new THREE.Mesh(gearCoreGeo, gearCoreMat);
    gearGroup.add(gearCore);

    // 24 Gear Teeth
    const toothGeo = new THREE.BoxGeometry(0.35, 0.9, 0.45);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0x75859e,
      metalness: 0.92,
      roughness: 0.25
    });
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(Math.cos(angle) * 6.5, Math.sin(angle) * 6.5, 0);
      tooth.rotation.z = angle;
      gearGroup.add(tooth);
    }
    gearGroup.rotation.x = Math.PI / 3.2;

    // Layer B: Glowing Geodesic Architectural Truss Core (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(4.5, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: lightingMode?.keyLight || 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    rootGroup.add(icoMesh);
    objectsRef.current.icoMesh = icoMesh;

    // Layer C: High-Density Metallic Turbine Nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(2.6, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x121722,
      metalness: 0.96,
      roughness: 0.14
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    rootGroup.add(nucleusMesh);
    objectsRef.current.nucleusMesh = nucleusMesh;

    // Layer D: Holographic Orbital Coordinate Rings
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(7.8, 7.88, 90),
      new THREE.MeshBasicMaterial({
        color: lightingMode?.accentColor ? parseInt(lightingMode.accentColor.replace('#', '0x'), 16) : 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      })
    );
    ring1.rotation.x = Math.PI / 2.2;
    rootGroup.add(ring1);
    objectsRef.current.ring1 = ring1;

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(8.9, 8.96, 90),
      new THREE.MeshBasicMaterial({
        color: lightingMode?.rimLight || 0x8a2be2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      })
    );
    ring2.rotation.y = Math.PI / 2.5;
    rootGroup.add(ring2);
    objectsRef.current.ring2 = ring2;

    // Layer E: Multi-Color Particle Nebula (Engineers across India)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cAccent = new THREE.Color(lightingMode?.keyLight || 0x00f0ff);
    const cSecondary = new THREE.Color(lightingMode?.rimLight || 0x8a2be2);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.0 + Math.random() * 11.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const rChoice = Math.random();
      const chosen = rChoice > 0.6 ? cAccent : (rChoice > 0.25 ? cSecondary : cWhite);
      colors[i * 3] = chosen.r;
      colors[i * 3 + 1] = chosen.g;
      colors[i * 3 + 2] = chosen.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);
    objectsRef.current.particles = particles;

    // 5. Mouse Interaction Tracking
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Variable RPM & Exploded View Interpolation
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * interactiveRPM;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (rootGroup) {
        rootGroup.rotation.y = time * 0.15 + mouseRef.current.x * 0.4;
        rootGroup.rotation.x = Math.sin(time * 0.1) * 0.2 + mouseRef.current.y * 0.3;
      }

      if (gearGroup) {
        gearGroup.rotation.z = time * 0.25;
        // Exploded view expands outer gear outward
        const targetGearZ = explodedView ? 4.5 : 0;
        gearGroup.position.z += (targetGearZ - gearGroup.position.z) * 0.08;
      }

      if (icoMesh) {
        icoMesh.rotation.y = -time * 0.18;
        icoMesh.rotation.z = Math.sin(time * 0.15) * 0.3;
      }

      if (nucleusMesh) {
        nucleusMesh.rotation.x = time * 0.3;
        nucleusMesh.rotation.y = time * 0.25;
      }

      if (ring1) ring1.rotation.z = time * 0.4;
      if (ring2) ring2.rotation.z = -time * 0.35;
      if (particles) particles.rotation.y = -time * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [interactiveRPM]);

  // Update lighting and materials smoothly when lightingMode or blueprintMode changes
  useEffect(() => {
    const { keyLight, rimLight, ambientLight, pointLight, icoMesh, nucleusMesh, ring1, ring2 } = objectsRef.current;
    if (!keyLight || !lightingMode) return;

    keyLight.color.setHex(lightingMode.keyLight);
    rimLight.color.setHex(lightingMode.rimLight);
    ambientLight.color.setHex(lightingMode.ambientLight);
    pointLight.color.setHex(lightingMode.pointLight);

    if (icoMesh) {
      if (blueprintMode) {
        icoMesh.material.color.setHex(0x00ffff);
        icoMesh.material.opacity = 0.85;
      } else {
        icoMesh.material.color.setHex(lightingMode.keyLight);
        icoMesh.material.opacity = 0.55;
      }
    }

    if (ring1) ring1.material.color.setHex(lightingMode.keyLight);
    if (ring2) ring2.material.color.setHex(lightingMode.rimLight);
  }, [lightingMode, blueprintMode]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ 
        opacity: blueprintMode ? 0.95 : 0.85,
        transition: 'opacity 0.5s ease'
      }}
      aria-hidden="true"
    />
  );
}
