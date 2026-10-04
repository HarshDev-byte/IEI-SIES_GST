# IEI SIES GST — Homepage Content Specification & Change Guide

> **Document Scope**: Detailed editorial content audit and specification guide for the Homepage Editorial Narrative and Fact Strip sections, based on the approved design composition (Second Image reference).

---

## 1. Overview & Architectural Mapping

The section displayed in the reference image corresponds directly to two key modular components in the codebase:

| Section in Image | Component File Path | Primary Function |
| :--- | :--- | :--- |
| **Top Architectural Fact Strip** | [`src/components/Hero.jsx`](file:///c:/Users/sharv/Documents/GitHub/IEI-SIES_GST/src/components/Hero.jsx) (Lines 488–538) | Institutional statutory metrics and historical accreditation |
| **01 / WHO WE ARE** | [`src/components/ChapterEditorialNarrative.jsx`](file:///c:/Users/sharv/Documents/GitHub/IEI-SIES_GST/src/components/ChapterEditorialNarrative.jsx) (Lines 86–114) | Chapter identity, institutional mission, and department affiliation |
| **02 / WHAT WE DO** | [`src/components/ChapterEditorialNarrative.jsx`](file:///c:/Users/sharv/Documents/GitHub/IEI-SIES_GST/src/components/ChapterEditorialNarrative.jsx) (Lines 116–151) | Six disciplined operational tracks and technical offerings |
| **03 / CHAPTER FOCUS** | [`src/components/ChapterEditorialNarrative.jsx`](file:///c:/Users/sharv/Documents/GitHub/IEI-SIES_GST/src/components/ChapterEditorialNarrative.jsx) (Lines 153–194) | 4-Pillar classification taxonomy (Technical, Industry, Innovation, Community) |
| **04 / CURRENT INITIATIVE** | [`src/components/ChapterEditorialNarrative.jsx`](file:///c:/Users/sharv/Documents/GitHub/IEI-SIES_GST/src/components/ChapterEditorialNarrative.jsx) (Lines 196–250) | Featured annual flagship event, 36-hour sprint details, and action CTA |

---

## 2. Detailed Content Specifications by Section

### A. Top Fact Strip (Institutional Metrics)
Located at the base of the Hero section, immediately preceding the narrative.

- **Metric 01**:
  - Overline: `ROYAL CHARTER`
  - Stat: `1935`
  - Subtext: `King George V Statutory Warrant`
- **Metric 02**:
  - Overline: `SCIENTIFIC RECOGNITION`
  - Stat: `DSIR SIRO`
  - Subtext: `Ministry of Science & Technology`
- **Metric 03**:
  - Overline: `CONSTITUTIONAL STANDING`
  - Stat: `Article 372`
  - Subtext: `Body Corporate of India`
- **Metric 04**:
  - Overline: `APEX FOOTPRINT`
  - Stat: `1,000,000+`
  - Subtext: `Global Alumni Across 15 Disciplines`

---

### B. 01 / WHO WE ARE (Collegiate Identity)

#### Left Column (Section Identifier)
- **Tag**: `01 / WHO WE ARE`
- **Headline**: `Collegiate Engineering Community`
- **Subtitle / Meta**: `SIES GST · Student Chapter`

#### Right Column (Editorial Statement & Narrative)
- **Monumental Statement**:
  > *"Operating at the intersection of applied embedded systems, hardware testbenches, and sovereign statutory engineering accreditation."*
- **Supporting Paragraph**:
  > *"Anchored within the Department of Electronics & Computer Science at SIES Graduate School of Technology, the chapter bridges classroom theoretical fundamentals with physical testbenches, industrial site visits, competitive hackathons, and research publication pathways under the century-old umbrella of The Institution of Engineers (India)."*

---

### C. 02 / WHAT WE DO (Chapter Technical Initiatives)

#### Left Column
- **Tag**: `02 / WHAT WE DO`
- **Headline**: `Chapter Technical Initiatives`
- **Description**: `Six disciplined operational tracks conducted across each academic semester at SIES GST.`

#### Right Column: 6-Track Typographic Grid

| Number | Initiative Title | Scope Description |
| :---: | :--- | :--- |
| **01** | **Hands-on Hardware Workshops** | Embedded ARM Cortex-M microcontrollers, FreeRTOS deterministic kernels, and multi-layer KiCad PCB fabrication testbenches. |
| **02** | **Technical Symposia & Conclaves** | Annual departmental summits, plenary colloquiums, and distinguished keynotes by corporate Fellows (FIE) and research scientists. |
| **03** | **Collegiate Hackathons & Ideathons** | 36-hour rapid systems engineering marathons building physical firmware, sensor interfaces, and connected production prototypes. |
| **04** | **Industrial Delegations & Site Excursions** | Curated technical excursions to premier industrial complexes, supercomputing facilities, and satellite ground stations. |
| **05** | **Applied Research & TechChronicle** | Mentoring under DSIR SIRO research grant guidelines and bi-annual student editorial publishing in IEI-GST TechChronicle. |
| **06** | **Mock Placements & Career Screening** | Rigorous technical interview sprints, algorithmic problem-solving sessions, and core electronics domain screening. |

---

### D. 03 / CHAPTER FOCUS (Classification Taxonomy)

#### Left Column
- **Tag**: `03 / CHAPTER FOCUS`
- **Headline**: `Classification Taxonomy`
- **Description**: `Structured focus areas guiding student projects, resource allocation, and mentorship.`

#### Right Column: 4 Strategic Pillars

1. **TECHNICAL** (`Applied Hardware Testbenches`)
   - ARM Cortex-M & STM32
   - Deterministic FreeRTOS
   - Multi-Layer PCB Routing
   - Logic Analyzer Telemetry

2. **INDUSTRY** (`Corporate & Professional Linkage`)
   - Fellow (FIE) Keynotes
   - Site Excursions
   - Core Placement Sprints
   - Alumni Mentorship

3. **INNOVATION** (`Scientific & Applied Research`)
   - DSIR SIRO Grant Scheme
   - TechChronicle E-Magazine
   - Hardware Prototypes
   - Patent Digest Circles

4. **COMMUNITY** (`Student Governance & Wings`)
   - 56+ Active Members
   - 7 Operational Wings
   - Peer Code Reviews
   - Collegiate Symposia

---

### E. 04 / CURRENT INITIATIVE (Annual Flagship Feature)

#### Left Column
- **Tag**: `04 / CURRENT INITIATIVE`
- **Headline**: `Flagship Systems Sprint`
- **Meta Tag**: `Academic Year 2026–2027`

#### Right Column
- **Badge Line**: `ANNUAL CHAPTER FLAGSHIP · SIES GST` · `36-Hour Continuous Build`
- **Title**: `36-Hour Systems Engineering Hackathon & Hardware Testbench`
- **Description**:
  > *"The collegiate flagship where multidisciplinary student teams program deterministic FreeRTOS kernels, calibrate robotic sensor arrays, route custom PCB modules, and fabricate functional physical prototypes. Judged by senior industrial Fellows and accredited academic mentors."*
- **Primary CTA Button**: `EXPLORE ALL 8 CHAPTER INITIATIVES →` (Routes to `#/activities`)
- **Location Meta**: `Department of ECS · Lab 3 Dispensary`

---

## 3. How to Apply Content Updates

To update any copy in this section, edit [`src/components/ChapterEditorialNarrative.jsx`](file:///c:/Users/sharv\Documents\GitHub\IEI-SIES_GST\src\components\ChapterEditorialNarrative.jsx):

1. **Initiative List**: Update the `activitiesList` array (Lines 22–53).
2. **Focus Pillars**: Update the `focusClassifications` array (Lines 55–76).
3. **Hero Statement**: Update paragraphs inside Section 01 (Lines 105–111).
4. **Current Flagship**: Update lines inside Section 04 (Lines 216–246).

*Note: All items use 240Hz hardware-accelerated scroll reveal classes (`reveal-on-scroll`). Retain existing CSS classes and semantic tag hierarchies to maintain responsiveness and 240Hz performance.*
