import React from 'react';
import { Download, FileText, FolderArchive, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ResourcesRepository() {
  const resources = [
    {
      num: "01",
      title: "AMIE Examination Regulations, Syllabus & Scheme of Evaluation",
      category: "Statutory Examination",
      format: "PDF",
      fileSize: "2.8 MB",
      desc: "Comprehensive guidelines for Section A (common) and Section B (discipline-specific) examinations, recognized by the Ministry of Education as equivalent to B.E./B.Tech."
    },
    {
      num: "02",
      title: "IEI National Grant-in-Aid Research Scheme — Application Dossier",
      category: "SIRO Research Scheme",
      format: "PDF",
      fileSize: "1.9 MB",
      desc: "Official application format and guidelines for undergraduate, postgraduate, and PhD scholars seeking research funding from IEI under DSIR recognition."
    },
    {
      num: "03",
      title: "IEI-Springer Journal Series Author Guidelines & Reference Format",
      category: "Publications & Journals",
      format: "PDF",
      fileSize: "1.6 MB",
      desc: "Manuscript submission protocols for the 5 peer-reviewed Springer series covering all 15 disciplines, with citation styles and ethical compliance."
    },
    {
      num: "04",
      title: "IEI-GST TechChronicle (Bi-Annual Student E-Magazine, Vol. 1 & 2)",
      category: "Chapter Publication",
      format: "PDF",
      fileSize: "6.4 MB",
      desc: "Bi-annual official student chapter e-magazine featuring hardware teardowns, research papers, alumni interviews, and domain wing initiatives."
    },
    {
      num: "05",
      title: "Chapter Constitution, Bylaws & Operational Mandate",
      category: "Institutional Document",
      format: "PDF",
      fileSize: "1.4 MB",
      desc: "The complete organizational charter, council hierarchy, electoral bylaws, and operating principles ratified by IEI headquarters."
    },
    {
      num: "06",
      title: "Departmental Microcontroller Lab Guidelines & Pinout Maps",
      category: "Technical Tooling",
      format: "PDF",
      fileSize: "3.8 MB",
      desc: "Pinout schematics, power rail tolerances, logic thresholds, and bench protocols for ECS hardware laboratories."
    },
    {
      num: "07",
      title: "Standard Project Documentation & IEEE LaTeX Repository Template",
      category: "Developer Kit",
      format: "ZIP",
      fileSize: "8.6 MB",
      desc: "Official chapter LaTeX boilerplate conforming to IEEE conference and journal typography, bibtex references, and vector figure macros."
    }
  ];

  const handleDownload = (res) => {
    audioEngine.playChime();
    alert(`Initiating download for "${res.title}" [${res.format} · ${res.fileSize}].`);
  };

  return (
    <section id="resources" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" aria-label="Student Resources">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            Resources &amp; Publications
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Official AMIE syllabi, SIRO Grant-in-Aid forms, Springer journal guidelines, chapter e-magazines, and engineering lab templates.
        </p>
      </div>

      {/* RESOURCES LIST */}
      <div className="space-y-3.5">
        {resources.map((res) => (
          <div
            key={res.num}
            className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:border-black/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-zinc-100 border border-black/[0.08] flex items-center justify-center shrink-0 text-[#0062FF]">
                {res.format === 'ZIP' ? <FolderArchive size={20} /> : <FileText size={20} />}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-medium mb-1">
                  <span>{res.category}</span>
                  <span>•</span>
                  <span>{res.format} · {res.fileSize}</span>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-zinc-950 group-hover:text-[#0062FF] transition-colors">
                  {res.title}
                </h3>

                <p className="text-zinc-600 text-xs sm:text-sm mt-0.5 max-w-2xl font-normal leading-relaxed">
                  {res.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload(res)}
              className="btn-minimal-primary text-xs shrink-0 self-start md:self-center cursor-pointer"
            >
              <Download size={13} />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
