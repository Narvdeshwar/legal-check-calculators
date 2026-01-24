import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`
      relative overflow-hidden
      bg-white/40 dark:bg-slate-900/40 
      backdrop-blur-2xl 
      border border-white/40 dark:border-slate-700/40
      shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
      rounded-3xl 
      p-6 sm:p-8 
      transition-all duration-300 ease-out
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
      ${className}
    `}>
            {title && (
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 tracking-tight">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};
