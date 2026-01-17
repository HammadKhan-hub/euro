
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Tooltip } from '../components/Tooltip';

type ResumeTemplate = 'modern-corporate' | 'sidebar-left' | 'sidebar-right' | 'executive-suite' | 'minimalist-pro' | 'bold-accent';
type SectionKey = 'summary' | 'experience' | 'education' | 'skills';
type AiTone = 'Professional' | 'Creative' | 'Executive' | 'Minimalist';

interface TemplateConfig {
  id: ResumeTemplate;
  name: string;
  tag: string;
  accentClass: string;
  secondaryClass: string;
}

const TEMPLATES: TemplateConfig[] = [
  { id: 'modern-corporate', name: 'The Modernist', tag: 'Most Popular', accentClass: 'bg-indigo-600', secondaryClass: 'bg-indigo-50' },
  { id: 'sidebar-left', name: 'The Specialist', tag: 'Best for Tech', accentClass: 'bg-slate-900', secondaryClass: 'bg-slate-100' },
  { id: 'executive-suite', name: 'The Executive', tag: 'High Level', accentClass: 'bg-indigo-950', secondaryClass: 'bg-indigo-100' },
  { id: 'minimalist-pro', name: 'Pure Minimal', tag: 'ATS Safe', accentClass: 'bg-slate-400', secondaryClass: 'bg-slate-50' },
  { id: 'sidebar-right', name: 'The Creative', tag: 'Design Centric', accentClass: 'bg-indigo-400', secondaryClass: 'bg-indigo-50' },
  { id: 'bold-accent', name: 'Impact Bold', tag: 'Stand Out', accentClass: 'bg-rose-600', secondaryClass: 'bg-rose-50' }
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  education: '',
  experience: '',
  skills: '',
  summary: ''
};

const ResumeBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState<ResumeTemplate>('modern-corporate');
  const [sections, setSections] = useState<SectionKey[]>(['summary', 'experience', 'education', 'skills']);
  const [formData, setFormData] = useState(initialFormData);
  const [aiConfig, setAiConfig] = useState({ tone: 'Professional' as AiTone, keywords: '' });
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const moveSection = (index: number, direction: number) => {
    const newOrder = [...sections];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setSections(newOrder);
    }
  };

  const enhanceWithAi = async (field: 'summary' | 'experience') => {
    if (!formData[field]) {
      alert("Please enter some text first for the AI to analyze.");
      return;
    }
    
    if (!process.env.API_KEY) {
      alert("API Key is missing. Please configure it in your deployment environment.");
      return;
    }

    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a world-class executive resume writer. 
        Rewrite the following resume ${field} section to be more ${aiConfig.tone.toLowerCase()}, punchy, and achievement-oriented. 
        Focus on measurable impact and professional clarity. Use strong action verbs and remove any fluff.
        Original text: "${formData[field]}"`,
        config: {
          systemInstruction: "You are a world-class resume consultant. Your output must be concise, professional, and ready for a high-level job application. Do not include introductory text, just the rewritten content."
        }
      });

      const refinedText = response.text;
      if (refinedText) {
        setFormData(prev => ({ ...prev, [field]: refinedText.trim() }));
      }
    } catch (err) {
      console.error("AI Error:", err);
      alert("The AI service is currently busy or unavailable. Please try again in a few moments.");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const generatePDF = () => {
    try {
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF();
      const margin = 20;
      let cursorY = 25;

      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(formData.name.toUpperCase() || 'YOUR NAME', margin, cursorY);
      cursorY += 10;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139); // slate-400
      doc.text(`${formData.email} | ${formData.phone} | ${formData.location}`, margin, cursorY);
      cursorY += 8;
      
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.5);
      doc.line(margin, cursorY, 190, cursorY);
      cursorY += 15;

      // Sections
      sections.forEach(key => {
        const content = formData[key];
        if (!content) return;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(79, 70, 229); // indigo-600
        doc.text(key.toUpperCase(), margin, cursorY);
        cursorY += 8;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85); // slate-700
        const lines = doc.splitTextToSize(content, 170);
        
        // Check for page overflow
        if (cursorY + (lines.length * 6) > 280) {
          doc.addPage();
          cursorY = 20;
        }

        doc.text(lines, margin, cursorY);
        cursorY += (lines.length * 6) + 12;
      });

      doc.save(`${formData.name.replace(/\s+/g, '_') || 'My_Resume'}.pdf`);
    } catch (error) {
      console.error("PDF Export failed", error);
      alert("There was an error generating your PDF. Please ensure all fields are filled correctly.");
    }
  };

  const renderMiniature = (t: TemplateConfig) => {
    const isSidebarLeft = t.id === 'sidebar-left';
    const isSidebarRight = t.id === 'sidebar-right';
    const isExecutive = t.id === 'executive-suite';
    const isBold = t.id === 'bold-accent';
    const isMinimal = t.id === 'minimalist-pro';

    return (
      <div className={`aspect-[3/4] bg-white rounded-xl mb-3 shadow-md overflow-hidden flex relative border-2 transition-all group-hover:shadow-lg ${template === t.id ? 'border-indigo-600 scale-105' : 'border-slate-100'}`}>
        {isSidebarLeft && <div className={`w-[30%] h-full ${t.accentClass}`}></div>}
        
        <div className={`flex-1 flex flex-col p-2 space-y-2 ${isMinimal ? 'items-center text-center' : ''}`}>
          <div className={`
            ${isExecutive ? `${t.accentClass} -mx-2 -mt-2 p-2 mb-2` : 'mb-1'} 
            ${isBold ? 'border-l-4 border-rose-600 pl-2' : ''}
            w-full
          `}>
             <div className={`h-[5px] w-3/4 rounded-full ${isExecutive ? 'bg-white' : 'bg-slate-800'}`}></div>
             <div className={`h-[2px] w-1/2 rounded-full mt-2 ${isExecutive ? 'bg-indigo-300' : 'bg-slate-300'}`}></div>
          </div>

          <div className="space-y-1.5 w-full pt-1">
             <div className={`h-[3px] w-1/4 rounded-full bg-indigo-500 mb-1.5`}></div>
             {[1,2,3].map(i => (
               <div key={i} className={`h-[2px] rounded-full bg-slate-200 ${i === 2 ? 'w-5/6' : 'w-full'}`}></div>
             ))}
          </div>

          <div className="space-y-1.5 w-full pt-2">
             <div className={`h-[3px] w-1/4 rounded-full bg-indigo-500 mb-1.5`}></div>
             {[1,2].map(i => (
               <div key={i} className={`h-[2px] rounded-full bg-slate-200 ${i === 2 ? 'w-2/3' : 'w-full'}`}></div>
             ))}
          </div>
        </div>

        {isSidebarRight && <div className={`w-[30%] h-full ${t.accentClass}`}></div>}
      </div>
    );
  };

  const seoContent: SEOContent = {
    title: 'Professional AI Resume Builder - 100% Free Export',
    h1: 'The Career Workspace',
    description: 'Transform your job applications with EuroTools. Select pro-grade templates, enhance with AI, and download watermark-free PDFs.',
    mainContent: `<p>A secure, browser-side resume editor. No data ever leaves your device unless you choose to use our optional AI optimization features.</p>`,
    howTo: ['Select a designer layout.', 'Fill in your professional identity.', 'Use AI for summary and work history.', 'Finalize layout.', 'Download high-quality PDF.'],
    faqs: [{ question: 'Is it free?', answer: 'Completely free. No registration or credit cards required.' }]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="flex flex-col xl:flex-row gap-12 items-start">
        {/* Workspace: Control Column */}
        <div className="flex-1 w-full bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-100/40">
          
          {/* High-End Stepper */}
          <div className="flex justify-between items-center mb-12 px-2 overflow-x-auto pb-4 scrollbar-hide">
             {[1, 2, 3, 4, 5, 6].map(s => (
               <button 
                key={s}
                onClick={() => setStep(s)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all mx-2 group ${
                  step === s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-110 font-black' : 
                  step > s ? 'bg-indigo-50 text-indigo-600 font-bold' : 'bg-slate-50 text-slate-300 font-bold'
                }`}
               >
                 <span className="text-[12px]">{s}</span>
               </button>
             ))}
          </div>

          <div className="animate-fade-in min-h-[450px]">
            {step === 1 && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Layout</h3>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-indigo-100">Industry Standard</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {TEMPLATES.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className="group flex flex-col transition-all text-left"
                    >
                      {renderMiniature(t)}
                      <div className="px-1">
                        <div className={`text-[12px] font-black uppercase transition-colors ${template === t.id ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-400'}`}>{t.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t.tag}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Personal Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Legal Name</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} className="resume-input" placeholder="e.g. Marcus Aurelius" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email Address</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} className="resume-input" placeholder="marcus@history.com" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} className="resume-input" placeholder="+1 555 0102" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Location</label>
                      <input name="location" value={formData.location} onChange={handleInputChange} className="resume-input" placeholder="Rome, Italy" />
                   </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Summary Polish</h3>
                    <p className="text-slate-500 text-sm mt-1">Hook recruiters in 3-4 powerful sentences.</p>
                  </div>
                  <button 
                    onClick={() => enhanceWithAi('summary')} 
                    disabled={isAiProcessing || !formData.summary} 
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isAiProcessing ? (
                      <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Thinking...</span>
                    ) : '✨ AI Polish'}
                  </button>
                </div>
                <textarea 
                  name="summary" 
                  value={formData.summary} 
                  onChange={handleInputChange} 
                  className="resume-input h-64 leading-relaxed text-base" 
                  placeholder="Summarize your professional value. Mention your years of experience and core strengths..." 
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Work Rewriter</h3>
                   <button 
                    onClick={() => enhanceWithAi('experience')} 
                    disabled={isAiProcessing || !formData.experience} 
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-black transition-all disabled:opacity-50"
                  >
                     {isAiProcessing ? (
                       <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Rewriting...</span>
                     ) : '✨ AI Rewrite'}
                   </button>
                </div>
                <textarea 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleInputChange} 
                  className="resume-input h-80 leading-relaxed font-mono text-sm" 
                  placeholder="Role | Company | Date Range&#10;- Achievement with metrics&#10;- Action-oriented bullet point..." 
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Foundations</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Education Background</label>
                      <textarea name="education" value={formData.education} onChange={handleInputChange} className="resume-input h-40 text-sm" placeholder="Degree, Institution, Graduation Dates..." />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Core Skills</label>
                      <input name="skills" value={formData.skills} onChange={handleInputChange} className="resume-input text-sm" placeholder="e.g. Strategic Planning, Team Leadership, Python, SQL..." />
                   </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-10">
                <div className="bg-slate-50 p-8 sm:p-12 rounded-[3rem] border border-slate-100 text-center">
                   <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-2xl shadow-indigo-100">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2">Build Finalized</h3>
                   <p className="text-slate-500 mb-8">Your professional resume is ready. Download it in high-fidelity PDF format below.</p>
                   
                   <div className="space-y-3 max-w-sm mx-auto">
                     {sections.map((key, i) => (
                       <div key={key} className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{key}</span>
                          <div className="flex gap-2">
                            <button onClick={() => moveSection(i, -1)} className="p-1.5 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-lg transition-all">↑</button>
                            <button onClick={() => moveSection(i, 1)} className="p-1.5 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-lg transition-all">↓</button>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
                <button onClick={generatePDF} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-[0_20px_50px_rgba(79,70,229,0.2)] active:scale-[0.98] transition-all">
                   Download Resume PDF
                </button>
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-between items-center pt-8 border-t border-slate-50">
             {step > 1 ? (
               <button onClick={() => setStep(step - 1)} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">&larr; Back</button>
             ) : <div />}
             {step < 6 && (
               <button onClick={() => setStep(step + 1)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-100">
                 Continue &rarr;
               </button>
             )}
          </div>
        </div>

        {/* Studio Preview Column */}
        <div className="w-full xl:w-[500px] xl:sticky xl:top-24">
           <div className="mb-6 flex items-center justify-between px-6">
              <span className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                Studio Preview
              </span>
              <div className="flex gap-1.5">
                 {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>)}
              </div>
           </div>

           {/* Live Paper Canvas */}
           <div className={`bg-white border border-slate-200 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.12)] rounded-[0.5rem] sm:rounded-[1rem] aspect-[1/1.41] text-[10px] sm:text-[13px] overflow-hidden flex relative ${template === 'minimalist-pro' ? 'font-serif' : 'font-sans'}`}>
              
              {template === 'sidebar-left' && (
                <div className="h-full w-[35%] bg-slate-900 p-8 sm:p-12 space-y-12 flex-shrink-0 text-white">
                   <div className="animate-fade-in">
                     <h4 className="text-[12px] font-black uppercase border-b border-white/20 pb-2 mb-6 tracking-widest text-indigo-400">Identity</h4>
                     <div className="space-y-4 opacity-90 break-words leading-relaxed text-white/70">
                       <p className="font-bold text-white truncate">{formData.email || 'email@domain.com'}</p>
                       <p className="truncate">{formData.phone || '+0 000 000'}</p>
                       <p>{formData.location || 'Location'}</p>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-[12px] font-black uppercase border-b border-white/20 pb-2 mb-6 tracking-widest text-indigo-400">Competencies</h4>
                     <p className="opacity-90 leading-loose whitespace-pre-wrap text-white/70">{formData.skills || 'Your Skills...'}</p>
                   </div>
                </div>
              )}

              <div className={`flex-1 flex flex-col ${template === 'sidebar-left' ? 'p-10 sm:p-14' : 'p-0'}`}>
                <div className={`
                  ${template === 'executive-suite' ? 'bg-indigo-950 text-white p-14 sm:p-20 mb-10' : 
                    template === 'bold-accent' ? 'p-14 sm:p-20 border-l-[16px] border-rose-600 mb-10 bg-slate-50' :
                    template === 'sidebar-left' ? 'mb-10' :
                    template === 'modern-corporate' ? 'p-14 sm:p-20 text-indigo-600 border-b-2 border-indigo-50 mb-10 bg-slate-50/50' :
                    'p-14 sm:p-20 text-slate-900 border-b border-slate-100 mb-10'}
                  ${template === 'minimalist-pro' ? 'text-center' : ''}
                `}>
                  <h1 className={`font-black uppercase tracking-tight mb-4 ${template === 'bold-accent' ? 'text-4xl sm:text-5xl text-rose-600 leading-[0.9]' : 'text-3xl sm:text-4xl'}`}>
                    {formData.name || 'FULL NAME'}
                  </h1>
                  <p className={`opacity-80 font-bold tracking-[0.2em] text-[8px] sm:text-[11px] uppercase ${template === 'executive-suite' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {template !== 'sidebar-left' && `${formData.email || 'EMAIL'} • ${formData.phone || 'PHONE'} • ${formData.location || 'LOCATION'}`}
                  </p>
                </div>

                <div className={`flex-1 space-y-12 ${template !== 'sidebar-left' && template !== 'executive-suite' && template !== 'bold-accent' ? 'px-14 sm:px-20 pb-20' : 'px-10 sm:px-14 pb-14'}`}>
                   {sections.map(key => {
                     if (template === 'sidebar-left' && key === 'skills') return null;
                     const content = formData[key];
                     if (!content) return null;
                     return (
                       <div key={key} className="animate-fade-in">
                         <h4 className={`font-black mb-5 uppercase tracking-[0.25em] ${
                           template === 'minimalist-pro' ? 'text-center text-slate-900 border-b-2 border-slate-900 pb-2' :
                           template === 'bold-accent' ? 'text-rose-600 border-l-4 border-rose-600 pl-5' :
                           template === 'modern-corporate' ? 'text-indigo-600 text-[12px] border-b border-indigo-100 pb-2' :
                           'text-slate-900 border-b border-slate-200 pb-2 text-[12px]'
                         }`}>
                           {key}
                         </h4>
                         <p className={`whitespace-pre-wrap leading-relaxed font-medium ${template === 'minimalist-pro' ? 'text-center' : ''} text-slate-700`}>
                           {content}
                         </p>
                       </div>
                     );
                   })}
                </div>
              </div>

              {template === 'sidebar-right' && (
                <div className="h-full w-[35%] bg-slate-50 border-l border-slate-100 p-8 sm:p-12 space-y-12 flex-shrink-0">
                   <div>
                     <h4 className="text-[12px] font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-2 mb-6 tracking-widest text-right">Expertise</h4>
                     <p className="opacity-80 leading-loose whitespace-pre-wrap text-slate-600 text-right">{formData.skills || 'Your Skills...'}</p>
                   </div>
                </div>
              )}
           </div>

           <div className="mt-8 flex items-center justify-between bg-white p-5 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-100/50">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => <div key={i} className="w-9 h-9 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-indigo-100"></div>
                 </div>)}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">A4 Architecture</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Format</span>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ResumeBuilder;
