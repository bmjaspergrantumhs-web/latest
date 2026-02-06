
import React from 'react';

const BrandLogo = ({ className = "h-12 w-auto" }: { className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <div className="relative flex items-center">
      <svg viewBox="0 0 100 100" className="h-full w-auto text-emerald-900" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />
        <ellipse cx="45" cy="50" rx="15" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-60" />
        <path d="M45 15 L35 35 L40 35 L30 55 L40 55 L25 80 L65 80 L50 55 L60 55 L50 35 L55 35 Z" fill="#064e3b" />
        <rect x="42" y="80" width="6" height="8" fill="#1e1b1b" />
      </svg>
      <div className="ml-3 flex flex-col justify-center">
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-stone-500 font-bold leading-none">The</span>
        <span className="text-xl font-bold text-emerald-950 brand-font tracking-tight leading-none">GARDEN</span>
        <span className="text-sm font-bold text-emerald-900 brand-font tracking-[0.1em] leading-none mt-0.5">ARCHITECT</span>
      </div>
    </div>
  </div>
);

export default BrandLogo;
