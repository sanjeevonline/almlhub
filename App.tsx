
import React, { useState, useMemo } from 'react';
import { COMPETENCY_DB } from './data';
import { Category, CompetencyTerm, MaturityLevel } from './types';
import GlossaryView from './components/GlossaryView';
import RadarView from './components/RadarView';
import TechnicalAssistant from './components/TechnicalAssistant';

type ViewState = 'glossary' | 'radar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('glossary');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredGlossary = useMemo(() => {
    return COMPETENCY_DB.glossary.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-6 py-4 flex items-center shadow-sm gap-4 overflow-hidden">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">AI</div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-lg font-black tracking-tight text-slate-900 leading-none cursor-pointer whitespace-nowrap" onClick={() => {setCurrentView('glossary');}}>AI/ML HUB</h1>
            <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Excellence</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-4 md:gap-8 flex-1 justify-center md:justify-start overflow-x-auto no-scrollbar py-1 px-2">
          <button 
            onClick={() => setCurrentView('glossary')}
            className={`text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${currentView === 'glossary' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Glossary
          </button>
          <button 
            onClick={() => setCurrentView('radar')}
            className={`text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${currentView === 'radar' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Radar
          </button>
        </nav>

        <div className="flex gap-3 flex-shrink-0">
           <button className="p-2 bg-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-all hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {currentView === 'radar' ? (
          <div className="animate-in fade-in duration-700">
            <RadarView />
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <GlossaryView 
              items={filteredGlossary} 
              search={search} 
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onViewChange={setCurrentView}
            />
          </div>
        )}
      </main>

      <TechnicalAssistant />
    </div>
  );
};

export default App;
