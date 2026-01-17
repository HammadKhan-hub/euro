
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const PDFToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item: any) => item.str);
        fullText += textItems.join(" ") + "\n\n";
      }

      const blob = new Blob([fullText], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.[^/.]+$/, "") + ".doc";
      link.click();
    } catch (err) {
      alert('Failed to extract text from PDF. Ensure the file is not scanned or protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const seoContent: SEOContent = {
    title: 'Free PDF to Word Converter - Edit PDF in Word Online',
    h1: 'PDF to Word Converter',
    description: 'Convert PDF files into editable Microsoft Word documents. Extract text and layouts from PDFs for free with no installation needed.',
    mainContent: `
      <p>Converting a PDF to an editable format is essential for updating documents without the original source files. Our <strong>online PDF to Word converter</strong> extracts text layers and basic structure from your PDF and converts them into a downloadable Word file.</p>
      <p>We believe in document security. Your files are processed entirely within your browser environment. No uploads mean zero risk of data exposure.</p>
    `,
    howTo: [
      'Select the PDF document you wish to convert.',
      'Click the "Convert to Word" button.',
      'Wait as we analyze the PDF structure and extract text.',
      'Download your new Word document.'
    ],
    faqs: [
      {
        question: 'Does this work with scanned PDFs?',
        answer: 'This version extracts selectable text. For scanned images of text, you would need an OCR-specialized tool. We recommend ensuring your PDF has selectable text for best results.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-8">
        {!file ? (
          <div className="border-3 border-dashed border-slate-200 rounded-3xl p-16 text-center bg-slate-50">
             <div className="text-5xl mb-4">📕</div>
             <label className="cursor-pointer block">
               <span className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 inline-block">
                 Select PDF File
               </span>
               <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
             </label>
             <p className="mt-4 text-xs font-bold text-slate-400">Instant extraction to .doc format</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-black">PDF</div>
                 <div className="font-bold text-gray-900 truncate max-w-xs">{file.name}</div>
              </div>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <button 
              onClick={convertToWord}
              disabled={isProcessing}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-xl"
            >
              {isProcessing ? 'Extracting Text...' : 'Convert to Word Now'}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToWord;
