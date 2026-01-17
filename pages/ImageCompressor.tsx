
import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';
import { Tooltip } from '../components/Tooltip';

type Preset = 'web' | 'hd' | 'tiny';
type Format = 'image/jpeg' | 'image/png' | 'image/webp';
type ResizePreset = { name: string, w: number, h: number };

const RESIZE_PRESETS: ResizePreset[] = [
  { name: 'Instagram', w: 1080, h: 1080 },
  { name: 'YouTube', w: 1280, h: 720 },
  { name: 'Full HD', w: 1920, h: 1080 },
  { name: 'Facebook', w: 1200, h: 630 }
];

const ImagePro: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [quality, setQuality] = useState(0.6);
  const [format, setFormat] = useState<Format>('image/jpeg');
  const [resizeWidth, setResizeWidth] = useState<number>(0);
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [isCropping, setIsCropping] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setOriginalSize(selected.size);
      const url = URL.createObjectURL(selected);
      setOriginalUrl(url);
      setProcessedUrl('');
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setResizeWidth(img.width);
        setResizeHeight(img.height);
      };
    }
  };

  useEffect(() => {
    if (file) processImage();
  }, [quality, format, resizeWidth, resizeHeight, crop, isCropping]);

  const processImage = async () => {
    if (!file || !originalUrl || !canvasRef.current) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      const sx = (crop.x / 100) * img.width;
      const sy = (crop.y / 100) * img.height;
      const sw = (crop.w / 100) * img.width;
      const sh = (crop.h / 100) * img.height;

      canvas.width = resizeWidth || sw;
      canvas.height = resizeHeight || sh;
      
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setProcessedSize(blob.size);
            if (processedUrl) URL.revokeObjectURL(processedUrl);
            setProcessedUrl(URL.createObjectURL(blob));
          }
          setIsProcessing(false);
        },
        format,
        quality
      );
    };
  };

  const seoContent: SEOContent = {
    title: 'Free Image Pro - Crop, Resize & Optimize Online',
    h1: 'Image Pro Workspace',
    description: 'The definitive free image tool for professional creators. Visual cropping and deep compression engine.',
    mainContent: `
      <p>Transform your visual content instantly. Our <strong>Image Pro</strong> tool goes beyond simple compression, offering pro-grade tools for web optimization.</p>
    `,
    howTo: [
      'Upload your high-res image.',
      'Select a preset or manual dimensions.',
      'Refine framing with the crop tool.',
      'Download your optimized file.'
    ],
    faqs: [
      { question: 'Is my image data private?', answer: 'Yes. All processing happens strictly inside your browser.' }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-6">
        {!file ? (
          <div className="border-3 border-dashed border-slate-200 rounded-[2rem] p-10 sm:p-20 text-center bg-slate-50 hover:bg-white transition-all cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 text-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">📸</div>
            <label className="cursor-pointer block">
              <span className="bg-indigo-600 text-white px-8 sm:px-10 py-4 rounded-xl sm:rounded-2xl font-black hover:bg-indigo-700 shadow-xl transition-all inline-block">
                Select Image
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            <p className="mt-4 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Processing • No Uploads</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Control Panel */}
            <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 text-white shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold outline-none">
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest">Resize Preset</label>
                  <select 
                    onChange={(e) => {
                      const p = RESIZE_PRESETS[parseInt(e.target.value)];
                      if (p) { setResizeWidth(p.w); setResizeHeight(p.h); }
                    }} 
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold outline-none"
                  >
                    <option value="">Custom</option>
                    {RESIZE_PRESETS.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest">Width</label>
                  <input type="number" value={resizeWidth} onChange={(e) => setResizeWidth(parseInt(e.target.value) || 0)} className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest">Height</label>
                  <input type="number" value={resizeHeight} onChange={(e) => setResizeHeight(parseInt(e.target.value) || 0)} className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold outline-none" />
                </div>
              </div>

              <div className="mb-6 sm:mb-8 p-4 bg-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                 <button 
                  onClick={() => setIsCropping(!isCropping)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-[10px] font-black transition-all ${isCropping ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                 >
                   {isCropping ? 'Finish Crop' : 'Visual Crop Tool'}
                 </button>
                 {isCropping && (
                   <div className="flex gap-4 items-center w-full sm:w-auto">
                     <span className="text-[9px] font-black text-slate-500 uppercase">Size:</span>
                     <input type="range" min="10" max="100" value={crop.w} onChange={(e) => setCrop({...crop, w: parseInt(e.target.value), h: parseInt(e.target.value)})} className="flex-grow accent-indigo-500" />
                   </div>
                 )}
              </div>

              <div className="flex flex-col gap-6 pt-6 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                   <div className="w-full sm:flex-1">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">Quality</label>
                     <input type="range" min="0.05" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-full appearance-none" />
                   </div>
                   <span className="text-xs font-black text-indigo-400">{Math.round(quality*100)}%</span>
                </div>
                <button onClick={() => setFile(null)} className="text-[10px] font-black text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest text-center">Discard & Restart</button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 tracking-widest">Original ({(originalSize / 1024).toFixed(1)} KB)</div>
                 <div className="relative aspect-square bg-slate-100 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-slate-200">
                    <img src={originalUrl} className="w-full h-full object-contain" alt="Source" />
                    {isCropping && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded-lg" style={{ width: `${crop.w}%`, height: `${crop.h}%` }}></div>
                      </div>
                    )}
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[9px] font-black uppercase text-indigo-500 tracking-widest">Preview ({(processedSize / 1024).toFixed(1)} KB)</div>
                 <div className="aspect-square bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-slate-800 flex items-center justify-center">
                    {processedUrl ? (
                      <img src={processedUrl} className="w-full h-full object-contain animate-fade-in" alt="Preview" />
                    ) : (
                      <div className="text-slate-700 text-[10px] font-black uppercase tracking-widest animate-pulse">Processing...</div>
                    )}
                 </div>
              </div>
            </div>

            {processedUrl && (
              <a 
                href={processedUrl} 
                download={`optimized-${file.name}`} 
                className="block w-full py-5 bg-indigo-600 text-white text-center rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 shadow-xl transition-all active:scale-95"
              >
                Download Optimized Image
              </a>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
};

export default ImagePro;
