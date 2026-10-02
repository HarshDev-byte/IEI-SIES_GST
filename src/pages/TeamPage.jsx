import React from 'react';
import LeadershipSpotlight from '../components/LeadershipSpotlight';
import GovernanceTeam from '../components/GovernanceTeam';
import SponsorsSection from '../components/SponsorsSection';

export default function TeamPage() {
  return (
    <div className="animate-fadeIn">
      {/* 00 — THE PEOPLE • HERO HEADER AT START OF TEAM WEBPAGE */}
      <section className="relative pt-28 sm:pt-32 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-ultra-tight uppercase leading-none mb-2">
            THE PEOPLE
          </h1>
          <p className="font-display text-xl sm:text-2xl text-zinc-600 font-bold mb-4 tracking-tight">
            BEHIND IEI SIES GST
          </p>

          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            The engineering minds, student leadership council, and specialized domain wings driving academic innovation, technical research, and institutional excellence.
          </p>
        </div>
      </section>

      {/* 01 — Faculty Leadership & 02 — Executive Leadership with Dual-Layer Monochrome-to-Color Interaction */}
      <LeadershipSpotlight />

      {/* 03 — Domain Universe: 6 Domain Wings & Chapter Core Hierarchy */}
      <GovernanceTeam />

      {/* Major Institutional Sponsors Rail */}
      <SponsorsSection />
    </div>
  );
}
