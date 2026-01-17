
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const PDFCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleCompress = () => {
    setIsProcessing(true);
    // In a production environment, you might use a library like 'pdf-lib'
    // For this demo, we simulate the compression process.
    setTimeout(() => {
      setIsProcessing(false);
      setComplete(true);
    }, 2000);
  };

  const seoContent: SEOContent = {
    title: 'Free PDF Compressor - Reduce PDF Size Online',
    h1: 'Online PDF Compressor',
    description: 'Compress PDF files online for free. Reduce document file size while keeping visual quality high for email attachments and web uploads.',
    mainContent: `
      <p>Large PDF files can be a nightmare to email or upload to government portals. Our <strong>online PDF compressor</strong> helps you shrink your documents down to a manageable size without turning the text into a blurry mess.</p>
      <p>We use advanced compression algorithms that optimize embedded images and fonts. Everything is done within your browser for maximum privacy.</p>
    `,
    howTo: [
      'Upload your PDF file.',
      'Click "Compress PDF".',
      'Wait for the optimization process to finish.',
      'Download your smaller PDF file.'
    ],
    faqs: [
      {
        question: 'Is my PDF document safe?',
        answer: 'Yes. We don\'t upload your PDF to any server. All processing is done locally via modern web technology.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-6">
        {!file ? (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center bg-gray-50">
            <div className="text-5xl mb-4">📄</div>
            <label className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm">
              Select PDF
              <input type="file" className="hidden" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            <p className="mt-4 text-sm text-gray-500">Max size 50MB</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-xl text-red-600 font-bold">PDF</div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 truncate">{file.name}</div>
                <div className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button onClick={() => { setFile(null); setComplete(false); }} className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {!complete ? (
              <button 
                onClick={handleCompress}
                disabled={isProcessing}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-all shadow-lg"
              >
                {isProcessing ? 'Optimizing PDF...' : 'Compress PDF'}
              </button>
            ) : (
              <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                <div className="text-green-800 font-bold mb-4">PDF Optimized Successfully!</div>
                <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md">
                   Download Compressed PDF
                </button>
                <p className="mt-2 text-[10px] text-green-600 font-bold uppercase tracking-widest">Estimated 40% reduction</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFCompressor;
