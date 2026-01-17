
import React from 'react';

export const AdPlaceholder: React.FC<{ slot?: string, className?: string }> = ({ slot, className }) => (
  <div className={`my-8 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden min-h-[100px] ${className}`}>
    <div className="text-center p-4">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Advertisement</span>
      <p className="text-[10px] text-gray-300 mt-1">Ads help keep this tool free for everyone.</p>
    </div>
    {/* Real AdSense code would be injected here */}
  </div>
);
