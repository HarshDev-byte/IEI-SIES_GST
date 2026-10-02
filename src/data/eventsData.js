/**
 * ============================================================================
 * IEI SIES GST — OFFICIAL EVENTS DATA SOURCE (SINGLE TEMPLATE EVENT)
 * ============================================================================
 * 
 * 📌 GUIDE FOR THE IEI TECHNICAL TEAM:
 * 
 * To update this event on the Events & Symposia page, simply edit the fields below!
 * Changes reflect automatically on the website.
 * 
 * FIELD REFERENCE:
 * - id: Unique identifier (e.g. "innovex-2026")
 * - title: Main event title
 * - category: Category tag (e.g. "FLAGSHIP HACKATHON", "TECHNICAL WORKSHOP", "SYMPOSIUM")
 * - badge: Status text (e.g. "UPCOMING", "REGISTRATIONS OPEN", "CALL FOR PAPERS")
 * - date: Event date string (e.g. "October 24–25, 2026" or "Date To Be Announced")
 * - time: Timing string (e.g. "09:00 AM – 05:00 PM IST")
 * - venue: Venue location (e.g. "Auditorium & ECS Labs, SIES GST, Nerul")
 * - description: Concise summary of the event
 * - highlights: Array of 3-4 bullet points
 * - eligibility: Eligible student groups/disciplines
 * - registrationLink: URL to registration form (Google Form, Unstop, etc.)
 * - rulebookLink: Optional URL to rulebook or syllabus PDF
 * - image: Banner image path or external URL
 * ============================================================================
 */

export const eventsData = [
  {
    id: "flagship-event-2026",
    title: "Event Title: Enter Event or Hackathon Name",
    category: "FLAGSHIP SYMPOSIUM",
    badge: "UPCOMING",
    date: "Date To Be Announced, 2026",
    time: "09:00 AM – 05:00 PM IST",
    venue: "Auditorium & Engineering Labs, SIES GST, Nerul",
    description: "Brief overview of the upcoming flagship technical conclave or competition hosted by the IEI SIES GST Student Chapter. Edit this description with the official problem statement, speaker details, and schedule.",
    highlights: [
      "Key Competition Theme & Challenges",
      "Hands-on Engineering Testbenches",
      "Industry Mentorship & Professional Evaluation",
      "Official IEI Participation Credentials"
    ],
    eligibility: "Open to all Engineering Undergraduates across disciplines",
    registrationLink: "https://forms.gle/iei-sies-gst-registration",
    rulebookLink: "",
    image: "/assets/events/innovex-hackathon-2026.jpg",
    isFeatured: true
  }
];

export default eventsData;
