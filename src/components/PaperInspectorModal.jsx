import React from 'react';
import { X, BookOpen, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function PaperInspectorModal({ isOpen, seriesId, onClose }) {
  if (!isOpen) return null;

  const seriesData = {
    'series-a': {
      title: 'Journal of The Institution of Engineers (India): Series A',
      sub: 'Civil, Architectural, Environmental and Agricultural Engineering',
      issn: '2250-2149 (Print) | 2250-2157 (Electronic)',
      indexing: ['Scopus (Q2)', 'Inspec', 'EI Compendex', 'Google Scholar', 'SCImago (SJR 0.42)'],
      articles: [
        {
          title: 'Non-Linear Seismic Dynamic Fragility of Pre-Stressed High-Altitude Concrete Bridges',
          authors: 'Dr. S. K. Bhattacharyya, Er. M. V. Raman',
          doi: '10.1007/s40030-026-00941-8',
          citations: 34
        },
        {
          title: 'Subterranean Hydrological Seepage Control in Long-Span Himalayan Tunnels using Silica Grout',
          authors: 'Prof. A. Sengupta, Dr. K. Radhakrishnan',
          doi: '10.1007/s40030-026-00942-2',
          citations: 28
        }
      ]
    },
    'series-b': {
      title: 'Journal of The Institution of Engineers (India): Series B',
      sub: 'Electrical, Electronics & Telecommunications, and Computer Engineering',
      issn: '2250-2106 (Print) | 2250-2114 (Electronic)',
      indexing: ['Scopus (Q2)', 'Web of Science (ESCI)', 'Inspec', 'EI Compendex'],
      articles: [
        {
          title: 'Decentralized Grid Frequency Regulation via Distributed Solid-State BESS under High Solar Penetration',
          authors: 'Dr. C. P. Narayanan, Er. P. K. Mohanty',
          doi: '10.1007/s40031-026-00812-4',
          citations: 45
        },
        {
          title: 'Quantum-Resistant Lattice Key Exchange Protocols for Sovereign Critical Infrastructure SCADA',
          authors: 'Prof. T. V. Rao, Dr. S. Mukherjee',
          doi: '10.1007/s40031-026-00815-1',
          citations: 52
        }
      ]
    },
    'series-c': {
      title: 'Journal of The Institution of Engineers (India): Series C',
      sub: 'Mechanical, Aerospace, Production and Marine Engineering',
      issn: '2250-0545 (Print) | 2250-0553 (Electronic)',
      indexing: ['Scopus (Q2)', 'EI Compendex', 'Inspec', 'Aerospace Database'],
      articles: [
        {
          title: 'Cryogenic Liquid Fuel Injection Atomization in High-Thrust Semi-Cryogenic Rocket Engines',
          authors: 'Dr. K. S. Somnath, Er. V. N. Nair',
          doi: '10.1007/s40032-026-00789-9',
          citations: 61
        },
        {
          title: 'Thermal Microstructure Evolution in Direct Laser Deposition of Inconel 718 Turbine Blades',
          authors: 'Prof. B. Gurumoorthy, Dr. N. Sinha',
          doi: '10.1007/s40032-026-00792-6',
          citations: 39
        }
      ]
    }
  };

  const current = seriesData[seriesId] || seriesData['series-a'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#050608]/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className="glass-panel-elevated w-full max-w-2xl rounded-lg border border-white/20 p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crosshair-corner crosshair-tl" />
        <div className="crosshair-corner crosshair-br" />

        <button
          type="button"
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded bg-[#075BFF]/15 border border-[#00D6FF]/40 flex items-center justify-center text-[#00D6FF] flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="badge-cad-blue text-[10px] mb-1.5 inline-block">
              SPRINGER NATURE · CO-PUBLICATION
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              {current.title}
            </h3>
            <p className="text-xs text-[#00D6FF] mt-1 font-mono">
              {current.sub}
            </p>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="space-y-3 mb-6 font-mono text-xs text-white/60">
          <div>
            <span className="text-white/40">ISSN: </span>
            <span className="text-white/80">{current.issn}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-white/40">INDEXED IN: </span>
            {current.indexing.map((idx) => (
              <span key={idx} className="badge-cad text-[10px]">
                {idx}
              </span>
            ))}
          </div>
        </div>

        {/* Articles Table */}
        <div className="mb-6">
          <div className="font-mono text-xs uppercase text-white/60 mb-3 flex items-center justify-between">
            <span>LATEST PEER-REVIEWED PAPERS</span>
            <span className="text-[#00D6FF]">VOLUME 107 · ISSUE 03</span>
          </div>

          <div className="space-y-3">
            {current.articles.map((art) => (
              <div 
                key={art.doi}
                className="p-3.5 rounded bg-white/[0.02] border border-white/[0.08] hover:border-[#00D6FF]/40 transition-all"
              >
                <div className="font-display font-semibold text-sm text-white hover:text-[#00D6FF] cursor-pointer transition-colors">
                  {art.title}
                </div>
                <div className="font-mono text-[11px] text-white/50 mt-1">
                  {art.authors}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05] font-mono text-[10px] text-white/40">
                  <span>DOI: {art.doi}</span>
                  <span className="text-[#00D6FF]">CITATIONS: {art.citations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <a
            href="https://www.springer.com"
            target="_blank"
            rel="noreferrer"
            className="btn-engineering-primary text-xs py-2.5 px-4 font-semibold flex items-center gap-2"
          >
            <span>Submit Manuscript on Springer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => {
              audioEngine.playClick();
              alert('Author Guidelines & Editorial Board PDF downloaded.');
            }}
            className="btn-engineering-secondary text-xs py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Author Formatting Guidelines</span>
          </button>
        </div>

      </div>
    </div>
  );
}
