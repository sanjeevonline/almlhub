import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Category, CompetencyTerm, CompetencyData } from './types';
import RadarView from './components/RadarView';
import { COMPETENCY_DB } from './data';

const GOOGLE_SHEET_CSV_URL: string = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQycD-CBf7SjPxqWhKVLkatw_DLur70i1yIbV4RYcUM228KDqpbH6cfojvqNAn67YgczLN5TXS2tPhU/pub?gid=1349546253&single=true&output=csv`;

const BrandIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#030712"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
    <path d="M50 50 L20 50 A30 30 0 0 1 50 20 Z" fill="#4ba2ac"/>
    <path d="M50 50 L50 20 A30 30 0 0 1 80 50 Z" fill="#71a07d"/>
    <path d="M50 50 L50 80 A30 30 0 0 1 20 50 Z" fill="#d68f12"/>
    <path d="M50 50 L80 50 A30 30 0 0 1 50 80 Z" fill="#f2627a"/>
    <circle cx="50" cy="50" r="6" fill="white"/>
    <path d="M50 50 L78 38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const App: React.FC = () => {
  const [competencyData, setCompetencyData] = useState<CompetencyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

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

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] p-6 text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#0f172a] p-8 rounded-[2rem] shadow-xl text-center space-y-6 border border-slate-200 dark:border-white/5">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto">⚠️</div>
          <h2 className="text-xl font-black uppercase tracking-tight">System Error</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs uppercase transition-colors hover:bg-blue-700">Restart</button>
        </div>
      </div>
    );
  }

  if (!competencyData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 animate-pulse">Initializing HUB</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      <header className="flex-none bg-white dark:bg-[#030712] border-b border-slate-200 dark:border-white/5 px-6 py-5 flex items-center justify-between shadow-xl z-50 relative">
        <div className="flex items-center gap-3">
          <a 
            href="https://www.sanjeevonline.com" 
            className="flex items-center gap-2 group transition-opacity hover:opacity-80"
            title="Back to sanjeevonline.com"
          >
            <BrandIcon className="w-5 h-5 md:w-6 md:h-6 rounded-md shadow-sm" />
            <div className="flex items-center text-xl md:text-2xl font-black tracking-tighter select-none">
              <span className="text-cyan-600 dark:text-cyan-400">.</span>
              <span className="text-cyan-600 dark:text-cyan-400">/</span>
              <span className="text-slate-900 dark:text-white ml-0.5">SK_PROFILE</span>
            </div>
          </a>
        </div>

        {/* Right-aligned Title, Metadata and Theme Toggle */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <div className="flex flex-col items-end text-right">
            <h1 className="text-sm md:text-lg font-black text-slate-900 dark:text-white uppercase tracking-[0.5em] leading-none mb-1">
              Tech Radar
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <RadarView allCompetencies={competencyData.glossary} />
      </main>
    </div>
  );
};

export default App;