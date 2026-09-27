import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#FAFAFC] border-t border-black/[0.08] pt-16 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 z-10" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto">
        
        {/* Wordmark Header */}
        <div className="border-b border-black/[0.08] pb-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src="/iei-official-logo.png" alt="IEI Logo" className="w-8 h-8 object-contain" />
              <h2 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-ultra-tight">
                IEI SIES GST
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-500 mt-1">
              Official Student Chapter · Department of Electronics &amp; Computer Science Engineering
            </p>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-black/[0.06]">
          
          {/* Col 1: National Headquarters */}
          <div>
            <div className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
              National Headquarters
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-3">
              <strong>The Institution of Engineers (India)</strong><br />
              8 Gokhale Road, Kolkata - 700020<br />
              West Bengal, India<br />
              <a href="https://www.ieindia.org" target="_blank" rel="noopener noreferrer" className="text-[#0062FF] hover:underline">
                ieindia.org
              </a>
            </p>
            <div className="font-mono text-[10px] text-zinc-500">
              Royal Charter 1935 · Recognized SIRO (DSIR)
            </div>
          </div>

          {/* Col 2: Directory */}
          <div>
            <div className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
              National Directory
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 font-medium">
              <li><a href="#/" className="hover:text-black transition-colors">Home Page</a></li>
              <li><a href="#/about" className="hover:text-black transition-colors">About IEI &amp; Heritage</a></li>
              <li><a href="#/what-we-do" className="hover:text-black transition-colors">What IEI Does (AMIE / CEng)</a></li>
              <li><a href="#/membership" className="hover:text-black transition-colors">Membership Grades &amp; SMIE</a></li>
            </ul>
          </div>

          {/* Col 3: Chapter & Programs */}
          <div>
            <div className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
              SIES GST Chapter
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 font-medium">
              <li><a href="#/activities" className="hover:text-black transition-colors">Workshops &amp; Activities</a></li>
              <li><a href="#/events" className="hover:text-black transition-colors">Events &amp; Symposia</a></li>
              <li><a href="#/team" className="hover:text-black transition-colors">Leadership &amp; 7 Wings</a></li>
              <li><a href="#/resources" className="hover:text-black transition-colors">Resources &amp; Publications</a></li>
              <li><a href="#/hub" className="hover:text-black transition-colors">Student Hub &amp; Digital Pass</a></li>
            </ul>
          </div>

          {/* Col 4: Campus & Contact */}
          <div>
            <div className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
              Campus Headquarters
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-3">
              Department of ECS<br />
              SIES Graduate School of Technology<br />
              Sector-V, Nerul, Navi Mumbai - 400706
            </p>
            <ul className="space-y-2 text-xs text-zinc-600 font-medium">
              <li>
                <a href="#contact" className="hover:text-black transition-colors flex items-center gap-1.5">
                  <MapPin size={12} className="text-zinc-500" />
                  <span>Campus Location</span>
                </a>
              </li>
              <li>
                <a href="mailto:iei@siesgst.ac.in" className="hover:text-black transition-colors flex items-center gap-1.5">
                  <Mail size={12} className="text-[#0062FF]" />
                  <span>iei@siesgst.ac.in</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
          <div>
            © 2026 The Institution of Engineers (India) · SIES GST Student Chapter.
          </div>
          <div className="flex items-center gap-3">
            <span>Institutional Non-Profit Body</span>
            <span>·</span>
            <a href="#contact" className="hover:text-black underline">Contact Chapter Office</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
