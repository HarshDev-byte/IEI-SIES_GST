import React from 'react';
import AboutIEIOverview from '../components/AboutIEIOverview';
import NationalQuickFacts from '../components/NationalQuickFacts';
import CampusHeadquarters from '../components/CampusHeadquarters';

export default function AboutPage({ onOpenMembership }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. National Quick Facts Strip */}
      <NationalQuickFacts />

      {/* 02. Comprehensive About IEI (Overview, Vision & Mission, History, Global Accords, SIES GST Chapter) */}
      <AboutIEIOverview onOpenMembership={onOpenMembership} />

      {/* 03. Campus Headquarters & Contact */}
      <CampusHeadquarters />
    </div>
  );
}
