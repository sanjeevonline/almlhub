import React, { useState, useMemo } from 'react';
import { COMPETENCY_DB } from '../data';
import { Category, CompetencyTerm, MaturityLevel } from '../types';
import TechnicalRadar from './TechnicalRadar';
import { TECHNICAL_DETAILS } from '../detailed-knowledge';

const RadarView: React.FC = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Category | null>(null);
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyTerm | null>(null);

  const RINGS: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];

  const groupedItems = useMemo(() => {
    if (!selectedQuadrant) return {} as Record<MaturityLevel, CompetencyTerm[]>;
    
    const quadrantItems = COMPETENCY_DB.glossary.filter(item => item.category === selectedQuadrant);
    
    return RINGS.reduce((acc, level) => {
      acc[level] = quadrantItems.filter(item => item.maturity === level);
      return acc;
    }, {} as Record<MaturityLevel, CompetencyTerm[]>);
  }, [selectedQuadrant]);

  const getPillarColor = (pillar: Category) => {
    switch (pillar) {
      case 'Strategy': return 'text-rose-600';
      case 'Data': return 'text-emerald-600';
      case 'Design': return 'text-indigo-600';
      case 'Delivery': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  const getMaturityTheme = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'Trial': return 'text-indigo-500 bg-indigo-50 border-indigo-100';
      case 'Assess': return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'Experimental': return 'text-purple-500 bg-purple-50 border-purple-100';
    }
  };

  const parseTechnicalData = (id: string) => {
    const raw = TECHNICAL_DETAILS[id];
    if (!raw) return { definition: '', application: '', risks: '' };
    
    const sections: Record<string, string> = {
      definition: '',
      application: '',
      risks: ''
    };

    const parts = raw.split(/###\s+/);
    parts.forEach(part => {
      const lines = part.trim().split('\n');
      if (lines.length < 1) return;
      
      const title = lines[0].toLowerCase().trim();
      const body = lines.slice(1).join(' ').trim()
        .replace(/\*\*/g, '')
        .replace(/^\-\s/gm, '')
        .replace(/^\•\s/gm, '')
        .replace(/^\d\.\s/gm, '')
        .replace(/\s+/g, ' ');

      if (title.includes('definition')) sections.definition = body;
      if (title.includes('application')) sections.application = body;
      if (title.includes('risks')) sections.risks = body;
    });

    return sections;
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* Header Info */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">Strategic Radar</h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl">
            Explore the technology landscape across our four strategic pillars. Select a quadrant to deep-dive into the capability index.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
           <button 
              onClick={() => { setSelectedQuadrant(null); }}
              className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all ${!selectedQuadrant ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
           >
             ALL
           </button>
           {['Design', 'Delivery', 'Strategy', 'Data'].map((p) => (
             <button 
                key={p} 
                onClick={() => { setSelectedQuadrant(p as Category); }}
                className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all ${selectedQuadrant === p ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
             >
               {p}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Section */}
        <div className={`${selectedQuadrant ? 'lg:col-span-6' : 'lg:col-span-12'} transition-all duration-500`}>
          <TechnicalRadar 
            onQuadrantClick={(q) => { setSelectedQuadrant(q as Category); }} 
            activeQuadrant={selectedQuadrant}
          />
        </div>

        {/* Detailed Side Panel */}
        {selectedQuadrant && (
          <div className="lg:col-span-6 space-y-4 animate-in slide-in-from-right duration-500 max-h-[700px] overflow-y-auto pr-2 no-scrollbar">
            {/* Simplified Header */}
            <div className="py-2 mb-4 border-none">
               <h3 className={`text-xl font-black uppercase tracking-tight ${getPillarColor(selectedQuadrant)}`}>
                 {selectedQuadrant}
               </h3>
               <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                 Capability Index
               </p>
            </div>

            <div className="space-y-12 pb-20 mt-4">
              {RINGS.map(level => {
                const items = groupedItems[level] || [];
                if (items.length === 0) return null;

                return (
                  <section key={level} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${getMaturityTheme(level)}`}>
                        {level}
                      </h4>
                      <div className="h-px flex-1 bg-slate-50"></div>
                    </div>

                    <div className="flex flex-col gap-1">
                      {items.map(item => {
                        return (
                          <div key={item.id} className="group">
                            <button 
                              onClick={() => setSelectedCompetency(item)}
                              className="w-full text-left py-2 px-1 flex items-center justify-between transition-all rounded-lg hover:bg-slate-50/50"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  level === 'Adopt' ? 'bg-emerald-400' : 
                                  level === 'Trial' ? 'bg-indigo-400' :
                                  level === 'Assess' ? 'bg-amber-400' : 'bg-purple-400'
                                }`}></div>
                                <span className="text-[11px] font-bold uppercase tracking-tight text-slate-400 group-hover:text-indigo-500 transition-colors">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Explore</span>
                                <svg className="w-3 h-3 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Competency Modal (Executive Detail View) */}
      {selectedCompetency && (() => {
        const techData = parseTechnicalData(selectedCompetency.id);
        const definition = techData.definition || selectedCompetency.description;
        const getTagColor = (category: Category) => {
          switch (category) {
            case 'Strategy': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Design': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'Delivery': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
          }
        };
        const getMaturityColor = (level: MaturityLevel) => {
          switch (level) {
            case 'Adopt': return 'bg-emerald-500 text-white border-emerald-600';
            case 'Trial': return 'bg-indigo-500 text-white border-indigo-600';
            case 'Assess': return 'bg-amber-500 text-white border-amber-600';
            case 'Experimental': return 'bg-purple-600 text-white border-purple-700';
            default: return 'bg-slate-500 text-white border-slate-600';
          }
        };

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase tracking-widest border ${getTagColor(selectedCompetency.category)}`}>
                    {selectedCompetency.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase tracking-widest border ${getMaturityColor(selectedCompetency.maturity)}`}>
                    {selectedCompetency.maturity}
                  </span>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">{selectedCompetency.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCompetency(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 no-scrollbar">
                <div className="space-y-2">
                  <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-200"></span>
                    Strategic Horizon: {selectedCompetency.maturity}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                    {selectedCompetency.maturity === 'Adopt' && "Standard industry practice. Low risk, high readiness. Recommended for all production systems."}
                    {selectedCompetency.maturity === 'Trial' && "Verified in specialized contexts. Good for focused pilots and innovation projects."}
                    {selectedCompetency.maturity === 'Assess' && "Emerging research. Showing strong potential but lacks widespread production hardening."}
                    {selectedCompetency.maturity === 'Experimental' && "Cutting-edge or research-only. High risk/reward ratio. Proceed with caution."}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Architectural Summary</h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {definition}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Implementation Context</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {techData.application || "Critical for scaling AI initiatives in high-performance production environments."}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                      Risk Profile
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                      {techData.risks || "Implementation requires specialized infrastructure and rigorous data safety testing."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Business Impact</span>
                   <span className="text-[10px] font-black text-indigo-600 uppercase">{selectedCompetency.impact}</span>
                 </div>
                 <button 
                  onClick={() => setSelectedCompetency(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-all shadow-lg"
                 >
                   Return to Radar
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