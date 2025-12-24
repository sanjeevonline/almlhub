import React, { useState, useMemo } from 'react';
import { Category, CompetencyTerm, MaturityLevel } from '../types';
import TechnicalRadar from './TechnicalRadar';

interface Props {
  allCompetencies: CompetencyTerm[];
}

const RADAR_COLORS: Record<Category, string> = {
  Techniques: '#3b82f6', // Bright Brand Blue
  Tools: '#06b6d4',      // Cyan-Teal
  Platforms: '#6366f1',  // Indigo
  Governance: '#94a3b8', // Cool Slate
};

const MATURITY_DESC: Record<MaturityLevel, string> = {
  Adopt: 'High confidence, clear value, ready for wide-scale production.',
  Trial: 'Successful in isolated cases, exploring enterprise integration.',
  Assess: 'Promising technology, testing for specific value and viability.',
  Experimental: 'Early stage research, high risk/reward potential.'
};

const RadarView: React.FC<Props> = ({ allCompetencies }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Category | null>(null);
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyTerm | null>(null);
  const [search, setSearch] = useState('');
  const [showLegend, setShowLegend] = useState(false);

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
      case 'Adopt': return 'text-blue-400';
      case 'Trial': return 'text-cyan-400';
      case 'Assess': return 'text-indigo-400';
      case 'Experimental': return 'text-slate-400';
    }
  };

  const getMaturityStyle = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
      case 'Trial': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';
      case 'Assess': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
      case 'Experimental': return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
    }
  };

  const getCategoryColor = (category: Category) => RADAR_COLORS[category] || '#94a3b8';

  const filteredItems = useMemo(() => {
    return allCompetencies.filter(item => {
      const matchesQuadrant = !selectedQuadrant || item.category === selectedQuadrant;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                           item.description.toLowerCase().includes(search.toLowerCase());
      return matchesQuadrant && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [allCompetencies, selectedQuadrant, search]);

  return (
    <div className="h-full flex flex-col overflow-y-auto no-scrollbar bg-[#030712] scroll-smooth">
      {/* Radar Section - Tightened spacing */}
      <div className={`flex-none w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center bg-blue-500/5 border-b border-white/5 relative ${
        selectedQuadrant 
          ? 'h-[40px] md:h-[60px] overflow-hidden' 
          : 'h-[320px] md:h-[70vh] py-4'
      }`}>
        {selectedQuadrant && (
          <>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white hover:bg-blue-600 transition-all active:scale-95 shadow-xl border border-white/10 group flex items-center justify-center"
                title="Back to Full Radar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="transition-transform group-hover:-translate-x-1"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
            </div>
            {/* Centered Title Overlay */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-10">
              <h2 className="text-[10px] md:text-sm font-black text-white/40 uppercase tracking-[0.6em] animate-in fade-in duration-700 whitespace-nowrap">
                {selectedQuadrant}
              </h2>
            </div>
          </>
        )}

        <div className={`w-full h-full max-w-6xl flex items-center justify-center ${selectedQuadrant ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
           <TechnicalRadar 
              onQuadrantClick={(q) => setSelectedQuadrant(q as Category)} 
              onPointClick={(item) => setSelectedCompetency(item)}
              activeQuadrant={selectedQuadrant}
              allCompetencies={allCompetencies}
            />
        </div>
      </div>

      {/* Filter & Action Bar */}
      <div className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search in ${selectedQuadrant ? selectedQuadrant : 'Radar'}...`}
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-[10px] font-medium focus:ring-1 focus:ring-blue-500/50 outline-none placeholder:text-slate-600 text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-2 group"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">
                Maturity Definitions
              </span>
              <div className={`transition-transform duration-300 ${showLegend ? 'rotate-180' : ''}`}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-slate-600"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </button>
            <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-2.5 py-1 rounded-lg border border-blue-600/20">
              {filteredItems.length} Concepts
            </div>
          </div>
        </div>
      </div>

      {/* Maturity Legend Dropdown */}
      <div className={`flex-none w-full bg-[#030712] border-b border-white/5 transition-all duration-300 overflow-hidden ${showLegend ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {MATURITIES.map(m => (
            <div key={m} className="space-y-1">
              <h5 className={`text-[9px] font-black uppercase tracking-widest ${getMaturityColor(m)}`}>
                {m}
              </h5>
              <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                {MATURITY_DESC[m]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrated Card Grid */}
      <div className="flex-1 w-full p-2 md:p-10 bg-[#030712] flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom duration-500">
              {filteredItems.map(item => {
                const catColor = getCategoryColor(item.category);
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedCompetency(item)}
                    className="group relative bg-[#0f172a]/40 p-3 md:p-5 rounded-xl md:rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-[#0f172a]/60 transition-all cursor-pointer flex flex-col h-full shadow-lg"
                    style={{ borderTop: `2px solid ${catColor}` }}
                  >
                    <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-4">
                      <span className={`text-[6px] md:text-[8px] font-bold uppercase tracking-widest px-1 md:px-2 py-0.5 rounded border ${getMaturityStyle(item.maturity)}`}>
                        {item.maturity}
                      </span>
                      <span 
                        className="text-[6px] md:text-[8px] font-bold uppercase tracking-widest px-1 md:px-2 py-0.5 rounded border"
                        style={{ borderColor: `${catColor}33`, color: catColor, backgroundColor: `${catColor}11` }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-[10px] md:text-[13px] font-bold text-white uppercase tracking-tight mb-1 md:mb-3 group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[9px] md:text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2 md:mb-4">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-2 md:pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[7px] md:text-[8px] text-slate-600 font-black uppercase tracking-wider truncate max-w-[80px] md:max-w-[140px]">
                        {item.keyTech || 'Foundation'}
                      </span>
                      <div className="text-blue-600 opacity-40 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="md:w-3 md:h-3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center text-slate-700 border border-white/5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">No Results Found</h4>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
              </div>
              <button 
                onClick={() => {setSearch(''); setSelectedQuadrant(null);}}
                className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer expanded space */}
        <div className="flex-grow flex flex-col justify-center py-24">
          <div className="max-w-3xl mx-auto w-full p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] text-center space-y-3 shadow-2xl">
            <p className="text-[11px] font-black text-white uppercase tracking-[0.4em]">
              AI & GENAI STRATEGY FRAMEWORK
            </p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed max-w-xl mx-auto">
              A comprehensive roadmap for enterprise intelligence, architectural excellence, and strategic implementation curated by <span className="text-blue-500">Sanjeev Kumar</span>.
            </p>
            <div className="pt-4 flex items-center justify-center gap-4 opacity-30 grayscale pointer-events-none">
               <div className="h-[1px] w-12 bg-slate-700"></div>
               <img src="https://www.sanjeevonline.com/favicon.ico" className="w-5 h-5" alt="" />
               <div className="h-[1px] w-12 bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Briefing Modal */}
      {selectedCompetency && (() => {
        const techData = parseTechnicalData(selectedCompetency.details);
        const definition = techData.definition || selectedCompetency.description;
        const catColor = getCategoryColor(selectedCompetency.category);
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#030712]/95 backdrop-blur-xl p-4 animate-in fade-in">
             <div className="flex-1 flex flex-col bg-[#0f172a] w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 rounded-[2.5rem] border border-white/10 relative">
                
                <div className="flex-none px-8 py-10 md:px-14 flex justify-between items-start border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getMaturityColor(selectedCompetency.maturity)} border-current bg-white/5`}>
                        {selectedCompetency.maturity}
                      </span>
                      <span 
                        className="px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest"
                        style={{ borderColor: `${catColor}44`, color: catColor, backgroundColor: `${catColor}11` }}
                      >
                        {selectedCompetency.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">{selectedCompetency.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedCompetency(null)} 
                    className="p-2.5 bg-slate-800 rounded-2xl text-slate-500 hover:text-white hover:bg-red-600 transition-all border border-white/10 shadow-lg"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 md:px-14 pb-14 space-y-12 no-scrollbar mt-10">
                  <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] border-l-2 border-blue-600 pl-4">Executive Brief</h4>
                    <p className="text-xl md:text-2xl font-medium text-slate-100 leading-[1.3] whitespace-pre-wrap">{definition}</p>
                  </section>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-600/10 space-y-3 shadow-inner">
                      <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        Architectural Context
                      </h4>
                      <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{techData.application || "Critical standard for modern enterprise-grade AI systems and production infrastructure."}</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-500/5 border border-slate-500/10 space-y-3 shadow-inner">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        Strategic Risks
                      </h4>
                      <p className="text-[13px] text-slate-400 font-medium leading-relaxed italic">{techData.risks || "Requires rigorous validation within specific security boundaries and operational domain constraints."}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Key Technology Stack</p>
                           <p className="text-sm font-bold text-white uppercase tracking-tight">{selectedCompetency.keyTech || 'Foundation Standard'}</p>
                        </div>
                        <div className="hidden md:block">
                           <img src="https://www.sanjeevonline.com/favicon.ico" className="w-6 h-6 grayscale opacity-20" alt="" />
                        </div>
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