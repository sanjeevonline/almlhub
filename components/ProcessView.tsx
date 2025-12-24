
import React from 'react';
import { ProcessStep } from '../types';

interface Props {
  steps: ProcessStep[];
  onBack: () => void;
}

const ProcessView: React.FC<Props> = ({ steps, onBack }) => {
  return (
    <div className="pb-24 animate-in fade-in duration-700">
      {/* Condensed Header Section */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none select-none text-9xl">⚙️</div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-slate-900/20">⚙️</div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">MLOps Lifecycle</h2>
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Enterprise-grade orchestration for production AI systems.
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <button 
            onClick={onBack}
            className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
          >
            Back to Hub
          </button>
          <button 
            className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            Deploy Pipeline
          </button>
        </div>
      </div>

      {/* Pipeline Visualization - Desktop: Horizontal Grid, Mobile: List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 relative">
        {/* Decorative connecting lines for desktop */}
        <div className="hidden xl:block absolute top-[40px] left-0 right-0 h-0.5 bg-slate-100 -z-10"></div>
        
        {steps.map((step, idx) => (
          <div key={step.id} className="relative group">
            {/* Stage Indicator (Desktop only connector dots) */}
            <div className="hidden xl:flex absolute top-[36px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full z-10 group-hover:border-indigo-500 group-hover:scale-125 transition-all"></div>
            
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-500/30 hover:-translate-y-1 transition-all flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {step.icon}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">S{idx + 1}</span>
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                {step.label}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                {step.description}
              </p>
              
              <div className="pt-4 border-t border-slate-50 space-y-3">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Key Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.tools.slice(0, 3).map(tool => (
                    <span key={tool} className="px-2 py-1 bg-slate-50 text-[8px] font-bold text-slate-500 rounded-lg border border-slate-100 uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Arrow Connector */}
            {idx < steps.length - 1 && (
              <div className="flex lg:hidden justify-center py-2 text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Operational Summary Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20 flex items-center gap-6">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-md">🚀</div>
          <div>
            <h4 className="text-lg font-black leading-tight">Fast Deployment</h4>
            <p className="text-xs opacity-70 font-medium">Reduce time-to-production by 60% through automation.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-slate-100">🛡️</div>
          <div>
            <h4 className="text-lg font-black text-slate-800 leading-tight">Risk Mitigation</h4>
            <p className="text-xs text-slate-400 font-medium">Built-in evaluation gates ensure model safety.</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center gap-6">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">📊</div>
          <div>
            <h4 className="text-lg font-black leading-tight">Full Visibility</h4>
            <p className="text-xs opacity-60 font-medium">Real-time monitoring across all pipeline stages.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
