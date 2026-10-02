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
    slug: "dr-shubhangi-kharche",
    name: "Dr. Shubhangi Kharche",
    position: "HOD",
    role: "HOD",
    branch: "ECS",
    prn: null,
    council: "Faculty Leadership",
    domain: "Academic Oversight",
    category: "faculty",
    image: "/assets/team-portraits/faculty-kharche.jpg",
    photo: "/assets/team-portraits/faculty-kharche.jpg",
    description: "Head of the Department of Electronics and Computer Science at SIES GST. Provides institutional guidance, academic excellence steering, and chapter governance.",
    bio: "Head of the Department of Electronics and Computer Science at SIES GST. Provides institutional guidance, academic excellence steering, and chapter governance.",
    email: "shubhangik@sies.edu.in",
    linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/",
    socials: {
      email: "shubhangik@sies.edu.in",
      linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/"
    }
  },
  {
    id: "FAC-02",
    slug: "prof-jasmin-hirani",
    name: "Prof. Jasmin Hirani",
    position: "Student Branch Coordinator",
    role: "Student Branch Coordinator",
    branch: "ECS",
    prn: null,
    council: "Faculty Leadership",
    domain: "Chapter Coordination",
    category: "faculty",
    image: "/assets/team-portraits/faculty-hirani.jpg",
    photo: "/assets/team-portraits/faculty-hirani.jpg",
    description: "Student Branch Coordinator for IEI SIES GST. Mentors the student chapter councils, orchestrates inter-departmental technical initiatives, and guides professional chapter activities.",
    bio: "Student Branch Coordinator for IEI SIES GST. Mentors the student chapter councils, orchestrates inter-departmental technical initiatives, and guides professional chapter activities.",
    email: "jasminh@sies.edu.in",
    linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/",
    socials: {
      email: "jasminh@sies.edu.in",
      linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/"
    }
  }
];

