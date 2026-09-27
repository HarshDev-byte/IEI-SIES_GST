import React from 'react';
import StudentHub from '../components/StudentHub';

export default function StudentHubPage({ onApplyStudentMembership }) {
  return (
    <div className="animate-fadeIn">
      {/* Student Hub: Encrypted Digital Pass Generator, Collegiate Projects & SMIE Application */}
      <StudentHub onApplyStudentMembership={onApplyStudentMembership} />
    </div>
  );
}
