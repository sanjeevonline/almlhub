
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

const RADAR_COLORS: Record<Category, string> = {
  Techniques: '#3b82f6',
  Tools: '#06b6d4',
  Platforms: '#6366f1',
  Governance: '#94a3b8',
};

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

  const getCategoryColor = (category: Category) => RADAR_COLORS[category] || '#94a3b8';

  const getMaturityStyle = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
      case 'Trial': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';
      case 'Assess': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
      case 'Experimental': return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#030712]">
      {/* Search & Filter */}
      <div className="flex-none p-4 md:p-6 bg-[#0f172a]/50 border-b border-white/5 space-y-4 shadow-sm z-10 backdrop-blur-sm">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-1 focus:ring-blue-500/50 outline-none placeholder:text-slate-600 text-white"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
          <button 
            onClick={() => onViewChange?.('radar')}
            className="px-5 py-2.5 bg-white/5 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
          >
            Radar View
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const color = cat !== 'All' ? getCategoryColor(cat) : '#2563eb';
            return (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  backgroundColor: isActive ? color : 'transparent',
                  borderColor: isActive ? color : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? 'white' : 'rgba(148, 163, 184, 1)'
                }}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border flex-shrink-0 transition-all hover:border-white/20`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {items.map(item => {
            const catColor = getCategoryColor(item.category);
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="relative bg-[#0f172a]/40 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/5 transition-all cursor-pointer group flex flex-col h-full"
                style={{ borderTop: `2px solid ${catColor}` }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getMaturityStyle(item.maturity)}`}>
                    {item.maturity}
                  </span>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
                    style={{ borderColor: `${catColor}33`, color: catColor, backgroundColor: `${catColor}11` }}
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-tight group-hover:text-white transition-colors line-clamp-2 mb-4">
                  {item.name}
                </h3>
                <div className="mt-auto pt-3 border-t border-white/5">
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider truncate">
                    {item.keyTech || 'Foundation Level'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (() => {
        const techData = parseTechnicalData(selectedItem.details);
        const definition = techData.definition || selectedItem.description;
        const catColor = getCategoryColor(selectedItem.category);
        return (
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#030712]/95 backdrop-blur-md animate-in fade-in">
            <div className="flex-1 flex flex-col bg-[#0f172a] w-full max-w-2xl mx-auto shadow-2xl overflow-hidden md:my-12 md:rounded-[2rem] border border-white/10 relative">
              
              <div className="flex-none px-8 py-8 md:px-12 flex justify-between items-start border-b border-white/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${getMaturityStyle(selectedItem.maturity)}`}>
                      {selectedItem.maturity}
                    </span>
                    <span 
                      className="px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-widest"
                      style={{ borderColor: `${catColor}44`, color: catColor, backgroundColor: `${catColor}11` }}
                    >
                      {selectedItem.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                    {selectedItem.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="p-3 bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors border border-white/5"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12 space-y-10 no-scrollbar mt-10">
                <section className="space-y-4">
                   <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Executive Brief</h4>
                   <p className="text-xl font-medium text-slate-200 leading-snug whitespace-pre-wrap">
                    {definition}
                   </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-8 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-[11px] font-bold text-blue-400/80 uppercase tracking-widest border-b border-white/5 pb-2">Architecture</h4>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed">
                      {techData.application || "Strategic capability for production-grade AI infrastructure."}
                    </p>
                  </div>
                  <div className="space-y-3 p-8 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">Assessment</h4>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                      {techData.risks || "Demands rigorous validation within specific security boundaries."}
                    </p>
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

export default GlossaryView;
