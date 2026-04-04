"use client"

import * as React from 'react';

import { Slider } from '../../../shared/ui/Slider';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Select } from '../../../shared/ui/Select';
import { ReviewStep } from './ReviewStep';
import type { Region, IncomeDetails, FamilyDetails, CityType, CalculationResult } from '../domain/types';
import type { Translations } from '../domain/translations';

interface MaintenanceCalculatorProps {
    input: {
        region: Region;
        income: IncomeDetails;
        family: FamilyDetails;
        cityType: CityType;
        isWifeHomemaker: boolean;
    };
    result: CalculationResult | null;
    isCalculating: boolean;
    t: Translations;
    updateRegion: (region: Region) => void;
    updateIncome: (field: keyof IncomeDetails, value: number) => void;
    updateFamily: (field: keyof FamilyDetails, value: any) => void;
    updateCity: (city: CityType) => void;
    updateWifeHomemaker: (isHomemaker: boolean) => void;
    calculate: () => void;
    reset: () => void;
}

export const MaintenanceCalculator: React.FC<MaintenanceCalculatorProps> = ({
    input,
    result,
    isCalculating,
    t,
    updateRegion,
    updateIncome,
    updateFamily,
    updateCity,
    updateWifeHomemaker,
    calculate,
    reset
}) => {

    const getFlagIcon = (region: string) => {
        const flags: Record<string, React.ReactNode> = {
            us: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 741 390">
                    <rect width="741" height="390" fill="#3c3b6e" />
                    <g fill="#b22234">
                        <rect width="741" height="30" y="0" />
                        <rect width="741" height="30" y="60" />
                        <rect width="741" height="30" y="120" />
                        <rect width="741" height="30" y="180" />
                        <rect width="741" height="30" y="240" />
                        <rect width="741" height="30" y="300" />
                        <rect width="741" height="30" y="360" />
                    </g>
                    <rect width="296" height="210" fill="#3c3b6e" />
                    <path fill="#fff" d="M12,18 L19,30 L32,30 L21,38 L25,50 L12,42 L0,50 L4,38 L-7,30 L6,30 Z" transform="scale(0.5) translate(40,40)" />
                    {/* Simplified US Flag */}
                </svg>
            ),
            uk: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 60 30">
                    <clipPath id="s">
                        <path d="M0,0 v30 h60 v-30 z" />
                    </clipPath>
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                </svg>
            ),
            india: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 900 600">
                    <rect width="900" height="600" fill="#f4c2c2" />
                    <rect width="900" height="200" fill="#ff9933" />
                    <rect width="900" height="200" y="200" fill="#ffffff" />
                    <rect width="900" height="200" y="400" fill="#128807" />
                    <circle cx="450" cy="300" r="80" fill="#000080" />
                </svg>
            ),
            canada: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 100 50">
                    <rect width="100" height="50" fill="#ff0000" />
                    <rect width="50" height="50" x="25" fill="#ffffff" />
                    <path d="M50,10 L55,25 L70,25 L58,35 L62,50 L50,40 L38,50 L42,35 L30,25 L45,25 Z" fill="#ff0000" />
                </svg>
            ),
            australia: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 60 30">
                    <rect width="60" height="30" fill="#00008b" />
                    <path d="M0,0 v15 h30 v-15 z" fill="#012169" />
                    <path d="M0,0 L30,15 M30,0 L0,15" stroke="#fff" strokeWidth="3" />
                    <path d="M15,0 v15 M0,7.5 h30" stroke="#fff" strokeWidth="5" />
                    <path d="M15,0 v15 M0,7.5 h30" stroke="#C8102E" strokeWidth="3" />
                </svg>
            ),
            ireland: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 6 3">
                    <rect width="6" height="3" fill="#ffffff" />
                    <rect width="2" height="3" fill="#169b62" />
                    <rect width="2" height="3" x="4" fill="#ff883e" />
                </svg>
            ),
            mexico: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 7 4">
                    <rect width="7" height="4" fill="#ffffff" />
                    <rect width="2.33" height="4" fill="#006847" />
                    <rect width="2.33" height="4" x="4.66" fill="#ce1126" />
                    <circle cx="3.5" cy="2" r="0.5" fill="#a57c00" />
                </svg>
            ),
            romania: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 3 2">
                    <rect width="1" height="2" fill="#002b7f" />
                    <rect width="1" height="2" x="1" fill="#fcd116" />
                    <rect width="1" height="2" x="2" fill="#ce1126" />
                </svg>
            ),
            pakistan: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 3 2">
                    <rect width="3" height="2" fill="#01411c" />
                    <rect width="0.75" height="2" fill="#ffffff" />
                    <circle cx="1.8" cy="1" r="0.6" fill="#ffffff" />
                    <circle cx="2" cy="0.8" r="0.6" fill="#01411c" />
                    <path d="M2.3,0.3 L2.4,0.6 L2.7,0.7 L2.4,0.8 L2.3,1.1 L2.2,0.8 L1.9,0.7 L2.2,0.6 Z" fill="#ffffff" />
                </svg>
            ),
            germany: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 5 3">
                    <rect width="5" height="1" fill="#000000" />
                    <rect width="5" height="1" y="1" fill="#dd0000" />
                    <rect width="5" height="1" y="2" fill="#ffce00" />
                </svg>
            ),
            switzerland: (
                <svg className="w-5 h-4 rounded-sm shadow-sm" viewBox="0 0 1 1">
                    <rect width="1" height="1" fill="#ff0000" />
                    <rect width="0.6" height="0.15" x="0.2" y="0.425" fill="#ffffff" />
                    <rect width="0.15" height="0.6" x="0.425" y="0.2" fill="#ffffff" />
                </svg>
            )
        };
        return flags[region] || flags.us;
    };

    const getOptionLabel = (region: string, name: string) => (
        <span className="flex items-center gap-3">
            {getFlagIcon(region)}
            <span>{name}</span>
        </span>
    );

    const currencyPrefix = t.currency === 'INR' ? '₹' : t.currency === 'PKR' ? '₨' : t.currency === 'CHF' ? 'CHF ' : t.currency === 'EUR' ? '€' : t.currency === 'GBP' ? '£' : '$';
    const incomeMax = input.region === 'india' || input.region === 'pakistan' ? 500000 : 100000;
    const incomeStep = input.region === 'india' || input.region === 'pakistan' ? 1000 : 100;

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-7 space-y-6">
                <Card className="animate-fade-in-up !overflow-visible z-30">
                    <Select
                        label={t.jurisdiction.title}
                        value={input.region}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateRegion(e.target.value as Region)}
                        options={[
                            { value: 'us', label: getOptionLabel('us', 'United States') as any },
                            { value: 'uk', label: getOptionLabel('uk', 'United Kingdom') as any },
                            { value: 'canada', label: getOptionLabel('canada', 'Canada') as any },
                            { value: 'australia', label: getOptionLabel('australia', 'Australia') as any },
                            { value: 'germany', label: getOptionLabel('germany', 'Germany') as any },
                            { value: 'switzerland', label: getOptionLabel('switzerland', 'Switzerland') as any },
                            { value: 'ireland', label: getOptionLabel('ireland', 'Ireland') as any },
                            { value: 'india', label: getOptionLabel('india', 'India') as any },
                            { value: 'pakistan', label: getOptionLabel('pakistan', 'Pakistan') as any },
                            { value: 'mexico', label: getOptionLabel('mexico', 'Mexico') as any },
                            { value: 'romania', label: getOptionLabel('romania', 'Romania') as any }
                        ]}
                    />
                    <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 italic">
                        {t.jurisdiction.subtitle}
                    </p>
                </Card>

                <Card className="animate-fade-in-up !overflow-visible z-20" style={{ animationDelay: '0.1s' }}>
                    <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.financials.title}</h2>
                        <p className="text-sm text-slate-500">{t.financials.subtitle}</p>
                    </div>

                    <div className="space-y-8">
                        <Slider
                            label={t.financials.husbandIncome || "Husband's Income"}
                            value={input.income.husbandMonthlyIncome}
                            min={0}
                            max={incomeMax}
                            step={incomeStep}
                            prefix={currencyPrefix}
                            onChange={(val: number) => updateIncome('husbandMonthlyIncome', val)}
                        />
                        <Slider
                            label={t.financials.wifeIncome || "Wife's Income"}
                            value={input.income.wifeMonthlyIncome}
                            min={0}
                            max={incomeMax}
                            step={incomeStep}
                            prefix={currencyPrefix}
                            onChange={(val: number) => updateIncome('wifeMonthlyIncome', val)}
                        />
                    </div>
                </Card>

                <Card className="animate-fade-in-up !overflow-visible z-10" style={{ animationDelay: '0.2s' }}>
                    <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.family.title}</h2>
                        <p className="text-sm text-slate-500">{t.family.subtitle}</p>
                    </div>

                    <div className="space-y-8">
                        <Slider
                            label={t.family.marriageDuration}
                            value={input.family.marriageDurationYears}
                            min={0}
                            max={50}
                            onChange={(val: number) => updateFamily('marriageDurationYears', val)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.family.children}</label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-lg transition-colors"
                                        onClick={() => updateFamily('dependentChildren', Math.max(0, input.family.dependentChildren - 1))}
                                    >-</button>
                                    <span className="text-xl font-bold w-6 text-center">{input.family.dependentChildren}</span>
                                    <button
                                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-lg transition-colors"
                                        onClick={() => updateFamily('dependentChildren', Math.min(10, input.family.dependentChildren + 1))}
                                    >+</button>
                                </div>
                            </div>

                            {input.family.dependentChildren > 0 && (
                                <div className="animate-fade-in">
                                    <Select
                                        label={t.family.custody}
                                        value={input.family.custody}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFamily('custody', e.target.value)}
                                        options={[
                                            { value: 'none', label: t.family.custodyOptions.none },
                                            { value: 'wife', label: t.family.custodyOptions.wife },
                                            { value: 'husband', label: t.family.custodyOptions.husband },
                                            { value: 'shared', label: t.family.custodyOptions.shared }
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <Select
                                label={t.family.cityType}
                                value={input.cityType}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateCity(e.target.value as any)}
                                options={[
                                    { value: 'metro', label: t.family.cityOptions.metro },
                                    { value: 'tier-1', label: t.family.cityOptions.tier1 },
                                    { value: 'tier-2-rural', label: t.family.cityOptions.tier2 },
                                ]}
                            />

                            <div
                                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={() => updateWifeHomemaker(!input.isWifeHomemaker)}
                            >
                                <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{t.family.homemaker}</span>
                                <div className={`w-11 h-6 rounded-full transition-colors relative ${input.isWifeHomemaker ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${input.isWifeHomemaker ? 'translate-x-5' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <Button
                            onClick={calculate}
                            isLoading={isCalculating}
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 border-none text-lg py-3 shadow-amber-500/20"
                        >
                            {t.result.calculate}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Right Column: Result - Sticky */}
            {/* Right Column: Result - Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
                {result ? (
                    <ReviewStep result={result} onReset={reset} t={t} />
                ) : (
                    <Card className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent shadow-none">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-4xl">
                            ⚖️
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{t.result.readyTitle}</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                            {t.result.readySubtitle}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};

