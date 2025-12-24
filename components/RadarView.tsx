import React, { useState } from 'react';
import { Category, CompetencyTerm, MaturityLevel } from '../types';
import TechnicalRadar from './TechnicalRadar';

interface Props {
  onViewChange?: (view: 'glossary' | 'radar') => void;
  allCompetencies: CompetencyTerm[];
}

const RADAR_COLORS: Record<Category, string> = {
  Techniques: '#4da1a9',
  Tools: '#71a078',
  Platforms: '#d68f0c',
  Governance: '#f1647e',
};

const MATURITY_DESC: Record<MaturityLevel, string> = {
  Adopt: 'High confidence, clear value, ready for wide-scale production.',
  Trial: 'Successful in isolated cases, exploring enterprise integration.',
  Assess: 'Promising technology, testing for specific value and viability.',
  Experimental: 'Early stage research, high risk/reward potential.'
};

const RadarView: React.FC<Props> = ({ onViewChange, allCompetencies }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Category | null>(null);
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyTerm | null>(null);
  const [showLegend, setShowLegend] = useState(false);

  const QUADRANTS: Category[] = ['Techniques', 'Tools', 'Platforms', 'Governance'];
  const MATURITIES: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];

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

  const getMaturityColor = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-400';
      case 'Trial': return 'text-indigo-400';
      case 'Assess': return 'text-amber-400';
      case 'Experimental': return 'text-purple-400';
    }
  };

  const getCategoryStyle = (category: Category) => {
    const color = RADAR_COLORS[category];
    return {
      borderColor: `${color}33`,
      color: color,
      backgroundColor: `${color}11`
    };
  };

  const getCategoryColor = (category: Category) => RADAR_COLORS[category] || '#94a3b8';

  return (
    <div className="h-full flex flex-col overflow-y-auto no-scrollbar bg-slate-950">
      {/* Radar Section - Morphs into a heading when a quadrant is selected */}
      <div className={`flex-none w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center bg-black/20 border-b border-slate-900 relative overflow-hidden ${
        selectedQuadrant ? 'h-[80px] md:h-[120px]' : 'h-[360px] md:h-[80vh] py-8'
      }`}>
        {selectedQuadrant && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
            <button 
              onClick={() => setSelectedQuadrant(null)}
              className="p-2 rounded-full bg-slate-800 text-white hover:bg-rose-600 transition-all active:scale-90 shadow-xl border border-white/5"
              title="Return to Full Radar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          </div>
        )}

        <div className="w-full h-full max-w-5xl flex items-center justify-center pointer-events-auto">
           <TechnicalRadar 
              onQuadrantClick={(q) => setSelectedQuadrant(q as Category)} 
              onPointClick={(item) => setSelectedCompetency(item)}
              activeQuadrant={selectedQuadrant}
              allCompetencies={allCompetencies}
            />
        </div>
      </div>

      {/* Collapsible Maturity Legend - Hidden when quadrant is selected to focus on content */}
      <div className={`flex-none w-full bg-slate-950 border-b border-slate-900/50 transition-all duration-500 overflow-hidden ${selectedQuadrant ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
        <div className="max-w-[1400px] mx-auto">
          <button 
            onClick={() => setShowLegend(!showLegend)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-900/40 transition-colors group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">
              Maturity Level Definitions
            </span>
            <div className={`transition-transform duration-300 ${showLegend ? 'rotate-180' : ''}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-600"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showLegend ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {MATURITIES.map(m => (
                <div key={m} className="space-y-1">
                  <h5 className={`text-[10px] font-black uppercase tracking-widest ${getMaturityColor(m)}`}>
                    {m}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    {MATURITY_DESC[m]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid List Section */}
      <div className="flex-none w-full p-6 md:p-16 bg-slate-950 pb-20">
        <div className={`max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-16`}>
          {QUADRANTS
            .filter(q => !selectedQuadrant || selectedQuadrant === q)
            .map(quad => {
              const quadItems = allCompetencies.filter(i => i.category === quad);
              if (quadItems.length === 0) return null;
              const catColor = getCategoryColor(quad);
              
              return (
                <div key={quad} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                  {/* Category Header (Hidden on mobile if radar acts as header) */}
                  <div className={`flex items-center gap-4 ${selectedQuadrant ? 'hidden md:flex' : 'flex'}`}>
                    <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight" style={{ color: catColor }}>
                      {quad}
                    </h3>
                    <div className="h-px flex-1 bg-slate-900"></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {MATURITIES.map(maturity => {
                      const maturityItems = quadItems.filter(i => i.maturity === maturity);
                      if (maturityItems.length === 0) return null;

                      return (
                        <div key={maturity} className="space-y-3">
                          <h4 className={`text-[9px] font-bold uppercase tracking-widest pb-1 border-b border-slate-900/50 ${getMaturityColor(maturity)}`}>
                            {maturity}
                          </h4>
                          <ul className="space-y-1.5">
                            {maturityItems.sort((a,b) => a.name.localeCompare(b.name)).map(item => (
                              <li key={item.id}>
                                <button 
                                  onClick={() => setSelectedCompetency(item)}
                                  className="text-[10px] md:text-[11px] font-medium text-slate-500 hover:text-white uppercase tracking-tight text-left transition-all hover:translate-x-1 block w-full leading-tight"
                                >
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
          })}
        </div>

        <div className="max-w-2xl mx-auto mt-16 md:mt-24 p-5 md:p-6 rounded-2xl border border-slate-900 bg-slate-900/20 text-center">
          <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            Personal Perspective &bull; This radar reflects a point-in-time synthesis of the AI/ML landscape based on professional exposure and field experience.
          </p>
        </div>
      </div>

      {/* Briefing Modal */}
      {selectedCompetency && (() => {
        const techData = parseTechnicalData(selectedCompetency.details);
        const definition = techData.definition || selectedCompetency.description;
        const catColor = getCategoryColor(selectedCompetency.category);
        const catStyles = getCategoryStyle(selectedCompetency.category);
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in">
             <div className="flex-1 flex flex-col bg-slate-900 w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 rounded-[2rem] border border-white/5 relative">
                
                <div className="flex-none px-8 py-8 md:px-12 flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-widest ${getMaturityColor(selectedCompetency.maturity)} border-current bg-slate-950/20`}>
                        {selectedCompetency.maturity}
                      </span>
                      <span 
                        className="px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-widest"
                        style={catStyles}
                      >
                        {selectedCompetency.category}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">{selectedCompetency.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="p-2 bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12 space-y-10 no-scrollbar">
                  <section className="space-y-3">
                    <h4 className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Executive Brief</h4>
                    <p className="text-xl font-bold text-slate-200 leading-snug whitespace-pre-wrap">{definition}</p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                      <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Architecture</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{techData.application || "Critical standard for enterprise AI integration."}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-2">
                      <h4 className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Risk Profile</h4>
                      <p className="text-xs text-slate-400 leading-relaxed italic">{techData.risks || "Requires continuous monitoring and policy enforcement."}</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      })()}
    </div>
  );
};

export default RadarView;