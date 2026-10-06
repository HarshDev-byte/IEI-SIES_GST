# The Institution of Engineers (India) — SIES GST Student Chapter

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Institutional-0062FF)]()

> **"Where Engineers Belong. Where Tomorrow Leads."**  
> Official web portal for the **Institution of Engineers (India) Student Chapter**, hosted at the **Department of Electronics and Computer Science (ECS)**, SIES Graduate School of Technology, Navi Mumbai.

---

## 📌 Overview

The **IEI SIES GST** portal is a modern, high-performance web application engineered to represent the collegiate chapter of India's oldest and largest multi-disciplinary professional body of engineers. 

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, the application delivers an editorial-grade design language featuring kinetic typography morphing, interactive 3D visualisations, synthesizer-backed audio micro-interactions, responsive domain constellation browsing, and comprehensive member profiles.

---

## ✨ Key Features

- **🏛️ Monumental Hero Section**:
  - Interactive typographic morphing between the acronym (`I E I`) and the full statutory name (`Institution of Engineers India`).
  - Outward kinetic motes and real-time cursor-tracking perspective dynamics.
  - High-impact mission manifesto and departmental identity.

- **👥 People-First Governance & Team Constellation**:
  - **Faculty Leadership**: Dedicated spotlights for Head of Department (**Dr. Shubhangi Kharche**) and Student Branch Coordinator (**Prof. Jasmin Hirani**).
  - **Executive Councils**: Comprehensive roster across Senior Council and Junior Council domain heads.
  - **Domain Universe**: Filterable 6-domain architectural constellation (Technical, Industry Outreach & Admin, Design, Creative, Media, Secretary).
  - **1-Click Email Copy**: Hovering member cards reveals their official institutional email; clicking copies it instantly with visual checkmark feedback and audio confirmation.

- **🪪 Dedicated Member Profile Engine**:
  - Accessible via `#/member/:id` or `#/member/:slug`.
  - Editorial portrait framing, biographical highlights, technical domains, and social links.
  - Dynamic QR verification badge for student identification.

- **🧭 Permanent Floating Navigation**:
  - Sleek, permanently accessible glassmorphic bottom pill navigation bar.
  - Top viewport cybernetic reading depth indicator tracking document scroll progress.
  - Mobile full-screen directory drawer and quick search shortcut (`Cmd+K` / `Ctrl+K`).

- **🔊 Micro-Interaction Audio Engine**:
  - Built on the Web Audio API without bulky external sound assets.
  - Procedurally synthesizes crisp clicks, card taps, and subtle confirmation chimes.

- **⚡ Performance & Visual Excellence**:
  - Pure light mode aesthetic adhering to institutional brand guidelines.
  - Sub-second production bundling via Rollup/Vite.
  - Full mobile responsiveness across devices from 320px smartphones to 4K monitors.

---

## 🛠️ Tech Stack

| Technology | Role |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI architecture and component state management |
| **[Vite 8](https://vitejs.dev/)** | Lightning-fast development server and optimized build tool |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling engine with native CSS nesting and variables |
| **[Three.js](https://threejs.org/)** | WebGL graphics, kinetic backgrounds, and interactive point grids |
| **[GSAP](https://greensock.com/gsap/)** | Cinematic page and layout transition choreography |
| **[Lucide React](https://lucide.dev/)** | Lightweight, accessible SVG icon library |
| **[Canvas Confetti](https://github.com/catdad/canvas-confetti)** | Celebration particle triggers for special interactions |
| **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** | Procedural audio synthesis for UI feedback |

---

## 📂 Project Structure

```plaintext
IEI-SIES_GST/
├── public/                     # Static assets (logos, portraits, member images)
│   ├── assets/
│   │   ├── sc/                 # Senior Council portrait photography
│   │   ├── jc/                 # Junior Council portrait photography
│   │   └── team-portraits/     # Faculty leadership photography
│   └── iei-official-logo.png   # Official chapter emblem
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Hero.jsx            # Monumental landing hero with morphing text
│   │   ├── Navbar.jsx          # Permanent floating bottom pill navigation
│   │   ├── GovernanceTeam.jsx  # Domain constellation & chapter core decks
│   │   ├── MemberCard.jsx      # People-first portrait card with 1-click mail copy
│   │   ├── LeadershipSpotlight.jsx # Faculty leadership spotlight
│   │   ├── Footer.jsx          # Institutional chapter footer
│   │   ├── SearchModal.jsx     # Cmd+K directory lookup modal
│   │   └── ...
│   ├── pages/                  # Route-level page views
│   │   ├── HomePage.jsx        # Chapter landing page
│   │   ├── ActivitiesPage.jsx  # Technical workshops, hackathons & industrial visits
│   │   ├── EventsPage.jsx      # Flagship symposiums & competition registrations
│   │   ├── TeamPage.jsx        # Governance, domain wings & leadership
│   │   ├── ResourcesPage.jsx   # Publications, academic notes & syllabus archives
│   │   └── MemberProfilePage.jsx # Dedicated individual member profile view
│   ├── data/
│   │   ├── membersData.js      # Single source of truth for all roster members & emails
│   │   ├── activitiesData.js   # Chapter workshops and competition archives
│   │   └── eventsData.js       # Upcoming & flagship symposium schedules
│   ├── utils/
│   │   ├── audioEngine.js      # Procedural Web Audio API sound synthesizers
│   │   └── memberPhotoResolver.js # Fallback cascade for photo resolution
│   ├── App.jsx                 # Client-side router & root app lifecycle
│   ├── main.jsx                # React root mount
│   └── index.css               # Global theme tokens, typography & animations
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (recommended: `v20+`)
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HarshDev-byte/IEI-SIES_GST.git
   cd IEI-SIES_GST
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000/
```

### Production Build

Compile and bundle the application for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 👥 Member Data & Photo Management

Member profiles and contact details are centrally maintained in [`src/data/membersData.js`](src/data/membersData.js).

### Member Schema Example
```javascript
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
  bio: "Advises technical roadmap development, hackathon infrastructure, systems architecture, and engineering workshops.",
  github: "https://github.com/harshmhatre",
  linkedin: "https://www.linkedin.com/in/harsh-mhatre-7b9606320/",
  email: "harshpmecs123@gst.sies.edu.in",
  socials: {
    github: "https://github.com/harshmhatre",
    linkedin: "https://www.linkedin.com/in/harsh-mhatre-7b9606320/",
    email: "harshpmecs123@gst.sies.edu.in"
  }
}
```

### Photo Specifications
- **Dimensions**: Aspect ratio `4:5` (recommended: `666 × 1000 px`).
- **Location**:
  - Senior Council: `public/assets/sc/[PRN].jpg`
  - Junior Council: `public/assets/jc/[PRN].jpg`
- **Fallback**: Automatically falls back to an institutional monogram avatar if a photo is missing or fails to load.

---

## 🏛️ Institutional Accreditation

**The Institution of Engineers (India) — SIES GST Student Chapter**  
- **Parent Body**: The Institution of Engineers (India), Kolkata (Est. 1920, Royal Charter 1935).  
- **Host Institution**: SIES Graduate School of Technology, Sri Chandrasekarendra Saraswati Vidyapuram, Sector-V, Nerul, Navi Mumbai, Maharashtra 400706.  
- **Host Department**: Department of Electronics & Computer Science Engineering (ECS).  
- **Official Inquiries**: `iei@siesgst.edu.in`

---

## 📄 License

This repository and its assets are developed and maintained by the **IEI SIES GST Technical Wing** for official student chapter operations. All rights reserved by **SIES Graduate School of Technology** and **The Institution of Engineers (India)**.
