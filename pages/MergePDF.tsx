
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const MergePDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const mergeFiles = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    
    try {
      const { PDFDocument } = (window as any).PDFLib;
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page: any) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      link.click();
    } catch (err) {
      alert('Error merging PDFs. Please ensure they are not corrupted or encrypted.');
    } finally {
      setIsMerging(false);
    }
  };

  const seoContent: SEOContent = {
    title: 'Merge PDF Online - Combine PDF Files for Free',
    h1: 'Merge PDF Documents',
    description: 'Combine multiple PDF files into one easily. Fast, free, and secure online PDF merger with no file limits or registration.',
    mainContent: `
      <p>Managing multiple PDF documents can be tedious. Our <strong>online PDF merger</strong> allows you to combine two or more files into a single, organized document in seconds. Whether it is combining reports, certificates, or study materials, EuroTools makes it effortless.</p>
      <p>Security is our priority. We process all merging locally in your browser. Your sensitive documents are never uploaded to our cloud, ensuring 100% privacy and GDPR compliance.</p>
    `,
    howTo: [
      'Select the PDF files you want to combine.',
      'Verify the list of files to ensure correct order.',
      'Click "Merge PDFs" to start the process.',
      'Download your combined PDF instantly.'
    ],
    faqs: [
      {
        question: 'Is there a limit to how many files I can merge?',
        answer: 'There is no hard limit on our end, although your browser memory may be the limiting factor for very large batches (e.g., 50+ files).'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-8">
        <div className="border-3 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-slate-50">
          <label className="cursor-pointer block">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <span className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg inline-block">
              Add PDF Files
            </span>
            <input type="file" className="hidden" accept="application/pdf" multiple onChange={handleFileChange} />
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-black text-gray-900">{files.length} Files Selected</h3>
               <button onClick={() => setFiles([])} className="text-xs font-bold text-red-500 hover:underline">Clear All</button>
             </div>
             <div className="space-y-2">
               {files.map((f, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                   <span className="text-sm font-bold text-gray-700 truncate max-w-xs">{f.name}</span>
                   <span className="text-[10px] font-bold text-gray-400">{(f.size/1024).toFixed(0)} KB</span>
                 </div>
               ))}
             </div>
             <button 
                onClick={mergeFiles}
                disabled={files.length < 2 || isMerging}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-xl"
              >
                {isMerging ? 'Merging Documents...' : 'Merge PDFs Now'}
              </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default MergePDF;
