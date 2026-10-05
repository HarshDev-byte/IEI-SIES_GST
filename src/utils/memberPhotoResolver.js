/**
 * Authoritative Member Photo Resolver
 * Intelligently computes candidate asset paths for any member across:
 * - Faculty Leadership (/assets/team-portraits/ or /assets/faculty/)
 * - Senior Council (/assets/sc/)
 * - Junior Council (/assets/jc/)
 * - Coordinators / Volunteers (/assets/vols/)
 * 
 * Supports:
 * - Direct PRN naming (e.g. 123A7018.jpg, 123A7018.png)
 * - Slug naming (e.g. tejraj-gujar.jpg, tejraj-gujar.png)
 * - First name naming (e.g. tejraj.jpg)
 * - Formats: .jpg, .png, .jpeg, .webp, .JPG, .PNG
 */

export function getMemberTier(member = {}) {
  const isFaculty = member.category === 'faculty' || 
    member.council === 'Faculty Leadership' ||
    member.role === 'HOD' || 
    member.position === 'HOD' || 
    member.role === 'Student Branch Coordinator' || 
    member.position === 'Student Branch Coordinator' || 
    member.id === 'FAC-01' || 
    member.id === 'FAC-02' ||
    (member.name && (member.name.toLowerCase().includes('kharche') || member.name.toLowerCase().includes('hirani')));

  if (isFaculty) return 'faculty';

  const council = (member.council || '').toLowerCase();
  const category = (member.category || '').toLowerCase();

  if (council.includes('senior') || category === 'executive') {
    return 'sc';
  }
  if (council.includes('junior')) {
    return 'jc';
  }
  return 'vols';
}

export function getMemberPhotoCandidates(member = {}) {
  if (!member) return [];
  const candidates = [];

  // 1. Explicit image or photo defined on member
  if (typeof member.image === 'string' && member.image.trim()) {
    candidates.push(member.image.trim());
  }
  if (typeof member.photo === 'string' && member.photo.trim() && member.photo.trim() !== member.image) {
    candidates.push(member.photo.trim());
  }

  const tier = getMemberTier(member);

  // If faculty, authentic portraits are already configured in /assets/team-portraits/
  if (tier === 'faculty') {
    return candidates;
  }

  const prn = member.prn ? String(member.prn).trim() : null;
  const id = member.id ? String(member.id).trim() : null;
  const cleanName = (member.name || '').replace(/^(Dr\.|Prof\.)\s*/i, '').trim();
  const slug = member.slug || cleanName.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
  const firstName = cleanName.toLowerCase().split(/\s+/)[0];

  // Primary keys: PRN, Slug
  const primaryKeys = [prn, slug].filter(Boolean);
  const secondaryKeys = [id, firstName].filter(Boolean);

  // Common extensions in order of frequency
  const exts = ['jpg', 'png', 'jpeg', 'webp', 'JPG', 'PNG'];

  for (const k of primaryKeys) {
    for (const ext of exts) {
      candidates.push(`/assets/${tier}/${k}.${ext}`);
    }
  }

  for (const k of secondaryKeys) {
    if (primaryKeys.includes(k)) continue;
    candidates.push(`/assets/${tier}/${k}.jpg`);
    candidates.push(`/assets/${tier}/${k}.png`);
  }

  // Also support /assets/team/${tier}/ fallback in case user copied to /assets/team/...
  if (prn) candidates.push(`/assets/team/${tier}/${prn}.jpg`);
  if (slug) candidates.push(`/assets/team/${tier}/${slug}.jpg`);

  // Deduplicate preserving order
  return Array.from(new Set(candidates));
}
