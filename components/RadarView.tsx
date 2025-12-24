
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

  const RINGS: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];

  const groupedItems = useMemo(() => {
    if (!selectedQuadrant) return {} as Record<MaturityLevel, CompetencyTerm[]>;
    const quadrantItems = allCompetencies.filter(item => item.category === selectedQuadrant);
    return RINGS.reduce((acc, level) => {
      acc[level] = quadrantItems.filter(item => item.maturity === level);
      return acc;
    }, {} as Record<MaturityLevel, CompetencyTerm[]>);
  }, [selectedQuadrant, allCompetencies]);

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

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Radar Section */}
      <div className="flex-none md:flex-1 h-[40vh] md:h-full p-3 relative overflow-hidden bg-white dark:bg-slate-800 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 shadow-inner">
        <div className="absolute top-4 left-4 z-20 space-y-2">
          <h2 className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white">Strategic Radar</h2>
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
             {['Techniques', 'Platforms', 'Tools', 'Governance'].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setSelectedQuadrant(selectedQuadrant === cat ? null : cat as Category)}
                 className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                    selectedQuadrant === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center pt-10">
           <TechnicalRadar 
              onQuadrantClick={(q) => setSelectedQuadrant(q as Category)} 
              onPointClick={(item) => setSelectedCompetency(item)}
              activeQuadrant={selectedQuadrant}
              allCompetencies={allCompetencies}
            />
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 md:w-1/3 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
        <div className="flex-none p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Capability Matrix</h3>
           {selectedQuadrant && (
             <span className="text-[9px] font-black uppercase text-indigo-500">{selectedQuadrant}</span>
           )}
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-4">
          {RINGS.map(level => {
            const items = allCompetencies.filter(i => 
              (!selectedQuadrant || i.category === selectedQuadrant) && 
              i.maturity === level
            );
            if (items.length === 0) return null;
            return (
              <div key={level} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded border ${getMaturityTheme(level)}`}>{level}</span>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {items.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedCompetency(item)}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 group transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors uppercase truncate mr-2">{item.name}</span>
                        <svg className="flex-shrink-0 w-3 h-3 text-slate-200 dark:text-slate-700 group-hover:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Synced Detailed Modal */}
      {selectedCompetency && (() => {
        const techData = parseTechnicalData(selectedCompetency.details);
        const definition = techData.definition || selectedCompetency.description;
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-md animate-in fade-in">
             <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 md:rounded-[2.5rem] border border-white/10">
                
                <div className="flex-none px-6 py-5 md:px-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getMaturityTheme(selectedCompetency.maturity)}`}>
                        {selectedCompetency.maturity}
                      </span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{selectedCompetency.category}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{selectedCompetency.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Horizon</span>
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">{selectedCompetency.maturity}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Sector</span>
                      <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase">{selectedCompetency.category}</span>
                    </div>
                  </div>
                  
                  <section className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Briefing</h4>
                    <p className="text-sm md:text-lg font-semibold text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{definition}</p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="p-5 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                      <h4 className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-2">Practical Application</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{techData.application || "Strategic dependency for frontier model deployment."}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30">
                      <h4 className="text-[9px] font-black text-rose-600 dark:text-rose-500 uppercase tracking-widest mb-2">Architectural Risk</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">{techData.risks || "Latent complexity in production synchronization."}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-none px-6 py-6 border-t border-slate-100 dark:border-slate-800">
                   <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl"
                   >
                     Close Briefing
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
