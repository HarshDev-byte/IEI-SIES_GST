import React from 'react';
import Hero from '../components/Hero';
import WhatIEIDoes from '../components/WhatIEIDoes';
import SmoothChapterGallery from '../components/SmoothChapterGallery';
import CampusHeadquarters from '../components/CampusHeadquarters';
import SponsorsSection from '../components/SponsorsSection';

import ChapterEditorialNarrative from '../components/ChapterEditorialNarrative';

export default function HomePage({ onOpenVerify, isReady = true }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. Monumental Hero with Official Emblem, Interactive Core & Telemetry */}
      <Hero 
        onExploreClick={() => {
          const el = document.getElementById('chapter-overview');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVerify={onOpenVerify}
        isReady={isReady}
      />

      {/* 02. Chapter Editorial Narrative (01 Who We Are · 02 What We Do · 03 Focus · 04 Initiative) */}
      <ChapterEditorialNarrative />

      {/* 03. What IEI Does & Frequently Asked Questions */}
      <WhatIEIDoes 
        onOpenVerify={onOpenVerify}
      />

      {/* 06. Smooth Photographic Gallery & Visual Documentation Archive (No divider line) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SmoothChapterGallery />
      </div>

      {/* 07. Campus Headquarters, Affiliations & Direct Dispatch Desk */}
      <CampusHeadquarters />

      {/* 08. Institutional Major Sponsors Section */}
      <SponsorsSection />
    </div>
  );
}
