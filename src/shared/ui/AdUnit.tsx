'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Reusable Google AdSense Ad Unit Component
 * 
 * Usage:
 * <AdUnit slotId="YOUR_SLOT_ID" format="auto" />
 */
export const AdUnit = ({ slotId, format = 'auto', className = '', style = { display: 'block' } }: AdUnitProps) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense Error:', err);
    }
  }, [slotId]);

  return (
    <div className={`ad-wrapper overflow-hidden bg-slate-100/50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 min-h-[100px] flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9834734153117480"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Fallback text visible only in development if slot is missing */}
      <span className="hidden group-hover:block absolute text-[10px] text-slate-400 pointer-events-none">
        Advertisement Space (Slot: {slotId})
      </span>
    </div>
  );
};
