/**
 * ==========================================================================
 * INQUIRY SERVICE
 * Unified client service for chapter inquiries and dispatch desk
 * ==========================================================================
 */

import { CHAPTER_CONFIG } from '@/config';

/**
 * Dispatch an inquiry to the student chapter communication desk.
 * @param {Object} payload
 * @param {string} payload.name - Student or member full name
 * @param {string} payload.email - Student or member institutional email
 * @param {string} payload.category - Category of inquiry
 * @param {string} payload.query - Detailed message or question
 * @returns {Promise<{success: boolean, message: string, details?: any}>}
 */
export async function submitInquiry({ name, email, category, query }) {
  if (!name || !email || !query) {
    throw new Error('Name, email, and query are required fields.');
  }

  const endpoint = CHAPTER_CONFIG.studentQueryEndpoint || '/api/inquiry';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      category: category || 'General Inquiry',
      query: query.trim()
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit inquiry to council desk.');
  }

  return data;
}

export default {
  submitInquiry
};
