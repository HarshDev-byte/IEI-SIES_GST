import React from 'react';
import GovernanceTeam from '../components/GovernanceTeam';
import SponsorsSection from '../components/SponsorsSection';

export default function TeamPage() {
  return (
    <div className="animate-fadeIn">
      {/* Complete Faculty Leadership, Executive Council & 7 Domain Wings */}
      <GovernanceTeam />

      {/* Major Institutional Sponsors Rail */}
      <SponsorsSection />
    </div>
  );
}
