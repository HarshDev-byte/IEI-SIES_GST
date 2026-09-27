import React from 'react';
import WhatIEIDoes from '../components/WhatIEIDoes';
import NationalQuickFacts from '../components/NationalQuickFacts';

export default function WhatWeDoPage({ onOpenVerify, onOpenMembership }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. What IEI Does — 7 Primary Functions */}
      <WhatIEIDoes 
        onOpenVerify={onOpenVerify} 
        onOpenMembership={onOpenMembership} 
      />

      {/* 02. National Stats Strip */}
      <NationalQuickFacts />
    </div>
  );
}
