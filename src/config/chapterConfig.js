/**
 * ==========================================================================
 * THE INSTITUTION OF ENGINEERS (INDIA) — SIES GST STUDENT CHAPTER #602
 * Centralized Chapter Configuration & Institutional Constants
 * ==========================================================================
 */

export const CHAPTER_CONFIG = {
  // Institutional Identity
  name: 'IEI SIES GST',
  fullName: 'The Institution of Engineers (India) · SIES GST Student Chapter',
  chapterNumber: '#602',
  parentBody: 'The Institution of Engineers (India)',
  parentHeadquarters: '8 Gokhale Road, Kolkata - 700020, West Bengal, India',
  parentWebsite: 'https://ieindia.org',
  royalCharterYear: '1935',
  
  // Chapter Governance & Tenure
  tenure: 'Tenure 1 (2026–2027)',
  tenureShort: 'Tenure 1',
  tenureYears: '2026–2027',
  status: 'Active Chapter',

  // Collegiate Affiliation
  college: 'SIES Graduate School of Technology',
  collegeShort: 'SIES GST',
  department: 'Department of Electronics & Computer Science',
  departmentShort: 'Dept. of ECS',
  location: 'Sector-V, Nerul, Navi Mumbai - 400706, Maharashtra, India',
  
  // Communication & Council Desks
  email: 'iei@sies.edu.in',
  studentQueryEndpoint: '/api/inquiry',

  // Social & Official External Links
  links: {
    officialIEI: 'https://ieindia.org',
    collegeWebsite: 'https://siesgst.edu.in',
    amiePortal: 'https://www.ieindia.org/webui/iei-home.aspx',
    charteredEngineer: 'https://www.ieindia.org/webui/IEI-Registration.aspx',
    linkedin: 'https://www.linkedin.com/company/iei-sies-gst',
    instagram: 'https://www.instagram.com/ieisiesgst/'
  }
};

export const NAVIGATION_ROUTES = [
  { id: 'about', label: 'About', hash: '#/' },
  { id: 'activities', label: 'Activities', hash: '#/activities' },
  { id: 'events', label: 'Events', hash: '#/events' },
  { id: 'team', label: 'Team', hash: '#/team' },
  { id: 'resources', label: 'Resources', hash: '#/resources' },
  { id: 'hub', label: 'Student Hub', hash: '#/hub' }
];

export default CHAPTER_CONFIG;
