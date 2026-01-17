
import React, { useState, useRef } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setImages([]);
      setError('');
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const convertPdfToImages = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');

    try {
      // Loading PDF.js via CDN for zero-dependency browser-side processing
      const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const newImages: string[] = [];

      for (let i = 1; i <= Math.min(numPages, 10); i++) { // Limit to 10 pages for stability
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        newImages.push(canvas.toDataURL('image/png'));
      }

      setImages(newImages);
      if (numPages > 10) setError('Note: Only the first 10 pages were processed for performance.');
    } catch (err) {
      console.error(err);
      setError('Failed to process PDF. Ensure it is not password protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const seoContent: SEOContent = {
    title: 'Free PDF to Image Converter - High Quality PNG Export',
    h1: 'PDF to Image Converter',
    description: 'Convert PDF documents into high-resolution PNG images. Extract pages from PDFs instantly in your browser without uploading files.',
    mainContent: `
      <p>Need to extract a specific page from a PDF as an image? Our <strong>PDF to Image converter</strong> is the professional solution. We render each page of your PDF at a high scale, ensuring that text and graphics remain crisp and clear.</p>
      <p>This tool is 100% private. Unlike cloud converters, we handle the rendering locally. Your sensitive documents never leave your device.</p>
    `,
    howTo: [
      'Choose a PDF file from your computer.',
      'Click "Convert PDF to Images".',
      'Preview the rendered pages in the gallery.',
      'Right-click to save individual images or use the download buttons.'
    ],
    faqs: [
      {
        question: 'Is there a page limit?',
        answer: 'For browser stability, we currently process the first 10 pages. We are working on supporting larger documents soon.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-8">
        {!file ? (
          <div className="border-3 border-dashed border-slate-200 rounded-[2rem] p-16 text-center bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">📄</div>
            <label className="cursor-pointer block">
              <span className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 inline-block">
                Choose PDF File
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>
            <p className="mt-4 text-sm font-bold text-slate-400">Works in your browser. Files never uploaded.</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black">PDF</div>
                 <div>
                   <div className="font-black text-slate-900 truncate max-w-md">{file.name}</div>
                   <div className="text-xs font-bold text-slate-400 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                 </div>
              </div>
              <button onClick={() => setFile(null)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {images.length === 0 && (
               <button 
                onClick={convertPdfToImages}
                disabled={isProcessing}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-xl shadow-indigo-100"
              >
                {isProcessing ? 'Processing PDF...' : 'Convert to Images'}
              </button>
            )}

            {error && <div className="p-4 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold border border-amber-100">{error}</div>}

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fade-in">
                {images.map((img, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                    <img src={img} alt={`Page ${idx + 1}`} className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                       <a 
                        href={img} 
                        download={`page-${idx+1}.png`} 
                        className="bg-white p-2 rounded-lg text-slate-900 hover:scale-110 transition-transform"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M7 10l5 5 5-5M12 15V3" strokeWidth="2"/></svg>
                       </a>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-black text-slate-700">PAGE {idx+1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    </ToolLayout>
  );
};

export default PDFToImage;
