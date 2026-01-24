import React from 'react';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    formatValue?: (val: number) => string;
    prefix?: string;
    suffix?: string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    formatValue = (v) => v.toLocaleString(),
    prefix = '',
    suffix = ''
}) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full group">
            <div className="flex justify-between items-end mb-3">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-200">
                    {label}
                </label>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                    {prefix}{formatValue(value)}{suffix}
                </span>
            </div>

            <div className="relative w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 cursor-pointer touch-none">
                {/* Track Fill */}
                <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 transition-none"
                    style={{ width: `${percentage}%` }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="
            absolute w-full h-full opacity-0 cursor-pointer z-10
          "
                />

                {/* Custom Thumb Visual */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-amber-600 rounded-full shadow-lg pointer-events-none transform transition-transform duration-150 ease-out group-hover:scale-125 group-active:scale-110"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />
            </div>
        </div>
    );
};
