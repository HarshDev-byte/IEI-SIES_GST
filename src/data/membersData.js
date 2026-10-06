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
    position: "Professor & Head",
    role: "HOD",
    branch: "ECS",
    department: "Department of Electronics & Computer Science",
    prn: null,
    council: "Faculty Leadership",
    domain: "Academic Oversight",
    category: "faculty",
    image: "/assets/team-portraits/faculty-kharche.jpg",
    photo: "/assets/team-portraits/faculty-kharche.jpg",
    description: "Professor & Head of the Department of Electronics & Computer Science. Over 25 years of experience in teaching, research, AI, IoT, and next-generation communication networks.",
    bio: `Dr. Shubhangi Pravin Kharche is an accomplished **academician, researcher, and academic leader** with over **25 years of experience** in teaching, research, and innovation. She currently serves as the **Professor & Head of the Department of Electronics & Computer Science**.

Her research interests include **Artificial Intelligence, Machine Learning, Deep Learning, IoT, Wireless Sensor Networks, 6LoWPAN, Computer Networks, and 5G/6G Communication**.

She has authored and co-authored **45+ research publications** in national and international journals and conferences, including **Scopus, Web of Science, and SCI-indexed** publications. Her work spans intelligent networking, healthcare technologies, IoT, AI-driven systems, and next-generation communication networks.

### Key Highlights

- **25+ Years** of Academic & Research Experience
- **45+ Research Publications**
- **Best Paper Awards** at national and international conferences
- **Women Researcher Award – 2021**
- Research & Intellectual Property in **AI, IoT, Healthcare & 6G**
- Numerous **Expert Talks, Workshops & Faculty Development Programs**

As Head of the Department, Dr. Kharche is committed to fostering **academic excellence, research, innovation, and industry-relevant learning**, empowering students to explore emerging technologies and develop solutions for the future.`,
    email: "shubhangik@sies.edu.in",
    linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/",
    github: null,
    socials: {
      email: "shubhangik@sies.edu.in",
      linkedin: "https://www.linkedin.com/school/sies-graduate-school-of-technology/",
      github: null,
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
    linkedin: "https://in.linkedin.com/in/jasmin-hirani-68834b38",
    github: null,
    socials: {
      email: "jasminh@sies.edu.in",
      linkedin: "https://in.linkedin.com/in/jasmin-hirani-68834b38",
      github: null,
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
    image: "/assets/sc/123A7018.jpg",
    photo: "/assets/sc/123A7018.jpg",
    description: "Oversees overall chapter governance, strategic planning, inter-institutional partnerships, and executive decision-making.",
    bio: "Oversees overall chapter governance, strategic planning, inter-institutional partnerships, and executive decision-making.",
    linkedin: "https://www.linkedin.com/in/tejraj-gujar-8707b9225/",
    github: "https://github.com/tejraj-gujar",
    email: "tejrajrgecs123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/tejraj-gujar-8707b9225/",
      email: "tejrajrgecs123@gst.sies.edu.in",
      github: "https://github.com/tejraj-gujar"
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
    image: "/assets/sc/123A8043.jpg",
    photo: "/assets/sc/123A8043.jpg",
    description: "Supports executive chapter operations, program execution, cross-domain coordination, and student representation.",
    bio: "Supports executive chapter operations, program execution, cross-domain coordination, and student representation.",
    linkedin: "https://www.linkedin.com/in/sarangpatil1/",
    github: "https://github.com/sarang-patil",
    email: "sarangdpaids123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/sarangpatil1/",
      email: "sarangdpaids123@gst.sies.edu.in",
      github: "https://github.com/sarang-patil"
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
    image: "/assets/sc/123A7016.jpg",
    photo: "/assets/sc/123A7016.jpg",
    description: "Manages official chapter documentation, constitutional records, inter-council communication, and institutional reporting.",
    bio: "Manages official chapter documentation, constitutional records, inter-council communication, and institutional reporting.",
    linkedin: "https://www.linkedin.com/in/shardul-gade-681304329/",
    github: "https://github.com/shardul-gade",
    email: "shardulugecs123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/shardul-gade-681304329/",
      email: "shardulugecs123@gst.sies.edu.in",
      github: "https://github.com/shardul-gade"
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
    image: "/assets/sc/123A7020.jpg",
    photo: "/assets/sc/123A7020.jpg",
    description: "Responsible for financial budgeting, fiscal compliance, resource distribution, and audited accounting for chapter initiatives.",
    bio: "Responsible for financial budgeting, fiscal compliance, resource distribution, and audited accounting for chapter initiatives.",
    linkedin: "https://www.linkedin.com/in/harshad-jadhav-108a242b2/",
    github: "https://github.com/harshad-jadhav",
    email: "harshaddjecs123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/harshad-jadhav-108a242b2/",
      email: "harshaddjecs123@gst.sies.edu.in",
      github: "https://github.com/harshad-jadhav"
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
    image: "/assets/sc/123A8001.jpg",
    photo: "/assets/sc/123A8001.jpg",
    description: "Directs flagship events, participant experience, community outreach, and institutional delegate engagements.",
    bio: "Directs flagship events, participant experience, community outreach, and institutional delegate engagements.",
    linkedin: "https://www.linkedin.com/in/a-s-lakshanya-150010314/",
    github: "https://github.com/a-s-lakshanya",
    email: "lakshanyasaaids123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/a-s-lakshanya-150010314/",
      email: "lakshanyasaaids123@gst.sies.edu.in",
      github: "https://github.com/a-s-lakshanya"
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
    image: null,
    photo: null,
    description: "Orchestrates symposia schedules, venue operations, community relations, and inter-collegiate technical competitions.",
    bio: "Orchestrates symposia schedules, venue operations, community relations, and inter-collegiate technical competitions.",
    linkedin: "https://www.linkedin.com/in/anushka-pawar-91268b38a/",
    github: "https://github.com/anushka-pawar",
    email: "anushkaapecs123@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/anushka-pawar-91268b38a/",
      email: "anushkaapecs123@gst.sies.edu.in",
      github: "https://github.com/anushka-pawar"
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
    image: "/assets/sc/123A7019.jpg",
    photo: "/assets/sc/123A7019.jpg",
    description: "Advises technical roadmap development, hackathon infrastructure, systems architecture, and engineering workshops.",
    bio: "Advises technical roadmap development, hackathon infrastructure, systems architecture, and engineering workshops.",
    github: "https://github.com/harshmhatre",
    linkedin: "https://www.linkedin.com/in/harsh-mhatre-7b9606320/",
    email: "harshpmecs123@gst.sies.edu.in",
    socials: {
      github: "https://github.com/harshmhatre",
      linkedin: "https://www.linkedin.com/in/harsh-mhatre-7b9606320/",
      email: "harshpmecs123@gst.sies.edu.in"
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
    image: "/assets/sc/123A7011.jpg",
    photo: "/assets/sc/123A7011.jpg",
    description: "Provides technical leadership across software projects, developer bootcamps, and institutional digital platforms.",
    bio: "Provides technical leadership across software projects, developer bootcamps, and institutional digital platforms.",
    github: "https://github.com/sahilchavan",
    linkedin: "https://www.linkedin.com/in/sahil-chavan-066a252b2/",
    email: "sahilrcecs123@gst.sies.edu.in",
    socials: {
      github: "https://github.com/sahilchavan",
      linkedin: "https://www.linkedin.com/in/sahil-chavan-066a252b2/",
      email: "sahilrcecs123@gst.sies.edu.in"
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
    image: "/assets/sc/123A7009.jpg",
    photo: "/assets/sc/123A7009.jpg",
    description: "Guides project governance, hardware-software integration, cloud infrastructure, and technical mentoring.",
    bio: "Guides project governance, hardware-software integration, cloud infrastructure, and technical mentoring.",
    github: "https://github.com/sohamchafale",
    linkedin: "https://www.linkedin.com/in/soham-chafale/",
    email: "sohamscecs123@gst.sies.edu.in",
    socials: {
      github: "https://github.com/sohamchafale",
      linkedin: "https://www.linkedin.com/in/soham-chafale/",
      email: "sohamscecs123@gst.sies.edu.in"
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
    image: "/assets/sc/123A7027.jpg",
    photo: "/assets/sc/123A7027.jpg",
    description: "Oversees research symposiums, technical paper reviews, coding competitions, and algorithmic workshops.",
    bio: "Oversees research symposiums, technical paper reviews, coding competitions, and algorithmic workshops.",
    github: "https://github.com/adityakinikar",
    linkedin: "https://www.linkedin.com/in/adityakinikar/",
    email: "adityamkecs123@gst.sies.edu.in",
    socials: {
      github: "https://github.com/adityakinikar",
      linkedin: "https://www.linkedin.com/in/adityakinikar/",
      email: "adityamkecs123@gst.sies.edu.in"
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
    image: "/assets/sc/123A7001.jpg",
    photo: "/assets/sc/123A7001.jpg",
    description: "Mentors creative branding, stage aesthetics, publication themes, and visual narrative direction.",
    bio: "Mentors creative branding, stage aesthetics, publication themes, and visual narrative direction.",
    instagram: "https://instagram.com/ananya_sid",
    linkedin: "https://www.linkedin.com/in/ananya-siddayyanavar-5430a0320/",
    github: "https://github.com/ananya-siddayyanavar",
    email: "ananyasecs123@gst.sies.edu.in",
    socials: {
      instagram: "https://instagram.com/ananya_sid",
      linkedin: "https://www.linkedin.com/in/ananya-siddayyanavar-5430a0320/",
      email: "ananyasecs123@gst.sies.edu.in",
      github: "https://github.com/ananya-siddayyanavar"
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
    image: null,
    photo: null,
    description: "Guides media production, cinematographic coverage, post-production editing, and digital broadcast workflows.",
    bio: "Guides media production, cinematographic coverage, post-production editing, and digital broadcast workflows.",
    instagram: "https://instagram.com/ayushtandel",
    linkedin: "https://www.linkedin.com/in/ayush-t-aa6b202b2/",
    github: "https://github.com/ayush-tandel",
    email: "ayushmtecs224@gst.sies.edu.in",
    socials: {
      instagram: "https://instagram.com/ayushtandel",
      linkedin: "https://www.linkedin.com/in/ayush-t-aa6b202b2/",
      email: "ayushmtecs224@gst.sies.edu.in",
      github: "https://github.com/ayush-tandel"
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
    image: null,
    photo: null,
    description: "Mentors audiovisual documentation, press releases, social storytelling, and chapter media archives.",
    bio: "Mentors audiovisual documentation, press releases, social storytelling, and chapter media archives.",
    linkedin: "https://www.linkedin.com/in/kaushik-yadav",
    github: "https://github.com/kaushik-yadav",
    email: "kaushiksyecs122@gst.sies.edu.in",
    socials: {
      linkedin: "https://www.linkedin.com/in/kaushik-yadav",
      email: "kaushiksyecs122@gst.sies.edu.in",
      github: "https://github.com/kaushik-yadav"
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
    image: "/assets/sc/123A7053.jpg",
    photo: "/assets/sc/123A7053.jpg",
    description: "Guides brand design systems, interface design, editorial layouts, and chapter brand identity guidelines.",
    bio: "Guides brand design systems, interface design, editorial layouts, and chapter brand identity guidelines.",
    instagram: "https://instagram.com/shravanikhedkar",
    linkedin: "https://www.linkedin.com/in/shravani-khedkar-9b893a369/",
    github: "https://github.com/shravani-khedkar",
    email: "shravanimkecs123@gst.sies.edu.in",
    socials: {
      instagram: "https://instagram.com/shravanikhedkar",
      linkedin: "https://www.linkedin.com/in/shravani-khedkar-9b893a369/",
      email: "shravanimkecs123@gst.sies.edu.in",
      github: "https://github.com/shravani-khedkar"
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
    slug: "prathamesh-bhagwat",
    name: "Prathamesh Bhagwat",
    branch: "ECS",
    prn: "124A7003",
    position: "Joint Secretary",
    role: "Joint Secretary",
    council: "Junior Council",
    domain: "Executive",
    photo: null,
    bio: "Assists the Secretariat in executing council administration, institutional record-keeping, and inter-departmental communication across the student chapter.",
    email: "prathameshhbecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/prathamesh-bhagwat-191409298/",
    github: "https://github.com/prathamesh-bhagwat",
    socials: {
      email: "prathameshhbecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/prathamesh-bhagwat-191409298/",
      github: "https://github.com/prathamesh-bhagwat"
    }
  },
  {
    id: "124A1118",
    slug: "indrayani-patil",
    name: "Indrayani Patil",
    branch: "CE",
    prn: "124A1118",
    position: "Joint Secretary",
    role: "Joint Secretary",
    council: "Junior Council",
    domain: "Executive",
    photo: "/assets/jc/124A1118.jpg",
    image: "/assets/jc/124A1118.jpg",
    bio: "Supports chapter governance, institutional documentation, meeting agendas, and administrative coordination across student wings.",
    email: "indrayaniapce124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/indrayani-patill/",
    github: "https://github.com/indrayani-patil",
    socials: {
      email: "indrayaniapce124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/indrayani-patill/",
      github: "https://github.com/indrayani-patil"
    }
  },
  {
    id: "124A7052",
    slug: "saran-rajasekhar",
    name: "Saran Rajasekhar",
    branch: "ECS",
    prn: "124A7052",
    position: "Technical Head",
    role: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: "Directs core software development projects, technical workshops, and coding challenges for chapter members.",
    email: "saranrecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/saran-rajasekhar-1162b9334/",
    github: "https://github.com/saran-rajasekhar",
    socials: {
      email: "saranrecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/saran-rajasekhar-1162b9334/",
      github: "https://github.com/saran-rajasekhar"
    }
  },
  {
    id: "124A7061",
    slug: "manas-suryawanshi",
    name: "Manas Suryawanshi",
    branch: "ECS",
    prn: "124A7061",
    position: "Technical Head",
    role: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: "Oversees hackathon operations, technical infrastructure, development tracks, and peer mentorship in engineering practices.",
    email: "suryawanshimanasvecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/manas-suryawanshi-51a00832b/",
    github: "https://github.com/manas-suryawanshi",
    socials: {
      email: "suryawanshimanasvecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/manas-suryawanshi-51a00832b/",
      github: "https://github.com/manas-suryawanshi"
    }
  },
  {
    id: "124A7036",
    slug: "hariom-mohare",
    name: "Hariom Mohare",
    branch: "ECS",
    prn: "124A7036",
    position: "Technical Head",
    role: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: null,
    bio: "Manages cloud infrastructure, system design bootcamps, and technical mentoring across multidisciplinary software projects.",
    email: "hariommmecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/hariom-mohare-533b56349/",
    github: "https://github.com/hariom-mohare",
    socials: {
      email: "hariommmecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/hariom-mohare-533b56349/",
      github: "https://github.com/hariom-mohare"
    }
  },
  {
    id: "124A7045",
    slug: "kaustubh-patil",
    name: "Kaustubh Patil",
    branch: "ECS",
    prn: "124A7045",
    position: "Technical Head",
    role: "Technical Head",
    council: "Junior Council",
    domain: "Technical",
    photo: "/assets/jc/124A7045.jpg",
    image: "/assets/jc/124A7045.jpg",
    bio: "Leads hardware-software integrations, technical competitions, paper review sessions, and engineering prototyping labs.",
    email: "kaustubhspecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/cos2patil/",
    github: "https://github.com/kaustubh-patil",
    socials: {
      email: "kaustubhspecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/cos2patil/",
      github: "https://github.com/kaustubh-patil"
    }
  },
  {
    id: "124A7041",
    slug: "advaith-nair",
    name: "Advaith Nair",
    branch: "ECS",
    prn: "124A7041",
    position: "Industry Outreach & Admin Head",
    role: "Industry Outreach & Admin Head",
    council: "Junior Council",
    domain: "Industry Outreach & Admin",
    photo: "/assets/jc/124A7041.jpg",
    image: "/assets/jc/124A7041.jpg",
    bio: "Spearheads corporate outreach, industry guest sessions, institutional sponsorship drives, and professional networking.",
    email: "advaithvnecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/advaith-nair",
    github: "https://github.com/advaith-nair",
    socials: {
      email: "advaithvnecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/advaith-nair",
      github: "https://github.com/advaith-nair"
    }
  },
  {
    id: "124A7026",
    slug: "harshit-lahari",
    name: "Harshit Lahari",
    branch: "ECS",
    prn: "124A7026",
    position: "Industry Outreach & Admin Head",
    role: "Industry Outreach & Admin Head",
    council: "Junior Council",
    domain: "Industry Outreach & Admin",
    photo: "/assets/jc/124A7026.jpg",
    image: "/assets/jc/124A7026.jpg",
    bio: "Coordinates administrative workflows, institutional liaisons, event authorizations, and corporate relations.",
    email: "harshitnlecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/harshit-neeraj-lahari-17279434a/",
    github: "https://github.com/harshit-lahari",
    socials: {
      email: "harshitnlecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/harshit-neeraj-lahari-17279434a/",
      github: "https://github.com/harshit-lahari"
    }
  },
  {
    id: "124A3052",
    slug: "gauri-shinde",
    name: "Gauri Shinde",
    branch: "IT",
    prn: "124A3052",
    position: "Design Head",
    role: "Design Head",
    council: "Junior Council",
    domain: "Design",
    photo: "/assets/jc/124A3052.jpg",
    image: "/assets/jc/124A3052.jpg",
    bio: "Leads the chapter's UI/UX systems, promotional brand collateral, typography hierarchy, and visual design guidelines.",
    email: "gaurissit124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/gauri-shinde-1519b8388/",
    github: "https://github.com/gauri-shinde",
    socials: {
      email: "gaurissit124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/gauri-shinde-1519b8388/",
      github: "https://github.com/gauri-shinde"
    }
  },
  {
    id: "124A7028",
    slug: "maadeshselvan-chidambarakuthala",
    name: "Maadeshselvan Chidambarakuthala",
    branch: "ECS",
    prn: "124A7028",
    position: "Creative Head",
    role: "Creative Head",
    council: "Junior Council",
    domain: "Creative",
    photo: "/assets/jc/124A7028.jpg",
    image: "/assets/jc/124A7028.jpg",
    bio: "Directs creative themes, stage scenography, event atmosphere concepts, and thematic marketing campaigns.",
    email: "maadeshselvancecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/2006maadeshselvan/",
    github: "https://github.com/maadeshselvan-chidambarakuthala",
    socials: {
      email: "maadeshselvancecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/2006maadeshselvan/",
      github: "https://github.com/maadeshselvan-chidambarakuthala"
    }
  },
  {
    id: "124A2059",
    slug: "sana-tankar",
    name: "Sana Tankar",
    branch: "EXTC",
    prn: "124A2059",
    position: "Creative Head",
    role: "Creative Head",
    council: "Junior Council",
    domain: "Creative",
    photo: "/assets/jc/124A2059.jpg",
    image: "/assets/jc/124A2059.jpg",
    bio: "Orchestrates artistic installations, event styling, promotional exhibits, and creative student engagement initiatives.",
    email: "sanastextc124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/sana-tankar-08a9a8360/",
    github: "https://github.com/sana-tankar",
    socials: {
      email: "sanastextc124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/sana-tankar-08a9a8360/",
      github: "https://github.com/sana-tankar"
    }
  },
  {
    id: "124A7051",
    slug: "nimish-roge",
    name: "Nimish Roge",
    branch: "ECS",
    prn: "124A7051",
    position: "Design & Media Head",
    role: "Design & Media Head",
    council: "Junior Council",
    domain: "Design & Media",
    photo: "/assets/jc/124A7051.jpg",
    image: "/assets/jc/124A7051.jpg",
    bio: "Guides multidisciplinary visual assets, digital broadcast assets, cinematic event teasers, and brand aesthetic standards.",
    email: "nimishrrecs124@gst.sies.edu.in",
    linkedin: "https://www.linkedin.com/in/nimish-roge-38081b318/",
    github: "https://github.com/nimish-roge",
    socials: {
      email: "nimishrrecs124@gst.sies.edu.in",
      linkedin: "https://www.linkedin.com/in/nimish-roge-38081b318/",
      github: "https://github.com/nimish-roge"
    }
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
      slug: "krishna-tiwari",
      email: "krishna.tiwari@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/krishna-tiwari",
      github: "https://github.com/krishna-tiwari",
      socials: {
        email: "krishna.tiwari@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/krishna-tiwari",
        github: "https://github.com/krishna-tiwari"
      }
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
      slug: "riya-prajapati",
      email: "riya.prajapati@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/riya-prajapati",
      github: "https://github.com/riya-prajapati",
      socials: {
        email: "riya.prajapati@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/riya-prajapati",
        github: "https://github.com/riya-prajapati"
      }
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
      slug: "himanshu-katarnavare",
      email: "himanshu.katarnavare@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/himanshu-katarnavare",
      github: "https://github.com/himanshu-katarnavare",
      socials: {
        email: "himanshu.katarnavare@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/himanshu-katarnavare",
        github: "https://github.com/himanshu-katarnavare"
      }
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
      slug: "parth-bhobekar",
      email: "parth.bhobekar@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/parth-bhobekar",
      github: "https://github.com/parth-bhobekar",
      socials: {
        email: "parth.bhobekar@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/parth-bhobekar",
        github: "https://github.com/parth-bhobekar"
      }
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
      slug: "aqsa-inamdar",
      email: "aqsa.inamdar@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/aqsa-inamdar",
      github: "https://github.com/aqsa-inamdar",
      socials: {
        email: "aqsa.inamdar@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/aqsa-inamdar",
        github: "https://github.com/aqsa-inamdar"
      }
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
      slug: "shankilya-gharat",
      email: "shankilya.gharat@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/shankilya-gharat",
      github: "https://github.com/shankilya-gharat",
      socials: {
        email: "shankilya.gharat@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/shankilya-gharat",
        github: "https://github.com/shankilya-gharat"
      }
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
      slug: "shravani-mayekar",
      email: "shravani.mayekar@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/shravani-mayekar",
      github: "https://github.com/shravani-mayekar",
      socials: {
        email: "shravani.mayekar@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/shravani-mayekar",
        github: "https://github.com/shravani-mayekar"
      }
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
      slug: "bhavesh-sonawane",
      email: "bhavesh.sonawane@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/bhavesh-sonawane",
      github: "https://github.com/bhavesh-sonawane",
      socials: {
        email: "bhavesh.sonawane@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/bhavesh-sonawane",
        github: "https://github.com/bhavesh-sonawane"
      }
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
      slug: "tejas-borse",
      email: "tejas.borse@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/tejas-borse",
      github: "https://github.com/tejas-borse",
      socials: {
        email: "tejas.borse@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/tejas-borse",
        github: "https://github.com/tejas-borse"
      }
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
      slug: "shivkumar-udaiyar",
      email: "shivkumar.udaiyar@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/shivkumar-udaiyar",
      github: "https://github.com/shivkumar-udaiyar",
      socials: {
        email: "shivkumar.udaiyar@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/shivkumar-udaiyar",
        github: "https://github.com/shivkumar-udaiyar"
      }
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
      slug: "surud-mahajan",
      email: "surud.mahajan@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/surud-mahajan",
      github: "https://github.com/surud-mahajan",
      socials: {
        email: "surud.mahajan@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/surud-mahajan",
        github: "https://github.com/surud-mahajan"
      }
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
      slug: "sharvin-mhatre",
      email: "sharvin.mhatre@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/sharvin-mhatre",
      github: "https://github.com/sharvin-mhatre",
      socials: {
        email: "sharvin.mhatre@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/sharvin-mhatre",
        github: "https://github.com/sharvin-mhatre"
      }
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
      slug: "gungun-purawat",
      email: "gungun.purawat@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/gungun-purawat",
      github: "https://github.com/gungun-purawat",
      socials: {
        email: "gungun.purawat@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/gungun-purawat",
        github: "https://github.com/gungun-purawat"
      }
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
      slug: "saumitra-chavan",
      email: "saumitra.chavan@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/saumitra-chavan",
      github: "https://github.com/saumitra-chavan",
      socials: {
        email: "saumitra.chavan@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/saumitra-chavan",
        github: "https://github.com/saumitra-chavan"
      }
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
      slug: "ronak-pansare",
      email: "ronak.pansare@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/ronak-pansare",
      github: "https://github.com/ronak-pansare",
      socials: {
        email: "ronak.pansare@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/ronak-pansare",
        github: "https://github.com/ronak-pansare"
      }
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
      slug: "grahit-shetty",
      email: "grahit.shetty@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/grahit-shetty",
      github: "https://github.com/grahit-shetty",
      socials: {
        email: "grahit.shetty@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/grahit-shetty",
        github: "https://github.com/grahit-shetty"
      }
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
      slug: "arnav-sarode",
      email: "arnav.sarode@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/arnav-sarode",
      github: "https://github.com/arnav-sarode",
      socials: {
        email: "arnav.sarode@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/arnav-sarode",
        github: "https://github.com/arnav-sarode"
      }
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
      slug: "aditya-jaiswal",
      email: "aditya.jaiswal@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/aditya-jaiswal",
      github: "https://github.com/aditya-jaiswal",
      socials: {
        email: "aditya.jaiswal@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/aditya-jaiswal",
        github: "https://github.com/aditya-jaiswal"
      }
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
      slug: "snehal-thakur",
      email: "snehal.thakur@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/snehal-thakur",
      github: "https://github.com/snehal-thakur",
      socials: {
        email: "snehal.thakur@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/snehal-thakur",
        github: "https://github.com/snehal-thakur"
      }
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
      slug: "fizza-ghankar",
      email: "fizza.ghankar@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/fizza-ghankar",
      github: "https://github.com/fizza-ghankar",
      socials: {
        email: "fizza.ghankar@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/fizza-ghankar",
        github: "https://github.com/fizza-ghankar"
      }
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
      slug: "krishna-chakave",
      email: "krishna.chakave@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/krishna-chakave",
      github: "https://github.com/krishna-chakave",
      socials: {
        email: "krishna.chakave@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/krishna-chakave",
        github: "https://github.com/krishna-chakave"
      }
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
      slug: "samruddhi-patil",
      email: "samruddhi.patil@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/samruddhi-patil",
      github: "https://github.com/samruddhi-patil",
      socials: {
        email: "samruddhi.patil@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/samruddhi-patil",
        github: "https://github.com/samruddhi-patil"
      }
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
      slug: "archit-jaijith",
      email: "archit.jaijith@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/archit-jaijith",
      github: "https://github.com/archit-jaijith",
      socials: {
        email: "archit.jaijith@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/archit-jaijith",
        github: "https://github.com/archit-jaijith"
      }
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
      slug: "manthan-gharat",
      email: "manthan.gharat@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/manthan-gharat",
      github: "https://github.com/manthan-gharat",
      socials: {
        email: "manthan.gharat@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/manthan-gharat",
        github: "https://github.com/manthan-gharat"
      }
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
      slug: "rutuja-gole",
      email: "rutuja.gole@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/rutuja-gole",
      github: "https://github.com/rutuja-gole",
      socials: {
        email: "rutuja.gole@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/rutuja-gole",
        github: "https://github.com/rutuja-gole"
      }
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
      slug: "avani-thakur",
      email: "avani.thakur@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/avani-thakur",
      github: "https://github.com/avani-thakur",
      socials: {
        email: "avani.thakur@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/avani-thakur",
        github: "https://github.com/avani-thakur"
      }
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
      slug: "karthikey-burghate",
      email: "karthikey.burghate@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/karthikey-burghate",
      github: "https://github.com/karthikey-burghate",
      socials: {
        email: "karthikey.burghate@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/karthikey-burghate",
        github: "https://github.com/karthikey-burghate"
      }
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
      slug: "jeet-patil",
      email: "jeet.patil@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/jeet-patil",
      github: "https://github.com/jeet-patil",
      socials: {
        email: "jeet.patil@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/jeet-patil",
        github: "https://github.com/jeet-patil"
      }
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
      slug: "tanishka-patrike",
      email: "tanishka.patrike@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/tanishka-patrike",
      github: "https://github.com/tanishka-patrike",
      socials: {
        email: "tanishka.patrike@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/tanishka-patrike",
        github: "https://github.com/tanishka-patrike"
      }
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
      slug: "bmadhav-manyo",
      email: "bmadhav.manyo@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/bmadhav-manyo",
      github: "https://github.com/bmadhav-manyo",
      socials: {
        email: "bmadhav.manyo@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/bmadhav-manyo",
        github: "https://github.com/bmadhav-manyo"
      }
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
      slug: "shreyas-bhagat",
      email: "shreyas.bhagat@siesgst.ac.in",
      linkedin: "https://www.linkedin.com/in/shreyas-bhagat",
      github: "https://github.com/shreyas-bhagat",
      socials: {
        email: "shreyas.bhagat@siesgst.ac.in",
        linkedin: "https://www.linkedin.com/in/shreyas-bhagat",
        github: "https://github.com/shreyas-bhagat"
      }
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


