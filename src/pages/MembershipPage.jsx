import React from 'react';
import MembershipGrades from '../components/MembershipGrades';
import NationalQuickFacts from '../components/NationalQuickFacts';

export default function MembershipPage({ onOpenMembership }) {
  return (
    <div className="animate-fadeIn">
      {/* 01. Complete Membership Grades & How to Join as SMIE */}
      <MembershipGrades onOpenMembership={onOpenMembership} />

      {/* 02. National Stats Strip */}
      <NationalQuickFacts />
    </div>
  );
}
