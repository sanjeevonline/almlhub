
import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import { Category, CompetencyTerm, CompetencyData } from './types';
import GlossaryView from './components/GlossaryView';
import RadarView from './components/RadarView';
import TechnicalAssistant from './components/TechnicalAssistant';
import { COMPETENCY_DB } from './data';

type ViewState = 'glossary' | 'radar';

const GOOGLE_SHEET_CSV_URL: string = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQycD-CBf7SjPxqWhKVLkatw_DLur70i1yIbV4RYcUM228KDqpbH6cfojvqNAn67YgczLN5TXS2tPhU/pub?gid=1349546253&single=true&output=csv`;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('glossary');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [competencyData, setCompetencyData] = useState<CompetencyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadCompetencies = async () => {
      const isSheetConfigured = GOOGLE_SHEET_CSV_URL && !GOOGLE_SHEET_CSV_URL.startsWith('PASTE_');

      if (!isSheetConfigured) {
        // Use the merged data from COMPETENCY_DB directly
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
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">⚠️</div>
          <h2 className="text-xl font-black uppercase tracking-tight dark:text-white">System Error</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs uppercase">Restart</button>
        </div>
      </div>
    );
  }

  if (!competencyData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 animate-pulse">Initializing HUB</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      <header className="flex-none bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2.5 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/20">AI</div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-tight leading-none">AI/ML HUB</h1>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Matrix v4.2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-xl flex items-center gap-1">
            <button onClick={() => setCurrentView('glossary')} className={`p-1.5 rounded-lg ${currentView === 'glossary' ? 'bg-white dark:bg-slate-600 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line></svg>
            </button>
            <button onClick={() => setCurrentView('radar')} className={`p-1.5 rounded-lg ${currentView === 'radar' ? 'bg-white dark:bg-slate-600 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path></svg>
            </button>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-500">
            {isDarkMode ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>}
          </button>
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

      <TechnicalAssistant />
    </div>
  );
};

export default App;
