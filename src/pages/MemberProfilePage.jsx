import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { getMemberById, membersData, getInitials, getMemberBio } from '../data/membersData';
import { audioEngine } from '../utils/audioEngine';
import './MemberProfilePage.css';

// Standalone SVG Icons
const LinkedInIcon = ({ size = 15, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 15, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * ============================================================================
 * IEI SIES GST — SIMPLIFIED MEMBER PROFILE ARCHITECTURE
 * Strictly:
 * 1. LARGE PORTRAIT PHOTO
 * 2. NAME
 * 3. POSITION
 * 4. SOCIAL ACTIONS (LinkedIn, GitHub, Email)
 * 
 * Guarantees:
 * - No digital ID, PRN, verification badges, QR codes, or credential cards.
 * - Social buttons have strictly isolated independent hover animations.
 * - Existing QR destinations (/member/:id) continue to resolve flawlessly.
 * ============================================================================
 */
export default function MemberProfilePage({ memberId }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Fallback to first member if ID/slug not found
  const member = getMemberById(memberId) || membersData[0];
  const initials = getInitials(member.name);
  const photo = member.image || member.photo || null;
  const bio = getMemberBio(member);

  // Social handles (authoritative values with deterministic fallback)
  const cleanName = (member.name || '').replace(/^(Dr\.|Prof\.)\s*/i, '').trim();
  const slug = member.slug || cleanName.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
  const nameParts = cleanName.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'member';
  const lastName = nameParts[nameParts.length - 1] || 'iei';

  const linkedinUrl = member.linkedin || member.socials?.linkedin || `https://www.linkedin.com/in/${slug}`;
  const githubUrl = member.github || member.socials?.github || `https://github.com/${slug}`;
  const email = member.email || member.socials?.email || `${firstName}.${lastName}@siesgst.ac.in`;
  const hasAnySocial = Boolean(linkedinUrl || githubUrl || email);

  const navigateBack = () => {
    if (audioEngine?.playClick) audioEngine.playClick();
    window.location.hash = '#/team';
  };

  return (
    <div className="member-profile-page-root animate-fadeIn">
      <div className="member-profile-container">
        
        {/* Navigation Return */}
        <div className="member-profile-nav">
          <button
            type="button"
            onClick={navigateBack}
            className="member-back-btn"
            aria-label="Back to Team"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Team</span>
          </button>
        </div>

        {/* Simplified Profile Core */}
        <div className="member-profile-card">
          
          {/* 1. LARGE PORTRAIT */}
          <div className="member-portrait-frame">
            {photo && !imgFailed ? (
              <img 
                src={photo} 
                alt={member.name}
                onError={() => setImgFailed(true)}
                className="member-portrait-img"
                loading="eager"
              />
            ) : (
              <div className="member-portrait-fallback" aria-hidden="true">
                <span>{initials}</span>
              </div>
            )}
          </div>

          {/* 2. NAME */}
          <h1 className="member-profile-name">
            {member.name}
          </h1>

          {/* 3. POSITION */}
          <div className="member-profile-position">
            {member.position || member.role}
            {member.branch ? ` • Dept. of ${member.branch}` : ''}
          </div>

          {/* 4. BIOGRAPHY */}
          {bio && (
            <p className="member-profile-bio">
              {bio}
            </p>
          )}

          {/* 5. SOCIAL ACTIONS (Clean Standalone Action Group) */}
          {hasAnySocial && (
            <div className="profile-social-actions" aria-label={`Social links for ${member.name}`}>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn — ${member.name}`}
                  className="profile-social-btn btn-linkedin"
                >
                  <LinkedInIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub — ${member.name}`}
                  className="profile-social-btn btn-github"
                >
                  <GitHubIcon size={15} />
                  <span>GitHub</span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email — ${member.name}`}
                  className="profile-social-btn btn-email"
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
