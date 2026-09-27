import React, { useState } from 'react';
import { Camera, Maximize2, X, Calendar, MapPin } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function PhotographicArchive() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const archiveItems = [
    {
      id: "doc-01",
      code: "IEI·DOC·01",
      title: "Annual Technical Conclave",
      tag: "Symposium & Keynote Plenary",
      location: "Auditorium, SIES GST",
      date: "Academic Session 2024–2025",
      desc: "Plenary assembly of 400+ engineering students, distinguished national fellows, and department faculty inaugurating the annual chapter symposium.",
      aspect: "col-span-1 md:col-span-2 lg:col-span-8"
    },
    {
      id: "doc-02",
      code: "IEI·DOC·02",
      title: "Microcontroller Firmware Testbench",
      tag: "Hardware Lab Sprint",
      location: "Hardware Lab 3, ECS Department",
      date: "Fall Semester",
      desc: "Oscilloscope and logic analyzer telemetry debugging during an intensive 32-bit ARM Cortex RTOS workshop session.",
      aspect: "col-span-1 md:col-span-1 lg:col-span-4"
    },
    {
      id: "doc-03",
      code: "IEI·DOC·03",
      title: "Technical Project Peer Review",
      tag: "Applied Innovation",
      location: "Seminar Hall, SIES GST",
      date: "Spring Semester",
      desc: "Faculty evaluators assessing third-year student IoT sensor arrays and distributed telemetry prototypes.",
      aspect: "col-span-1 md:col-span-1 lg:col-span-4"
    },
    {
      id: "doc-04",
      code: "IEI·DOC·04",
      title: "Collegiate Systems Hackathon",
      tag: "Rapid Prototyping Sprint",
      location: "Central Computer Center",
      date: "Annual Flagship",
      desc: "36-hour sprint with student teams fabricating embedded firmware, mobile apps, and machine learning inference pipelines.",
      aspect: "col-span-1 md:col-span-2 lg:col-span-8"
    }
  ];

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-black/[0.06]" aria-label="Chapter Photographic Archive">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-minimal badge-blue">
              08 VISUAL DOCUMENTATION
            </span>
            <span className="badge-minimal">
              CHAPTER ARCHIVE
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-950 tracking-ultra-tight">
            Chapter Archive
          </h2>
        </div>

        <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          Visual documentation of workshops, symposiums, laboratory sessions, and collegiate build sprints.
        </p>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {archiveItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedPhoto(item);
              audioEngine.playClick();
            }}
            className={`${item.aspect} bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] group relative min-h-[260px] sm:min-h-[300px] overflow-hidden cursor-pointer flex flex-col justify-end p-6 sm:p-7 hover:border-black/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all`}
          >
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-zinc-500 group-hover:text-zinc-950 transition-colors">
              <Maximize2 size={14} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
                <span className="text-[#0062FF] font-semibold text-[11px]">
                  {item.code}
                </span>
                <span className="text-zinc-500 uppercase text-[10px]">
                  · {item.tag}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950 group-hover:text-[#0062FF] transition-colors mb-2">
                {item.title}
              </h3>

              <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-zinc-400" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} className="text-zinc-400" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white border border-black/[0.1] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-black p-1.5 rounded-full hover:bg-black/[0.05] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="font-mono text-xs text-[#0062FF] mb-1.5 font-semibold">{selectedPhoto.code} · {selectedPhoto.tag}</div>
            <h3 className="font-display text-xl font-bold text-zinc-950 mb-2">{selectedPhoto.title}</h3>
            
            <div className="h-40 rounded-xl bg-zinc-50 border border-black/[0.08] flex items-center justify-center font-mono text-xs text-zinc-500 mb-4">
              [HIGH RESOLUTION PHOTOGRAPHIC RECORD · {selectedPhoto.code}]
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              {selectedPhoto.desc}
            </p>

            <div className="flex items-center justify-between font-mono text-xs text-zinc-500 pt-3 border-t border-black/[0.06]">
              <span>Venue: {selectedPhoto.location}</span>
              <span>Archived: {selectedPhoto.date}</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
