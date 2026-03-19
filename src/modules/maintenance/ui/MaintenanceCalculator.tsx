import React from 'react';
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

    const currencyPrefix = input.region === 'india' ? '₹' : input.region === 'romania' ? 'RON ' : input.region === 'ireland' ? '€' : '$';
    const incomeMax = input.region === 'india' ? 500000 : 100000;
    const incomeStep = input.region === 'india' ? 1000 : 100;

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-7 space-y-6">
                <Card className="animate-fade-in-up">
                    <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.jurisdiction.title}</h2>
                        <p className="text-sm text-slate-500">{t.jurisdiction.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {(['us', 'india', 'mexico', 'romania', 'ireland'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => updateRegion(r)}
                                className={`py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                                    input.region === r 
                                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold' 
                                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                            >
                                <span className="text-2xl">
                                    {r === 'us' ? '🇺🇸' : r === 'india' ? '🇮🇳' : r === 'mexico' ? '🇲🇽' : r === 'romania' ? '🇷🇴' : '🇮🇪'}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider">{r}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
                            onChange={(val) => updateIncome('husbandMonthlyIncome', val)}
                        />
                        <Slider
                            label={t.financials.wifeIncome || "Wife's Income"}
                            value={input.income.wifeMonthlyIncome}
                            min={0}
                            max={incomeMax}
                            step={incomeStep}
                            prefix={currencyPrefix}
                            onChange={(val) => updateIncome('wifeMonthlyIncome', val)}
                        />
                    </div>
                </Card>

                <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                            onChange={(val) => updateFamily('marriageDurationYears', val)}
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
                                        onChange={(e) => updateFamily('custody', e.target.value)}
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
                                onChange={(e) => updateCity(e.target.value as any)}
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

