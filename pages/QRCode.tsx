
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://eurotools.com');
  const [size, setSize] = useState(250);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const seoContent: SEOContent = {
    title: 'Free QR Code Generator - Create QR Codes Online',
    h1: 'Online QR Code Generator',
    description: 'Generate high-quality QR codes for free. Support for URLs, plain text, and contact information. Instant download without watermarks.',
    mainContent: `
      <p>QR codes are an essential bridge between the physical and digital worlds. Whether you need to share a website link, a menu, or Wi-Fi credentials, our <strong>online QR code generator</strong> makes it effortless.</p>
      <p>Unlike other services, we don't put watermarks on your codes or charge for "premium" features. Every code generated is 100% yours to use commercially or personally.</p>
    `,
    howTo: [
      'Enter the URL or text you want to encode.',
      'The QR code will update automatically in the preview window.',
      'Adjust the size if necessary.',
      'Right-click the image and select "Save Image As" to download it.'
    ],
    faqs: [
      {
        question: 'Do the QR codes expire?',
        answer: 'No. The QR codes generated are "static", meaning the information is encoded directly into the pattern. They will work as long as the content (like your website URL) remains active.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">QR Code Content (URL or Text)</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. https://google.com"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border border-gray-100 min-h-[300px]">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <img 
              src={qrUrl} 
              alt="Generated QR Code" 
              className="max-w-full h-auto"
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          </div>
          <p className="mt-4 text-xs text-gray-400 font-medium">Right-click image to save</p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">Image Size (px)</label>
            <input 
                type="number" 
                value={size} 
                onChange={(e) => setSize(Math.min(1000, Math.max(100, parseInt(e.target.value) || 100)))}
                className="w-full p-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex-1 flex items-end">
             <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrUrl;
                  link.download = 'qrcode.png';
                  link.click();
                }}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
            >
              Direct Download
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default QRCodeGenerator;
