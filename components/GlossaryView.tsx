
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
      {/* Search & Filter - Ultra Compact */}
      <div className="flex-none p-3 md:p-5 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search matrix..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-slate-400 dark:text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
          <button 
            onClick={() => onViewChange?.('radar')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            Radar
          </button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex-shrink-0 transition-all ${
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

      {/* Grid Area - Viewport Locked */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 md:p-5 bg-slate-50 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3">
          {items.map(item => {
            const theme = getThemeColors(item.category);
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="relative bg-white dark:bg-slate-800 pl-3 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col overflow-hidden"
              >
                {/* Categorical Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bg}`}></div>
                
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${getMaturityStyle(item.maturity)}`}>
                    {item.maturity}
                  </span>
                  <span className="text-[7px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                    {item.impact}
                  </span>
                </div>
                
                <h3 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1 mb-0.5">
                  {item.name}
                </h3>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase truncate">
                  {item.keyTech || item.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimized Detail Modal */}
      {selectedItem && (() => {
        const techData = parseTechnicalData(selectedItem.details);
        const definition = techData.definition || selectedItem.description;
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-md animate-in fade-in">
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 w-full max-w-3xl mx-auto shadow-2xl overflow-hidden md:my-10 md:rounded-[2.5rem] border border-white/10">
              
              {/* Simplified Modal Header */}
              <div className="flex-none px-6 py-5 md:px-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getMaturityStyle(selectedItem.maturity)} border-current`}>
                      {selectedItem.maturity}
                    </span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{selectedItem.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                    {selectedItem.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* High-Density Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Impact</span>
                    <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase">{selectedItem.impact}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Architecture</span>
                    <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase truncate">{selectedItem.keyTech || 'Standard'}</span>
                  </div>
                  <div className="hidden md:block p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Registry ID</span>
                    <span className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase font-mono">{selectedItem.id.substring(0,8)}</span>
                  </div>
                </div>

                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Summary</h4>
                  </div>
                  <p className="text-sm md:text-lg font-semibold text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {definition}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Strategic Implementation</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {techData.application || "Critical path requirement for enterprise-grade autonomous swarms and domain-specific logic."}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Architectural Constraints</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {techData.risks || "Requires rigorous testing and policy monitoring to ensure deterministic behavior in production environments."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimalist Footer - Just a close button for mobile convenience */}
              <div className="flex-none p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-indigo-700 transition-all"
                >
                  Back to Hub
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
