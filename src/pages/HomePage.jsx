import React from 'react';
import Hero from '../components/Hero';
import NationalQuickFacts from '../components/NationalQuickFacts';
import AboutIEIOverview from '../components/AboutIEIOverview';
import WhatIEIDoes from '../components/WhatIEIDoes';
import SmoothChapterGallery from '../components/SmoothChapterGallery';
import CampusHeadquarters from '../components/CampusHeadquarters';
import SponsorsSection from '../components/SponsorsSection';

export default function HomePage({ onOpenVerify, isReady = true }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. Monumental Hero with Official Emblem, Interactive Core & Telemetry */}
      <Hero 
        onExploreClick={() => {
          const el = document.getElementById('quick-facts');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVerify={onOpenVerify}
        isReady={isReady}
      />

      {/* 02. National Quick Facts & SIES GST Real-Time Chapter Telemetry */}
      <div id="quick-facts">
        <NationalQuickFacts />
      </div>

      {/* 03. About IEI (Vision, Mission, Century History Timeline, Global Accords & Chapter) */}
      <AboutIEIOverview />

      {/* 04. What IEI Does — 7 Primary Statutory & Professional Functions */}
      <WhatIEIDoes 
        onOpenVerify={onOpenVerify}
      />



      {/* 06. Smooth Photographic Gallery & Visual Documentation Archive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/[0.08]">
        <SmoothChapterGallery />
      </div>

      {/* 07. Campus Headquarters, Affiliations & Direct Dispatch Desk */}
      <CampusHeadquarters />

      {/* 08. Institutional Major Sponsors Section */}
      <SponsorsSection />
    </div>
  );
}
