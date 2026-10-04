import React from 'react';
import Hero from '../components/Hero';
import WhatIEIDoes from '../components/WhatIEIDoes';
import SmoothChapterGallery from '../components/SmoothChapterGallery';
import ActivitiesSection from '../components/ActivitiesSection';
import CampusHeadquarters from '../components/CampusHeadquarters';
import SponsorsSection from '../components/SponsorsSection';

export default function HomePage({ onOpenVerify, onOpenMembership, isReady = true }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. Monumental Hero with Official Emblem, Interactive Core & Telemetry */}
      <Hero 
        onExploreClick={() => {
          const el = document.getElementById('what-we-do') || document.getElementById('chapter-overview');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVerify={onOpenVerify}
        isReady={isReady}
      />

      {/* 02. What IEI Does & Frequently Asked Questions */}
      <WhatIEIDoes 
        onOpenVerify={onOpenVerify}
        onOpenMembership={onOpenMembership}
      />

      {/* 03. Smooth Photographic Gallery & Visual Documentation Archive */}
      <SmoothChapterGallery />

      {/* 04. Featured Activities (Interactive 4-Track Tabbed System) */}
      <ActivitiesSection onOpenMembership={onOpenMembership} />

      {/* 05. Campus Headquarters, Affiliations & Direct Dispatch Desk */}
      <CampusHeadquarters />

      {/* 06. Institutional Major Sponsors Section */}
      <SponsorsSection />
    </div>
  );
}
