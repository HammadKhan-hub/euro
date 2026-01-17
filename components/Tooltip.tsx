
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`absolute z-[100] ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 w-48 p-2.5 bg-slate-900 text-white text-[10px] leading-tight font-black rounded-xl shadow-2xl text-center animate-fade-in pointer-events-none border border-slate-700/50 backdrop-blur-md`}>
          {text}
          <div className={`absolute left-1/2 -translate-x-1/2 border-8 border-transparent ${position === 'top' ? 'top-full border-t-slate-900' : 'bottom-full border-b-slate-900'}`}></div>
        </div>
      )}
    </div>
  );
};
