import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import { Category, CompetencyTerm, CompetencyData } from './types';
import GlossaryView from './components/GlossaryView';
import RadarView from './components/RadarView';
import { COMPETENCY_DB } from './data';

type ViewState = 'glossary' | 'radar';

const GOOGLE_SHEET_CSV_URL: string = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQycD-CBf7SjPxqWhKVLkatw_DLur70i1yIbV4RYcUM228KDqpbH6cfojvqNAn67YgczLN5TXS2tPhU/pub?gid=1349546253&single=true&output=csv`;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('radar');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [competencyData, setCompetencyData] = useState<CompetencyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const loadCompetencies = async () => {
      const isSheetConfigured = GOOGLE_SHEET_CSV_URL && !GOOGLE_SHEET_CSV_URL.startsWith('PASTE_');

      if (!isSheetConfigured) {
        setCompetencyData(COMPETENCY_DB);
        return;
      }

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Remote Sheet unreachable.');
        const csvString = await response.text();
        Papa.parse(csvString, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const transformedData: CompetencyTerm[] = results.data.map((row: any) => ({
              id: row.id || Math.random().toString(36).substr(2, 9),
              name: row.name || 'Unnamed Concept',
              category: (row.category as Category) || 'Techniques',
              description: row.description || '',
              impact: row.impact || 'Medium',
              maturity: (row.maturity as any) || 'Assess',
              keyTech: row.keyTech || '',
              details: row.details || '',
            }));
            setCompetencyData({ glossary: transformedData });
          },
          error: (err: Error) => setError(`Data Stream Error: ${err.message}`)
        });
      } catch (err) {
        setCompetencyData(COMPETENCY_DB);
      }
    };
    loadCompetencies();
  }, []);

  const filteredGlossary = useMemo(() => {
    if (!competencyData) return [];
    return competencyData.glossary.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase()) || 
                            item.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, competencyData]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-[2rem] shadow-xl text-center space-y-6 border border-slate-800">
          <div className="w-16 h-16 bg-rose-900/30 text-rose-500 rounded-2xl flex items-center justify-center text-3xl mx-auto">⚠️</div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white">System Error</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs uppercase">Restart</button>
        </div>
      </div>
    );
  }

  if (!competencyData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 animate-pulse">Initializing HUB</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <header className="flex-none bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">AI</span>
            <h1 className="text-sm font-black tracking-tight text-white uppercase whitespace-nowrap">Radar</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
            <button 
              onClick={() => setCurrentView('radar')} 
              className={`p-2 rounded-lg transition-all ${currentView === 'radar' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              title="Radar View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </button>
            <button 
              onClick={() => setCurrentView('glossary')} 
              className={`p-2 rounded-lg transition-all ${currentView === 'glossary' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              title="List View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <path d="M3 6h.01M3 12h.01M3 18h.01"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <div className="h-full w-full overflow-hidden flex flex-col">
          {currentView === 'radar' ? (
            <RadarView onViewChange={setCurrentView} allCompetencies={competencyData.glossary} />
          ) : (
            <GlossaryView 
              items={filteredGlossary} 
              search={search} 
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onViewChange={setCurrentView}
              allCompetencies={competencyData.glossary}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;