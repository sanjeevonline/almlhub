import React, { useState, useMemo } from 'react';
import { Category, CompetencyTerm, MaturityLevel } from '../types';
import { TECHNICAL_DETAILS } from '../detailed-knowledge';
import { COMPETENCY_DB } from '../data';

interface Props {
  items: CompetencyTerm[];
  search: string;
  setSearch: (s: string) => void;
  activeCategory: Category | 'All';
  setActiveCategory: (c: Category | 'All') => void;
  onViewChange?: (view: 'glossary' | 'radar') => void;
}

const GlossaryView: React.FC<Props> = ({ 
  items, search, setSearch, activeCategory, setActiveCategory, onViewChange
}) => {
  const [selectedItem, setSelectedItem] = useState<CompetencyTerm | null>(null);
  
  // Dynamic extraction of filter values
  const categories = useMemo(() => {
    const unique = Array.from(new Set(COMPETENCY_DB.glossary.map(i => i.category))).sort();
    return ['All', ...unique] as (Category | 'All')[];
  }, []);

  // Utility to clean markdown and extract sections
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
        .replace(/\*\*/g, '') // Remove bold
        .replace(/^\-\s/gm, '') // Remove list dashes
        .replace(/^\•\s/gm, '') // Remove bullets
        .replace(/^\d\.\s/gm, '') // Remove numbering
        .replace(/\s+/g, ' '); // Clean extra spaces

      if (title.includes('definition')) sections.definition = body;
      if (title.includes('application')) sections.application = body;
      if (title.includes('risks')) sections.risks = body;
    });

    return sections;
  };

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
    <div className="space-y-6 relative w-full overflow-x-hidden">
      {/* Search and Filters Hub */}
      <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-200 flex flex-col gap-4 md:gap-6">
        {/* Search Input */}
        <div className="relative w-full">
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AI capabilities (e.g. RAG, ROI, GPU)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 md:pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Compressed Category Filters */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] md:text-[9px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Nav to Radar */}
          <button 
            onClick={() => onViewChange?.('radar')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all self-start md:self-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path><path d="M12 16V8"></path></svg>
            Visualize on Radar
          </button>
        </div>
      </div>

      {/* Grid of Leaner Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map(item => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-[1rem] border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all p-4 cursor-pointer group flex flex-col justify-between min-h-[140px]"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest border whitespace-nowrap ${getTagColor(item.category)}`}>
                  {item.category}
                </span>
                <span className={`px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest border whitespace-nowrap ${getMaturityColor(item.maturity)}`}>
                  {item.maturity}
                </span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-[12px] font-black text-slate-800 tracking-tight uppercase leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {item.name}
                </h3>
                {item.keyTech && (
                  <p className="text-[9px] font-bold text-slate-400 truncate uppercase tracking-tight">
                    {item.keyTech}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-2">
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">{item.impact} Impact</span>
               <div className="flex items-center gap-1.5">
                  <span className="text-[7px] font-black text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Detail</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200 group-hover:text-indigo-400 transition-colors"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-slate-100 border-dashed">
             <div className="text-3xl mb-3">🔬</div>
             <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No results found</p>
             <button 
              onClick={() => {setSearch(''); setActiveCategory('All');}}
              className="mt-4 text-indigo-600 font-bold text-[10px] underline decoration-2 underline-offset-4"
             >
               Clear Filters
             </button>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedItem && (() => {
        const techData = parseTechnicalData(selectedItem.id);
        const definition = techData.definition || selectedItem.description;
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase tracking-widest border ${getTagColor(selectedItem.category)}`}>
                    {selectedItem.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[8px] font-black uppercase tracking-widest border ${getMaturityColor(selectedItem.maturity)}`}>
                    {selectedItem.maturity}
                  </span>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">{selectedItem.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 no-scrollbar">
                {selectedItem.keyTech && (
                  <div className="space-y-1">
                    <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Technologies</h4>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-tight">{selectedItem.keyTech}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-200"></span>
                    Maturity: {selectedItem.maturity}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                    {selectedItem.maturity === 'Adopt' && "Standard industry practice. Low risk, high readiness. Recommended for all production systems."}
                    {selectedItem.maturity === 'Trial' && "Verified in specialized contexts. Good for focused pilots and innovation projects."}
                    {selectedItem.maturity === 'Assess' && "Emerging research. Showing strong potential but lacks widespread production hardening."}
                    {selectedItem.maturity === 'Experimental' && "Cutting-edge or research-only. High risk/reward ratio. Proceed with caution."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Core Technical Concept</h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {definition}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Enterprise Application</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {techData.application || "Critical for scaling AI initiatives in high-performance production environments."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                      Operational Complexity
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                      {techData.risks || "Implementation requires specialized infrastructure and rigorous data safety testing."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Strategic Impact</span>
                   <span className="text-[10px] font-black text-indigo-600 uppercase">{selectedItem.impact}</span>
                 </div>
                 <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
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