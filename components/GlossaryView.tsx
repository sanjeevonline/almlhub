
import React, { useState, useMemo } from 'react';
import { Category, CompetencyTerm, MaturityLevel } from '../types';

interface Props {
  items: CompetencyTerm[];
  search: string;
  setSearch: (s: string) => void;
  activeCategory: Category | 'All';
  setActiveCategory: (c: Category | 'All') => void;
  onViewChange?: (view: 'glossary' | 'radar') => void;
  allCompetencies: CompetencyTerm[];
}

const GlossaryView: React.FC<Props> = ({ 
  items, search, setSearch, activeCategory, setActiveCategory, onViewChange, allCompetencies
}) => {
  const [selectedItem, setSelectedItem] = useState<CompetencyTerm | null>(null);
  
  const categories = useMemo(() => {
    const unique = Array.from(new Set(allCompetencies.map(i => i.category))).sort();
    return ['All', ...unique] as (Category | 'All')[];
  }, [allCompetencies]);

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

  const getThemeColors = (category: Category) => {
    switch (category) {
      case 'Platforms': return { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500', border: 'border-rose-200 dark:border-rose-900/50' };
      case 'Governance': return { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-200 dark:border-emerald-900/50' };
      case 'Techniques': return { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500', border: 'border-indigo-200 dark:border-indigo-900/50' };
      case 'Tools': return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500', border: 'border-amber-200 dark:border-amber-900/50' };
      default: return { text: 'text-slate-500', bg: 'bg-slate-400', border: 'border-slate-200' };
    }
  };

  const getMaturityStyle = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
      case 'Trial': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20';
      case 'Assess': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      case 'Experimental': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Search & Filter - Compact Controls */}
      <div className="flex-none p-4 md:p-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 space-y-4 shadow-sm z-10">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competencies..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-slate-400 dark:text-white"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
          <button 
            onClick={() => onViewChange?.('radar')}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
          >
            Radar
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex-shrink-0 transition-all ${
                activeCategory === cat 
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900' 
                  : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Area - Two-Column Layout for Mobile */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4">
          {items.map(item => {
            const theme = getThemeColors(item.category);
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="relative bg-white dark:bg-slate-800 pl-3 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col overflow-hidden"
              >
                {/* Categorical Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bg}`}></div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${getMaturityStyle(item.maturity)}`}>
                    {item.maturity}
                  </span>
                </div>
                
                <h3 className="text-[10px] md:text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1 min-h-[1.25rem]">
                  {item.name}
                </h3>
                <p className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase truncate mt-auto">
                  {item.keyTech || item.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Briefing Modal */}
      {selectedItem && (() => {
        const techData = parseTechnicalData(selectedItem.details);
        const definition = techData.definition || selectedItem.description;
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/90 backdrop-blur-md animate-in fade-in">
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 md:rounded-[3rem] border border-white/10">
              
              <div className="flex-none px-6 py-6 md:px-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getMaturityStyle(selectedItem.maturity)} border-current`}>
                      {selectedItem.maturity} Level
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedItem.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                    {selectedItem.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 no-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Strategic Impact</span>
                    <span className="text-[12px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{selectedItem.impact}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Architecture</span>
                    <span className="text-[12px] font-black text-slate-800 dark:text-slate-200 uppercase truncate tracking-wide">{selectedItem.keyTech || 'General Core'}</span>
                  </div>
                  <div className="hidden md:block p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Concept UID</span>
                    <span className="text-[12px] font-black text-slate-400 dark:text-slate-600 uppercase font-mono">{selectedItem.id.substring(0,8)}</span>
                  </div>
                </div>

                <section className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Architectural Summary</h4>
                  </div>
                  <p className="text-sm md:text-xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-wrap">
                    {definition}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-50 dark:border-emerald-900/20 pb-1.5">Business Integration</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {techData.application || "Key strategic requirement for implementing secure, high-performance reasoning engines within existing enterprise infrastructure."}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest border-b border-rose-50 dark:border-rose-900/20 pb-1.5">Technical Constraints</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {techData.risks || "Demands continuous monitoring and policy alignment to prevent non-deterministic failures in automated deployment pipelines."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-none p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white text-[12px] font-black uppercase tracking-widest rounded-3xl shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default GlossaryView;
