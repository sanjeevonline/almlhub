import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Category, CompetencyTerm, CompetencyData } from './types';
import RadarView from './components/RadarView';
import { COMPETENCY_DB } from './data';

const GOOGLE_SHEET_CSV_URL: string = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQycD-CBf7SjPxqWhKVLkatw_DLur70i1yIbV4RYcUM228KDqpbH6cfojvqNAn67YgczLN5TXS2tPhU/pub?gid=1349546253&single=true&output=csv`;

const App: React.FC = () => {
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

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#030712] p-6 text-white font-sans">
        <div className="max-w-md w-full bg-[#0f172a] p-8 rounded-[2rem] shadow-xl text-center space-y-6 border border-white/5">
          <div className="w-16 h-16 bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto">⚠️</div>
          <h2 className="text-xl font-black uppercase tracking-tight">System Error</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs uppercase transition-colors hover:bg-blue-700">Restart</button>
        </div>
      </div>
    );
  }

  if (!competencyData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#030712]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 animate-pulse">Initializing HUB</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#030712] text-slate-100 font-sans overflow-hidden">
      <header className="flex-none bg-[#030712] border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-xl z-50 relative">
        <div className="flex items-center">
          <a 
            href="https://www.sanjeevonline.com" 
            className="flex items-center gap-3 group transition-opacity hover:opacity-80"
            title="Back to sanjeevonline.com"
          >
            <div className="w-9 h-9 bg-white/95 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/10 flex-none ring-1 ring-blue-600/20 group-hover:ring-blue-600/40 transition-all">
              <span className="text-blue-600 font-black text-xs tracking-tight">./</span>
            </div>
          </a>
        </div>

        {/* Center-aligned Page Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <h1 className="text-sm md:text-lg font-black text-white uppercase tracking-[0.5em] text-center">AI RADAR</h1>
        </div>

        <div className="hidden md:block">
           <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Strategy & Intelligence</span>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <RadarView allCompetencies={competencyData.glossary} />
      </main>
    </div>
  );
};

export default App;