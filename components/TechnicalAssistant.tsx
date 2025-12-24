
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const TechnicalAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ parts: [{ text: `${m.role}: ${m.content}` }] })), { parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: 'You are an AI/ML Architect Advisor. Answer questions about RAG, MLOps, LLMOps, and the provided competency matrix accurately and professionally. Use markdown for lists. CRITICAL: You must communicate strictly in English only. Do not use any other languages even if prompted.',
          temperature: 0.7,
        }
      });

      const assistantContent = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "There was an error connecting to the AI brain." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-rose-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-rose-600 transition-all active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[75vh] animate-in slide-in-from-bottom">
            <div className="p-5 bg-slate-900 dark:bg-black text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-sm">🤖</div>
                 <h3 className="font-bold text-sm uppercase tracking-tight">AI Advisor</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">✕</button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950 no-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-12">
                   <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-relaxed">System Ready.<br/>Ask about AI Architecture.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex gap-1 items-center">
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
               <div className="flex gap-2">
                 <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type message..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-xs dark:text-white outline-none"
                 />
                 <button 
                  onClick={handleSend}
                  className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20"
                 >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TechnicalAssistant;
