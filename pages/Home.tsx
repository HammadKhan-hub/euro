import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Text' | 'Image' | 'PDF' | 'Generator'>('All');

  const categories = ['All', 'Text', 'Image', 'PDF', 'Generator'] as const;
  
  const trendingToolIds = ['image-pro', 'resume-builder', 'pdf-compressor'];
  const trendingTools = TOOLS.filter(t => trendingToolIds.includes(t.id));

  const filteredTools = activeFilter === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeFilter);

  const groupedTools = TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof TOOLS>);

  return (
    <div className="animate-fade-in overflow-x-hidden">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[9px] sm:text-[10px] font-black bg-indigo-50 text-indigo-700 rounded-full uppercase tracking-[0.2em] border border-indigo-100">
            Professional Online Suite
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8 leading-[1.2] sm:leading-[1.1]">
            Fast Utilities. <br className="sm:hidden" /><span className="text-indigo-600">Total Privacy.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-12 px-2">
            No accounts required. Your files never leave your browser. Experience high-performance tools designed for the modern web.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 px-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black transition-all border uppercase tracking-widest ${
                  activeFilter === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-105' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 lg:px-8">
        
        {activeFilter === 'All' && (
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center mb-8 sm:mb-10">
              <span className="flex-shrink-0 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest mr-3 sm:mr-4">🔥 Trending</span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Most Used Tools</h2>
              <div className="ml-4 sm:ml-6 flex-grow h-px bg-gray-100 hidden xs:block"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {trendingTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} featured={true} />
              ))}
            </div>
          </div>
        )}

        <AdPlaceholder className="mb-12 sm:mb-16 h-24 sm:h-28" />

        {activeFilter === 'All' ? (
          Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category} className="mb-16 sm:mb-20 last:mb-0">
              <div className="flex items-center mb-6 sm:mb-8">
                <h2 className="text-sm sm:text-xl font-black text-slate-400 uppercase tracking-widest">{category} Suite</h2>
                <div className="ml-4 sm:ml-6 flex-grow h-px bg-gray-100"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 sm:mt-32 relative overflow-hidden bg-slate-900 rounded-[2rem] sm:rounded-[4rem] p-6 sm:p-20 text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-5xl font-black mb-6 sm:mb-8 leading-tight text-center lg:text-left">Privacy First.<br />Performance Always.</h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 text-center lg:text-left leading-relaxed">
                EuroTools uses advanced WebAssembly and modern Browser APIs to ensure your files stay 100% private. Faster than cloud converters, safer than anyone else.
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-4 gap-x-4">
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-indigo-400 font-black text-lg sm:text-xl">01</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Global Standards</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-indigo-400 font-black text-lg sm:text-xl">02</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Local Engine</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-indigo-400 font-black text-lg sm:text-xl">03</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">No Watermarks</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-indigo-400 font-black text-lg sm:text-xl">04</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Unlimited Free</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
               <div className="bg-slate-800 p-10 rounded-[3rem] border border-slate-700 shadow-2xl scale-110">
                 <div className="flex items-center space-x-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="h-4 w-1/3 bg-indigo-500/20 rounded mb-6"></div>
                 <div className="h-4 w-full bg-slate-700 rounded mb-3"></div>
                 <div className="h-4 w-5/6 bg-slate-700 rounded mb-3"></div>
                 <div className="h-4 w-4/6 bg-slate-700 rounded mb-10"></div>
                 <div className="flex space-x-4">
                   <div className="h-12 w-32 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20"></div>
                   <div className="h-12 w-32 bg-slate-700 rounded-xl"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolCard: React.FC<{ tool: typeof TOOLS[0], featured?: boolean }> = ({ tool, featured }) => (
  <Link 
    to={tool.path}
    className={`group relative bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 border transition-all duration-500 flex flex-col h-full ${
      featured 
      ? 'border-indigo-100 ring-4 ring-indigo-50 shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-[1.02]' 
      : 'border-gray-50 hover:border-indigo-200 hover:shadow-2xl shadow-sm'
    }`}
  >
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 ${
      featured 
      ? 'bg-indigo-600 text-white rotate-3 group-hover:rotate-12' 
      : 'bg-slate-50 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6'
    }`}>
      {tool.icon}
    </div>
    <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2 leading-tight">{tool.name}</h3>
    <p className="text-gray-500 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm flex-grow">{tool.description}</p>
    <div className="flex items-center text-indigo-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
      Launch Tool
      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
    <span className="absolute top-4 sm:top-6 right-6 sm:right-8 text-[8px] sm:text-[10px] font-black text-slate-200 uppercase tracking-[0.3em] pointer-events-none group-hover:text-indigo-100 transition-colors">
      {tool.category}
    </span>
  </Link>
);

export default Home;