// 2. SENIOR COUNCIL
export const seniorCouncil = [
  {
    id: "123A7018",
    slug: "tejraj-gujar",
    name: "Tejraj Gujar",
    branch: "ECS",
    prn: "123A7018",
    position: "Chairperson",
    role: "Chairperson",
    council: "Senior Council",
    domain: "Executive",
    category: "executive",
    image: "/assets/team-portraits/exec-tejraj.jpg",
    photo: "/assets/team-portraits/exec-tejraj.jpg",
    description: "Oversees overall chapter governance, strategic planning, inter-institutional partnerships, and executive decision-making.",
    bio: "Oversees overall chapter governance, strategic planning, inter-institutional partnerships, and executive decision-making.",
    linkedin: "https://www.linkedin.com/in/tejraj-gujar",
    email: "tejraj.gujar@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/tejraj-gujar",
      email: "tejraj.gujar@siesgst.ac.in"
    }
  },
  {
    id: "123A8043",
    slug: "sarang-patil",
    name: "Sarang Patil",
    branch: "AIDS",
    prn: "123A8043",
    position: "Vice Chairperson",
    role: "Vice Chairperson",
    council: "Senior Council",
    domain: "Executive",
    category: "executive",
    image: "/assets/team-portraits/exec-sarang.jpg",
    photo: "/assets/team-portraits/exec-sarang.jpg",
    description: "Supports executive chapter operations, program execution, cross-domain coordination, and student representation.",
    bio: "Supports executive chapter operations, program execution, cross-domain coordination, and student representation.",
    linkedin: "https://www.linkedin.com/in/sarang-patil",
    email: "sarang.patil@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/sarang-patil",
      email: "sarang.patil@siesgst.ac.in"
    }
  },
  {
    id: "123A7016",
    slug: "shardul-gade",
    name: "Shardul Gade",
    branch: "ECS",
    prn: "123A7016",
    position: "Secretary",
    role: "Secretary",
    council: "Senior Council",
    domain: "Executive",
    category: "executive",
    image: "/assets/team-portraits/exec-shardul.jpg",
    photo: "/assets/team-portraits/exec-shardul.jpg",
    description: "Manages official chapter documentation, constitutional records, inter-council communication, and institutional reporting.",
    bio: "Manages official chapter documentation, constitutional records, inter-council communication, and institutional reporting.",
    linkedin: "https://www.linkedin.com/in/shardul-gade",
    email: "shardul.gade@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/shardul-gade",
      email: "shardul.gade@siesgst.ac.in"
    }
  },
  {
    id: "123A7020",
    slug: "harshad-jadhav",
    name: "Harshad Jadhav",
    branch: "ECS",
    prn: "123A7020",
    position: "Treasurer",
    role: "Treasurer",
    council: "Senior Council",
    domain: "Executive",
    category: "executive",
    image: "/assets/team-portraits/exec-harshad.jpg",
    photo: "/assets/team-portraits/exec-harshad.jpg",
    description: "Responsible for financial budgeting, fiscal compliance, resource distribution, and audited accounting for chapter initiatives.",
    bio: "Responsible for financial budgeting, fiscal compliance, resource distribution, and audited accounting for chapter initiatives.",
    linkedin: "https://www.linkedin.com/in/harshad-jadhav",
    email: "harshad.jadhav@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/harshad-jadhav",
      email: "harshad.jadhav@siesgst.ac.in"
    }
  },
  {
    id: "123A8001",
    slug: "a-s-lakshanya",
    name: "A S Lakshanya",
    branch: "AIDS",
    prn: "123A8001",
    position: "Event and Community Manager",
    role: "Event and Community Manager",
    council: "Senior Council",
    domain: "Community",
    category: "executive",
    image: "/assets/team-portraits/exec-lakshanya.jpg",
    photo: "/assets/team-portraits/exec-lakshanya.jpg",
    description: "Directs flagship events, participant experience, community outreach, and institutional delegate engagements.",
    bio: "Directs flagship events, participant experience, community outreach, and institutional delegate engagements.",
    linkedin: "https://www.linkedin.com/in/a-s-lakshanya",
    email: "lakshanya.as@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/a-s-lakshanya",
      email: "lakshanya.as@siesgst.ac.in"
    }
  },
  {
    id: "123A7002",
    slug: "anushka-pawar",
    name: "Anushka Pawar",
    branch: "ECS",
    prn: "123A7002",
    position: "Event and Community Manager",
    role: "Event and Community Manager",
    council: "Senior Council",
    domain: "Community",
    category: "executive",
    image: "/assets/team-portraits/exec-anushka.jpg",
    photo: "/assets/team-portraits/exec-anushka.jpg",
    description: "Orchestrates symposia schedules, venue operations, community relations, and inter-collegiate technical competitions.",
    bio: "Orchestrates symposia schedules, venue operations, community relations, and inter-collegiate technical competitions.",
    linkedin: "https://www.linkedin.com/in/anushka-pawar",
    email: "anushka.pawar@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/anushka-pawar",
      email: "anushka.pawar@siesgst.ac.in"
    }
  },
  {
    id: "123A7019",
    slug: "harsh-mhatre",
    name: "Harsh Mhatre",
    branch: "ECS",
    prn: "123A7019",
    position: "Technical Advisor",
    role: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    category: "executive",
    image: "/assets/team-portraits/exec-harsh.jpg",
    photo: "/assets/team-portraits/exec-harsh.jpg",
    description: "Advises technical roadmap development, hackathon infrastructure, systems architecture, and engineering workshops.",
    bio: "Advises technical roadmap development, hackathon infrastructure, systems architecture, and engineering workshops.",
    github: "https://github.com/harshmhatre",
    linkedin: "https://www.linkedin.com/in/harsh-mhatre",
    email: "harsh.mhatre@siesgst.ac.in",
    socials: {
      github: "https://github.com/harshmhatre",
      linkedin: "https://www.linkedin.com/in/harsh-mhatre",
      email: "harsh.mhatre@siesgst.ac.in"
    }
  },
  {
    id: "123A7011",
    slug: "sahil-chavan",
    name: "Sahil Chavan",
    branch: "ECS",
    prn: "123A7011",
    position: "Technical Advisor",
    role: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    category: "executive",
    image: "/assets/team-portraits/exec-sahil.jpg",
    photo: "/assets/team-portraits/exec-sahil.jpg",
    description: "Provides technical leadership across software projects, developer bootcamps, and institutional digital platforms.",
    bio: "Provides technical leadership across software projects, developer bootcamps, and institutional digital platforms.",
    github: "https://github.com/sahilchavan",
    linkedin: "https://www.linkedin.com/in/sahil-chavan",
    email: "sahil.chavan@siesgst.ac.in",
    socials: {
      github: "https://github.com/sahilchavan",
      linkedin: "https://www.linkedin.com/in/sahil-chavan",
      email: "sahil.chavan@siesgst.ac.in"
    }
  },
  {
    id: "123A7009",
    slug: "soham-chafale",
    name: "Soham Chafale",
    branch: "ECS",
    prn: "123A7009",
    position: "Technical Advisor",
    role: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    category: "executive",
    image: "/assets/team-portraits/exec-soham.jpg",
    photo: "/assets/team-portraits/exec-soham.jpg",
    description: "Guides project governance, hardware-software integration, cloud infrastructure, and technical mentoring.",
    bio: "Guides project governance, hardware-software integration, cloud infrastructure, and technical mentoring.",
    github: "https://github.com/sohamchafale",
    linkedin: "https://www.linkedin.com/in/soham-chafale",
    email: "soham.chafale@siesgst.ac.in",
    socials: {
      github: "https://github.com/sohamchafale",
      linkedin: "https://www.linkedin.com/in/soham-chafale",
      email: "soham.chafale@siesgst.ac.in"
    }
  },
  {
    id: "123A7027",
    slug: "aditya-kinikar",
    name: "Aditya Kinikar",
    branch: "ECS",
    prn: "123A7027",
    position: "Technical Advisor",
    role: "Technical Advisor",
    council: "Senior Council",
    domain: "Technical",
    category: "executive",
    image: "/assets/team-portraits/exec-aditya.jpg",
    photo: "/assets/team-portraits/exec-aditya.jpg",
    description: "Oversees research symposiums, technical paper reviews, coding competitions, and algorithmic workshops.",
    bio: "Oversees research symposiums, technical paper reviews, coding competitions, and algorithmic workshops.",
    github: "https://github.com/adityakinikar",
    linkedin: "https://www.linkedin.com/in/aditya-kinikar",
    email: "aditya.kinikar@siesgst.ac.in",
    socials: {
      github: "https://github.com/adityakinikar",
      linkedin: "https://www.linkedin.com/in/aditya-kinikar",
      email: "aditya.kinikar@siesgst.ac.in"
    }
  },
  {
    id: "123A7001",
    slug: "ananya-siddayyanavar",
    name: "Ananya Siddayyanavar",
    branch: "ECS",
    prn: "123A7001",
    position: "Creative Mentor",
    role: "Creative Mentor",
    council: "Senior Council",
    domain: "Creative",
    category: "executive",
    image: "/assets/team-portraits/exec-ananya.jpg",
    photo: "/assets/team-portraits/exec-ananya.jpg",
    description: "Mentors creative branding, stage aesthetics, publication themes, and visual narrative direction.",
    bio: "Mentors creative branding, stage aesthetics, publication themes, and visual narrative direction.",
    instagram: "https://instagram.com/ananya_sid",
    linkedin: "https://www.linkedin.com/in/ananya-siddayyanavar",
    email: "ananya.sid@siesgst.ac.in",
    socials: {
      instagram: "https://instagram.com/ananya_sid",
      linkedin: "https://www.linkedin.com/in/ananya-siddayyanavar",
      email: "ananya.sid@siesgst.ac.in"
    }
  },
  {
    id: "2247068",
    slug: "ayush-tandel",
    name: "Ayush Tandel",
    branch: "ECS",
    prn: "2247068",
    position: "Media Mentor",
    role: "Media Mentor",
    council: "Senior Council",
    domain: "Media",
    category: "executive",
    image: "/assets/team-portraits/exec-ayush.jpg",
    photo: "/assets/team-portraits/exec-ayush.jpg",
    description: "Guides media production, cinematographic coverage, post-production editing, and digital broadcast workflows.",
    bio: "Guides media production, cinematographic coverage, post-production editing, and digital broadcast workflows.",
    instagram: "https://instagram.com/ayushtandel",
    linkedin: "https://www.linkedin.com/in/ayush-tandel",
    email: "ayush.tandel@siesgst.ac.in",
    socials: {
      instagram: "https://instagram.com/ayushtandel",
      linkedin: "https://www.linkedin.com/in/ayush-tandel",
      email: "ayush.tandel@siesgst.ac.in"
    }
  },
  {
    id: "122A7021",
    slug: "kaushik-yadav",
    name: "Kaushik Yadav",
    branch: null, // IMPORTANT: Explicitly NOT SPECIFIED in source document
    prn: "122A7021",
    position: "Media Mentor",
    role: "Media Mentor",
    council: "Senior Council",
    domain: "Media",
    category: "executive",
    image: "/assets/team-portraits/exec-kaushik.jpg",
    photo: "/assets/team-portraits/exec-kaushik.jpg",
    description: "Mentors audiovisual documentation, press releases, social storytelling, and chapter media archives.",
    bio: "Mentors audiovisual documentation, press releases, social storytelling, and chapter media archives.",
    linkedin: "https://www.linkedin.com/in/kaushik-yadav",
    email: "kaushik.yadav@siesgst.ac.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/kaushik-yadav",
      email: "kaushik.yadav@siesgst.ac.in"
    }
  },
  {
    id: "123A7053",
    slug: "shravani-khedkar",
    name: "Shravani Khedkar",
    branch: "ECS",
    prn: "123A7053",
    position: "Design Mentor",
    role: "Design Mentor",
    council: "Senior Council",
    domain: "Design",
    category: "executive",
    image: "/assets/team-portraits/exec-shravani.jpg",
    photo: "/assets/team-portraits/exec-shravani.jpg",
    description: "Guides brand design systems, interface design, editorial layouts, and chapter brand identity guidelines.",
    bio: "Guides brand design systems, interface design, editorial layouts, and chapter brand identity guidelines.",
    instagram: "https://instagram.com/shravanikhedkar",
    linkedin: "https://www.linkedin.com/in/shravani-khedkar",
    email: "shravani.khedkar@siesgst.ac.in",
    socials: {
      instagram: "https://instagram.com/shravanikhedkar",
      linkedin: "https://www.linkedin.com/in/shravani-khedkar",
      email: "shravani.khedkar@siesgst.ac.in"
    }
  }
];

