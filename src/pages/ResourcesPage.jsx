import React from 'react';
import ResourcesRepository from '../components/ResourcesRepository';

export default function ResourcesPage() {
  return (
    <div className="animate-fadeIn">
      {/* Official Downloads, AMIE Syllabi, Grant-in-Aid, Springer Guidelines & Chapter Bylaws */}
      <ResourcesRepository />
    </div>
  );
}
