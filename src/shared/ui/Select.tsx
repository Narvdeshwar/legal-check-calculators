import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
    value: string;
    label: React.ReactNode;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (e: { target: { value: string } }) => void;
    error?: string;
    className?: string;
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ 
    label, 
    options, 
    value, 
    onChange, 
    error, 
    className = '',
    placeholder = 'Select an option'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange({ target: { value: val } });
        setIsOpen(false);
    };

    return (
        <div className={`w-full group relative ${className}`} ref={containerRef}>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-200">
                {label}
            </label>
            
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full text-left
                        bg-white dark:bg-slate-900/50
                        border-2 rounded-xl
                        py-2.5 pl-4 pr-10
                        text-slate-900 dark:text-slate-100
                        transition-all duration-200
                        flex items-center justify-between
                        ${isOpen ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}
                        ${error ? 'border-red-500 ring-red-500/10' : ''}
                    `}
                >
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-amber-500/70 dark:text-amber-500/40">
                        <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden animate-fade-in-down">
                        <ul className="max-h-60 overflow-y-auto py-1">
                            {options.map((opt) => (
                                <li 
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className={`
                                        px-4 py-2.5 cursor-pointer text-sm transition-colors flex items-center
                                        ${opt.value === value 
                                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold' 
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                    `}
                                >
                                    {opt.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};
