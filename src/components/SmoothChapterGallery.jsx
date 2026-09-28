import React from 'react';
import { Camera } from 'lucide-react';

export default function SmoothChapterGallery() {
  return (
    <section id="gallery" className="relative py-16 sm:py-20 z-10" aria-label="Chapter Photographic Archive">
      

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-black/[0.08]">
        <div>
          <h3 className="font-display text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            Chapter Photographic Archive
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
            Visual documentation of hands-on laboratory testbenches, technical symposiums, hackathons, and collegiate investitures at SIES GST.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-medium">
            Archive in preparation for academic term
          </span>
        </div>
      </div>

      {/* COMING SOON CARD */}
      <div className="relative rounded-3xl bg-white border border-black/10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* SHOWCASE BODY */}
        <div className="p-8 sm:p-14 lg:p-16 text-center relative">
          
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            
            {/* Camera Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-50 border border-black/[0.08] flex items-center justify-center text-[#0062FF] mb-6 shadow-2xs">
              <Camera size={32} strokeWidth={1.75} />
            </div>

            {/* Core Heading */}
            <h4 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight mb-4">
              Upcoming Events &amp; Photographic Archive
            </h4>

            {/* Description */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal mb-8">
              Our upcoming lineup of hands-on laboratory testbenches, inter-collegiate hackathons, expert industry keynotes, and technical symposia is currently being finalized with faculty patrons and mentors. Full photographic documentation, session highlights, and event galleries will be published here as each event concludes.
            </p>

            {/* 4 Clean Topic Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-700 text-xs font-medium border border-black/[0.06]">
                Hands-on Testbenches
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-700 text-xs font-medium border border-black/[0.06]">
                Collegiate Hackathons
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-700 text-xs font-medium border border-black/[0.06]">
                Industry Keynotes
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-700 text-xs font-medium border border-black/[0.06]">
                Technical Symposia
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
