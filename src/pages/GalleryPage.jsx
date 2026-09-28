import React from 'react';
import SmoothChapterGallery from '../components/SmoothChapterGallery';
import SponsorsSection from '../components/SponsorsSection';

export default function GalleryPage() {
  return (
    <div className="animate-fadeIn pt-16">
      {/* Chapter Photographic Archive — Layered Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmoothChapterGallery />
      </div>

      {/* Institutional Sponsors */}
      <SponsorsSection />
    </div>
  );
}
