
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const WordToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.name.endsWith('.docx') || f.name.endsWith('.doc'))) {
      setFile(f);
    } else {
      alert('Please select a valid .docx or .doc file');
    }
  };

  const convertToPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await (window as any).mammoth.convertToHtml({ arrayBuffer });
        const html = result.value;

        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF();
        
        doc.html(html, {
          callback: function (doc: any) {
            doc.save(file.name.replace(/\.[^/.]+$/, "") + ".pdf");
            setIsProcessing(false);
          },
          x: 15,
          y: 15,
          width: 170,
          windowWidth: 650
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      alert('Conversion failed. For complex layouts, we recommend using a native Word application.');
      setIsProcessing(false);
    }
  };

  const seoContent: SEOContent = {
    title: 'Free Word to PDF Converter - DOCX to PDF Online',
    h1: 'Word to PDF Converter',
    description: 'Transform your Word documents into professional PDF files instantly. Supports DOC and DOCX formats with high accuracy and 100% privacy.',
    mainContent: `
      <p>Converting your Word documents into PDF format is the best way to ensure your document looks the same on every device. Our <strong>online Word to PDF converter</strong> handles .doc and .docx files with ease.</p>
      <p>Unlike other converters that store your files, EuroTools processes the conversion directly in your browser. This means your private reports and resumes stay safe and confidential.</p>
    `,
    howTo: [
      'Choose a .doc or .docx file from your device.',
      'Click the "Convert to PDF" button.',
      'Our system will render the document layers into a standard PDF.',
      'Save the new PDF to your computer.'
    ],
    faqs: [
      {
        question: 'Will my formatting be preserved?',
        answer: 'We use the Mammoth rendering engine which is excellent at preserving basic styling, tables, and lists. Extremely complex layouts may vary slightly.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-8">
        {!file ? (
          <div className="border-3 border-dashed border-slate-200 rounded-3xl p-16 text-center bg-slate-50">
             <div className="text-5xl mb-4">📘</div>
             <label className="cursor-pointer block">
               <span className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 inline-block">
                 Select Word File
               </span>
               <input type="file" className="hidden" accept=".doc,.docx" onChange={handleFileChange} />
             </label>
             <p className="mt-4 text-xs font-bold text-slate-400">Supports .doc and .docx formats</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black">W</div>
                 <div className="font-bold text-gray-900 truncate max-w-xs">{file.name}</div>
              </div>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <button 
              onClick={convertToPdf}
              disabled={isProcessing}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-xl"
            >
              {isProcessing ? 'Converting to PDF...' : 'Convert to PDF Now'}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordToPDF;
