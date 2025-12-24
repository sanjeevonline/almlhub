
import React, { useState, useMemo } from 'react';
import { Category, CompetencyTerm, MaturityLevel } from '../types';
import TechnicalRadar from './TechnicalRadar';

interface Props {
  onViewChange?: (view: 'glossary' | 'radar') => void;
  allCompetencies: CompetencyTerm[];
}

const RadarView: React.FC<Props> = ({ onViewChange, allCompetencies }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Category | null>(null);
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyTerm | null>(null);

  const QUADRANTS: Category[] = ['Techniques', 'Platforms', 'Tools', 'Governance'];

  const parseTechnicalData = (raw?: string) => {
    if (!raw) return { definition: '', application: '', risks: '' };
    const sections: Record<string, string> = { definition: '', application: '', risks: '' };
    const parts = raw.split(/###\s+/);
    parts.forEach(part => {
      const lines = part.trim().split('\n');
      if (lines.length < 1) return;
      const title = lines[0].toLowerCase().trim();
      const body = lines.slice(1).join('\n').trim();
      if (title.includes('definition')) sections.definition = body;
      if (title.includes('application')) sections.application = body;
      if (title.includes('risks')) sections.risks = body;
    });
    return sections;
  };

  const getMaturityTheme = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800';
      case 'Trial': return 'text-indigo-500 bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800';
      case 'Assess': return 'text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800';
      case 'Experimental': return 'text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800';
    }
  };

  const getQuadrantColor = (quad: Category) => {
    switch (quad) {
      case 'Platforms': return 'text-rose-600 dark:text-rose-400';
      case 'Governance': return 'text-emerald-600 dark:text-emerald-400';
      case 'Techniques': return 'text-indigo-600 dark:text-indigo-400';
      case 'Tools': return 'text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto no-scrollbar bg-slate-50 dark:bg-slate-900">
      {/* Radar Section - Full Width Display */}
      <div className="flex-none w-full h-[55vh] md:h-[70vh] p-4 relative overflow-hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center">
        <div className="absolute top-6 left-6 z-20 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Strategic Intelligence Radar</h2>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
             {QUADRANTS.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setSelectedQuadrant(selectedQuadrant === cat ? null : cat as Category)}
                 className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                    selectedQuadrant === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
        
        <div className="h-full w-full max-w-5xl flex items-center justify-center pt-8">
           <TechnicalRadar 
              onQuadrantClick={(q) => setSelectedQuadrant(q as Category)} 
              onPointClick={(item) => setSelectedCompetency(item)}
              activeQuadrant={selectedQuadrant}
              allCompetencies={allCompetencies}
            />
        </div>
      </div>

      {/* List Section - Grouped by Quadrant, Multi-Column Layout */}
      <div className="flex-1 w-full p-4 md:p-10 space-y-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          {QUADRANTS.map(quad => {
            const quadItems = allCompetencies.filter(i => i.category === quad);
            if (quadItems.length === 0) return null;
            
            return (
              <div key={quad} className={`space-y-6 ${selectedQuadrant && selectedQuadrant !== quad ? 'opacity-30 grayscale transition-all' : 'transition-all'}`}>
                <div className="flex items-center gap-4">
                  <h3 className={`text-2xl font-black uppercase tracking-tighter ${getQuadrantColor(quad)}`}>{quad}</h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700/50"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{quadItems.length} Domains</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3">
                  {quadItems.sort((a,b) => a.name.localeCompare(b.name)).map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedCompetency(item)}
                      className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl flex flex-col gap-2 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-xl hover:-translate-y-0.5 transition-all text-left relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase border ${getMaturityTheme(item.maturity)}`}>
                          {item.maturity}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-[10px] md:text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide truncate">
                          {item.keyTech || 'Standard Core'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Synchronized Detail Briefing Modal */}
      {selectedCompetency && (() => {
        const techData = parseTechnicalData(selectedCompetency.details);
        const definition = techData.definition || selectedCompetency.description;
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/90 backdrop-blur-md animate-in fade-in">
             <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 md:rounded-[3rem] border border-white/10">
                
                <div className="flex-none px-6 py-6 md:px-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getMaturityTheme(selectedCompetency.maturity)}`}>
                        {selectedCompetency.maturity} Phase
                      </span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedCompetency.category}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{selectedCompetency.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 no-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                      <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Horizon Placement</span>
                      <span className="text-[12px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{selectedCompetency.maturity}</span>
                    </div>
                    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                      <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Functional Domain</span>
                      <span className="text-[12px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">{selectedCompetency.category}</span>
                    </div>
                  </div>
                  
                  <section className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">Technical Briefing</h4>
                    <p className="text-sm md:text-xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-wrap">{definition}</p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-[2rem] bg-emerald-50/60 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                      <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-3">Deployment Scenario</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{techData.application || "Critical path dependency for architectural synchronization in frontier model workflows."}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-rose-50/60 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
                      <h4 className="text-[10px] font-black text-rose-600 dark:text-rose-500 uppercase tracking-widest mb-3">Key Constraints</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">{techData.risks || "Latent complexity requiring rigorous governance and automated validation layers."}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-none px-6 py-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-black/20">
                   <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white text-[12px] font-black uppercase tracking-widest rounded-3xl shadow-2xl transition-transform active:scale-95"
                   >
                     Exit Briefing
                   </button>
                </div>
             </div>
          </div>
        );
      })()}
    </div>
  );
};

export default RadarView;