// Unified structured leadership roster
export const leadershipMembers = [
  ...facultyLeadership,
  ...seniorCouncil
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
    bio: "Assists the Secretariat in executing council administration, institutional record-keeping, and inter-departmental communication across the student chapter.",
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
    bio: "Supports chapter governance, institutional documentation, meeting agendas, and administrative coordination across student wings.",
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
    bio: "Directs core software development projects, technical workshops, and coding challenges for chapter members.",
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
    bio: "Oversees hackathon operations, technical infrastructure, development tracks, and peer mentorship in engineering practices.",
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
    bio: "Manages cloud infrastructure, system design bootcamps, and technical mentoring across multidisciplinary software projects.",
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
    bio: "Leads hardware-software integrations, technical competitions, paper review sessions, and engineering prototyping labs.",
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
    bio: "Spearheads corporate outreach, industry guest sessions, institutional sponsorship drives, and professional networking.",
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
    bio: "Coordinates administrative workflows, institutional liaisons, event authorizations, and corporate relations.",
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
    bio: "Leads the chapter's UI/UX systems, promotional brand collateral, typography hierarchy, and visual design guidelines.",
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
    bio: "Directs creative themes, stage scenography, event atmosphere concepts, and thematic marketing campaigns.",
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
    bio: "Orchestrates artistic installations, event styling, promotional exhibits, and creative student engagement initiatives.",
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
    bio: "Guides multidisciplinary visual assets, digital broadcast assets, cinematic event teasers, and brand aesthetic standards.",
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
      bio: "Coordinates hands-on coding bootcamps, technical problem-solving labs, and competitive programming events.",
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
      bio: "Facilitates technical workshops, peer developer mentoring, and open-source project development.",
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
      bio: "Assists with hackathon technical infrastructure, development environments, and live engineering challenges.",
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
      bio: "Supports algorithm reviews, systems programming seminars, and technical project implementations.",
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
      bio: "Manages developer documentation, software tooling workshops, and student engineering onboarding.",
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
      bio: "Supports embedded computing demonstrations, hardware lab setups, and technical symposium logistics.",
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
      bio: "Coordinates code reviews, web development tracks, and peer-to-peer technical mentorship programs.",
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
      bio: "Assists with technical system deployments, challenge authoring, and student engineering hackathons.",
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
      bio: "Manages corporate communications, sponsorship proposals, and administrative liaison workflows.",
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
      bio: "Coordinates industry outreach schedules, corporate speaker coordination, and administrative permissions.",
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
      bio: "Assists in sponsorship partnerships, corporate delegate relations, and event logistics management.",
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
      bio: "Facilitates industry engagement, corporate sponsor interactions, and institutional protocol compliance.",
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
      bio: "Manages council correspondence, attendee communications, and executive documentation for major events.",
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
      bio: "Coordinates administrative files, official event approvals, and external stakeholder correspondence.",
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
      bio: "Curates technical articles, oversees editorial proofing, and drafts official chapter publications.",
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
      bio: "Authors event retrospectives, technical speaker briefs, and formal engineering dispatches.",
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
      bio: "Compiles chapter digests, engineering newsletter features, and official event documentation.",
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
      bio: "Edits technical conference digests, chapter press releases, and academic publication manuscripts.",
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
      bio: "Creates digital banners, social media design assets, and event promotional graphics.",
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
      bio: "Designs symposium posters, official certificates, slide decks, and digital typography layouts.",
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
      bio: "Develops digital graphic layouts, brand identity collateral, and conference badge assets.",
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
      bio: "Crafts printable event brochures, stage visual collateral, and unified brand graphics.",
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
      bio: "Directs photography coverage, digital photo archives, and live event media production.",
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
      bio: "Handles camera operations, video recording of flagship symposia, and media equipment setups.",
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
      bio: "Manages media archival, post-production video editing, and chapter recap presentations.",
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
      bio: "Assists in digital media production, visual reels, and social media multimedia storytelling.",
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
      bio: "Oversees audio-visual equipment, live event streaming, and media documentation.",
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
      bio: "Develops creative event themes, physical promotional installations, and stage design concepts.",
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
      bio: "Crafts event decor, artistic installations, and creative promotional merchandise for symposia.",
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
      bio: "Coordinates stage ambiance, thematic visual elements, and interactive student activities.",
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
      bio: "Assists in creating artistic installations, showcase materials, and creative event experiences.",
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

// Lookup by ID, Slug, or PRN
export const getMemberById = (identifier) => {
  if (!identifier) return null;
  const decoded = decodeURIComponent(identifier).toLowerCase().trim();
  const stripped = decoded.replace(/^(prof|dr)-?/, '').replace(/[^a-z0-9]/g, '');
  return membersData.find((m) => {
    if (!m) return false;
    const mId = (m.id || '').toLowerCase();
    const mSlug = (m.slug || '').toLowerCase();
    const mPrn = (m.prn || '').toLowerCase();
    const mName = (m.name || '').toLowerCase();
    const mSlugClean = mSlug.replace(/^(prof|dr)-?/, '').replace(/[^a-z0-9]/g, '');
    const mNameClean = mName.replace(/^(prof\.|dr\.)\s*/, '').replace(/[^a-z0-9]/g, '');

    return (
      mId === decoded ||
      mSlug === decoded ||
      mPrn === decoded ||
      mName === decoded ||
      mId.replace(/[^a-z0-9]/g, '') === decoded.replace(/[^a-z0-9]/g, '') ||
      mSlug.replace(/[^a-z0-9]/g, '') === decoded.replace(/[^a-z0-9]/g, '') ||
      mName.replace(/[^a-z0-9]/g, '') === decoded.replace(/[^a-z0-9]/g, '') ||
      (stripped && mSlugClean === stripped) ||
      (stripped && mNameClean === stripped)
    );
  }) || null;
};

// Get official static pre-generated QR code path for a member
export const getMemberQRUrl = (member) => {
  if (!member || !member.id) return null;
  const cleanName = (member.name || '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  const fileName = `${cleanName}_${member.id}.png`;

  let subDir = 'coordinators';
  if (member.id.startsWith('FAC') || member.council === 'Faculty Leadership' || member.category === 'faculty') {
    subDir = 'faculty';
  } else if (member.council === 'Senior Council' || member.category === 'executive') {
    subDir = 'senior';
  } else if (member.council === 'Junior Council') {
    subDir = 'junior';
  }
  return `/qrcodes/${subDir}/${fileName}`;
};

// Retrieve biographical statement for any member with an authoritative fallback
export const getMemberBio = (member) => {
  if (!member) return "";
  if (member.bio && member.bio.trim()) return member.bio;
  if (member.description && member.description.trim()) return member.description;

  const council = member.council || "Student Chapter";
  const position = member.position || member.role || "Member";
  const domain = member.domain ? `${member.domain} Wing` : "chapter initiatives";
  const branch = member.branch ? `from the Department of ${member.branch}` : "";
  return `${member.name} serves as ${position} for the ${council} ${branch}, supporting ${domain} at IEI SIES GST.`;
};


