// ============================================================================
// IEI SIES GST STUDENT CHAPTER 2026-27 — AUTHORITATIVE TEAM DATA SOURCE
// Source: Official Chapter Appointment Document
// Constraint: Strictly verbatim data. No fabricated bios, photos, or socials.
// ============================================================================

// Helper to derive initials from a name
export const getInitials = (name) => {
  if (!name) return "IEI";
  const parts = name.replace(/^(Dr\.|Prof\.)\s*/, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// 1. FACULTY LEADERSHIP
export const facultyLeadership = [
  {
    id: "FAC-01",
    name: "Dr. Shubhangi Kharche",
    position: "HOD ECS",
    branch: "ECS",
    prn: null,
    council: "Faculty Leadership",
    domain: "Academic Oversight",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "FAC-02",
    name: "Prof. Jasmin Hirani",
    position: "Faculty Coordinator",
    branch: "ECS",
    prn: null,
    council: "Faculty Leadership",
    domain: "Chapter Coordination",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "FAC-03",
    name: "Dr. K. Lakshmisudha",
    position: "Principal",
    branch: null,
    prn: null,
    council: "Faculty Leadership",
    domain: "Institutional Governance",
    photo: null,
    bio: null,
    socials: null
  }
];

// 2. SENIOR COUNCIL
export const seniorCouncil = [
  {
    id: "123A7018",
    name: "Tejraj Gujar",
    branch: "ECS",
    prn: "123A7018",
    position: "Chairperson",
    council: "Senior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A8043",
    name: "Sarang Patil",
    branch: "ECS",
    prn: "123A8043",
    position: "Vice Chairperson",
    council: "Senior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7016",
    name: "Shardul Gade",
    branch: "ECS",
    prn: "123A7016",
    position: "Secretary",
    council: "Senior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7020",
    name: "Harshad Jadhav",
    branch: "ECS",
    prn: "123A7020",
    position: "Treasurer",
    council: "Senior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A8001",
    name: "A S Lakshanya",
    branch: "AIDS",
    prn: "123A8001",
    position: "Event and Community Manager",
    council: "Senior Council",
    domain: "Community",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7002",
    name: "Anushka Pawar",
    branch: "ECS",
    prn: "123A7002",
    position: "Event and Community Manager",
    council: "Senior Council",
    domain: "Community",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7019",
    name: "Harsh Mhatre",
    branch: "ECS",
    prn: "123A7019",
    position: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7011",
    name: "Sahil Chavan",
    branch: "ECS",
    prn: "123A7011",
    position: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7009",
    name: "Soham Chafale",
    branch: "ECS",
    prn: "123A7009",
    position: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7027",
    name: "Aditya Kinikar",
    branch: "ECS",
    prn: "123A7027",
    position: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7001",
    name: "Ananya Siddayyanavar",
    branch: "ECS",
    prn: "123A7001",
    position: "Creative Mentor",
    council: "Senior Council",
    domain: "Creative",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "2247068",
    name: "Ayush Tandel",
    branch: "ECS",
    prn: "2247068",
    position: "Media Mentor",
    council: "Senior Council",
    domain: "Media",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "122A7021",
    name: "Kaushik Yadav",
    branch: null, // IMPORTANT: Explicitly NOT SPECIFIED in source document
    prn: "122A7021",
    position: "Media Mentor",
    council: "Senior Council",
    domain: "Media",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "123A7053",
    name: "Shravani Khedkar",
    branch: "ECS",
    prn: "123A7053",
    position: "Design Mentor",
    council: "Senior Council",
    domain: "Design",
    photo: null,
    bio: null,
    socials: null
  }
];

// 3. JUNIOR COUNCIL
export const juniorCouncil = [
  {
    id: "124A7003",
    name: "Prathamesh Bhagwat",
    branch: "ECS",
    prn: "124A7003",
    position: "Joint Secretary",
    council: "Junior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A1118",
    name: "Indrayani Patil",
    branch: "CE",
    prn: "124A1118",
    position: "Joint Secretary",
    council: "Junior Council",
    domain: "Executive",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7052",
    name: "Saran Rajasekhar",
    branch: "ECS",
    prn: "124A7052",
    position: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7061",
    name: "Manas Suryawanshi",
    branch: "ECS",
    prn: "124A7061",
    position: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7036",
    name: "Hariom Mohare",
    branch: "ECS",
    prn: "124A7036",
    position: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7045",
    name: "Kaustubh Patil",
    branch: "ECS",
    prn: "124A7045",
    position: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7041",
    name: "Advaith Nair",
    branch: "ECS",
    prn: "124A7041",
    position: "Industry Outreach & Admin Head",
    council: "Junior Council",
    domain: "Industry Outreach & Admin",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7026",
    name: "Harshit Lahari",
    branch: "ECS",
    prn: "124A7026",
    position: "Industry Outreach & Admin Head",
    council: "Junior Council",
    domain: "Industry Outreach & Admin",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A3052",
    name: "Gauri Shinde",
    branch: "IT",
    prn: "124A3052",
    position: "Design Head",
    council: "Junior Council",
    domain: "Design",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7028",
    name: "Maadeshselvan Chidambarakuthala",
    branch: "ECS",
    prn: "124A7028",
    position: "Creative Head",
    council: "Junior Council",
    domain: "Creative",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A2059",
    name: "Sana Tankar",
    branch: "EXTC",
    prn: "124A2059",
    position: "Creative Head",
    council: "Junior Council",
    domain: "Creative",
    photo: null,
    bio: null,
    socials: null
  },
  {
    id: "124A7051",
    name: "Nimish Roge",
    branch: "ECS",
    prn: "124A7051",
    position: "Design & Media Head",
    council: "Junior Council",
    domain: "Design & Media",
    photo: null,
    bio: null,
    socials: null
  }
];

// 4. ACTIVE COORDINATORS (Grouped by Wing)
export const coordinatorsData = {
  technical: [
    {
      id: "125A7059",
      name: "Krishna Tiwari",
      branch: "ECS",
      prn: "125A7059",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7046",
      name: "Riya Prajapati",
      branch: "ECS",
      prn: "125A7046",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7031",
      name: "Himanshu Katarnavare",
      branch: "ECS",
      prn: "125A7031",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7010",
      name: "Parth Bhobekar",
      branch: "ECS",
      prn: "125A7010",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7026",
      name: "Aqsa Inamdar",
      branch: "ECS",
      prn: "125A7026",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7023",
      name: "Shankilya Gharat",
      branch: "ECS",
      prn: "125A7023",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7036",
      name: "Shravani Mayekar",
      branch: "ECS",
      prn: "125A7036",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7055",
      name: "Bhavesh Sonawane",
      branch: "ECS",
      prn: "125A7055",
      position: "Technical Coordinator",
      council: "Coordinators",
      domain: "Technical",
      photo: null,
      bio: null,
      socials: null
    }
  ],
  outreach: [
    {
      id: "125A7013",
      name: "Tejas Borse",
      branch: "ECS",
      prn: "125A7013",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7060",
      name: "Shivkumar Udaiyar",
      branch: "ECS",
      prn: "125A7060",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7035",
      name: "Surud Mahajan",
      branch: "ECS",
      prn: "125A7035",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7037",
      name: "Sharvin Mhatre",
      branch: "ECS",
      prn: "125A7037",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7047",
      name: "Gungun Purawat",
      branch: "ECS",
      prn: "125A7047",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7017",
      name: "Saumitra Chavan",
      branch: "ECS",
      prn: "125A7017",
      position: "Industry Outreach & Admin Coordinator",
      council: "Coordinators",
      domain: "Industry Outreach & Admin",
      photo: null,
      bio: null,
      socials: null
    }
  ],
  editorial: [
    {
      id: "125A7040",
      name: "Ronak Pansare",
      branch: "ECS",
      prn: "125A7040",
      position: "Editorial Coordinator",
      council: "Coordinators",
      domain: "Editorial",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A051",
      name: "Grahit Shetty",
      branch: "ECS",
      prn: "125A051",
      position: "Editorial Coordinator",
      council: "Coordinators",
      domain: "Editorial",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7048",
      name: "Arnav Sarode",
      branch: "ECS",
      prn: "125A7048",
      position: "Editorial Coordinator",
      council: "Coordinators",
      domain: "Editorial",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7029",
      name: "Aditya Jaiswal",
      branch: "ECS",
      prn: "125A7029",
      position: "Editorial Coordinator",
      council: "Coordinators",
      domain: "Editorial",
      photo: null,
      bio: null,
      socials: null
    }
  ],
  design: [
    {
      id: "125A7058",
      name: "Snehal Thakur",
      branch: "ECS",
      prn: "125A7058",
      position: "Design Coordinator",
      council: "Coordinators",
      domain: "Design",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7021",
      name: "Fizza Ghankar",
      branch: "ECS",
      prn: "125A7021",
      position: "Design Coordinator",
      council: "Coordinators",
      domain: "Design",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7015",
      name: "Krishna Chakave",
      branch: "ECS",
      prn: "125A7015",
      position: "Design Coordinator",
      council: "Coordinators",
      domain: "Design",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7043",
      name: "Samruddhi Patil",
      branch: "ECS",
      prn: "125A7043",
      position: "Design Coordinator",
      council: "Coordinators",
      domain: "Design",
      photo: null,
      bio: null,
      socials: null
    }
  ],
  media: [
    {
      id: "125A7002",
      name: "Archit Jaijith",
      branch: "ECS",
      prn: "125A7002",
      position: "Media Coordinator",
      council: "Coordinators",
      domain: "Media",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7022",
      name: "Manthan Gharat",
      branch: "ECS",
      prn: "125A7022",
      position: "Media Coordinator",
      council: "Coordinators",
      domain: "Media",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7024",
      name: "Rutuja Gole",
      branch: "ECS",
      prn: "125A7024",
      position: "Media Coordinator",
      council: "Coordinators",
      domain: "Media",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7057",
      name: "Avani Thakur",
      branch: "ECS",
      prn: "125A7057",
      position: "Media Coordinator",
      council: "Coordinators",
      domain: "Media",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7014",
      name: "Karthikey Burghate",
      branch: "ECS",
      prn: "125A7014",
      position: "Media Coordinator",
      council: "Coordinators",
      domain: "Media",
      photo: null,
      bio: null,
      socials: null
    }
  ],
  creative: [
    {
      id: "125A7042",
      name: "Jeet Patil",
      branch: "ECS",
      prn: "125A7042",
      position: "Creative Coordinator",
      council: "Coordinators",
      domain: "Creative",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7045",
      name: "Tanishka Patrike",
      branch: "ECS",
      prn: "125A7045",
      position: "Creative Coordinator",
      council: "Coordinators",
      domain: "Creative",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7003",
      name: "B.Madhav Manyo",
      branch: "ECS",
      prn: "125A7003",
      position: "Creative Coordinator",
      council: "Coordinators",
      domain: "Creative",
      photo: null,
      bio: null,
      socials: null
    },
    {
      id: "125A7008",
      name: "Shreyas Bhagat",
      branch: "ECS",
      prn: "125A7008",
      position: "Creative Coordinator",
      council: "Coordinators",
      domain: "Creative",
      photo: null,
      bio: null,
      socials: null
    }
  ]
};

// Add alias for industry outreach
coordinatorsData.industryOutreach = coordinatorsData.outreach;

// Flattened active coordinators list
export const activeCoordinators = [
  ...coordinatorsData.technical,
  ...coordinatorsData.outreach,
  ...coordinatorsData.editorial,
  ...coordinatorsData.design,
  ...coordinatorsData.media,
  ...coordinatorsData.creative
];

// EXTENDED COORDINATORS — EXCLUDED FROM PUBLIC TEAM PAGE PER SPEC
// (Kept segregated so they are never rendered publicly until explicitly requested)
export const extendedCoordinators = [
  {
    name: "Ayush Gupta",
    status: "EXCLUDED"
  },
  {
    name: "Samuel Fernando",
    status: "EXCLUDED"
  },
  {
    name: "Bansi Swami Reddy",
    status: "EXCLUDED"
  }
];

// Combined full public roster
export const membersData = [
  ...facultyLeadership,
  ...seniorCouncil,
  ...juniorCouncil,
  ...activeCoordinators
];

// Lookup by ID or PRN
export const getMemberById = (identifier) => {
  if (!identifier) return null;
  const normalized = identifier.toLowerCase().trim();
  return membersData.find(
    (m) => m.id.toLowerCase() === normalized || 
           (m.prn && m.prn.toLowerCase() === normalized) ||
           (m.id && m.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized.replace(/[^a-z0-9]/g, ''))
  ) || null;
};
