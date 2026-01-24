import React from 'react';
import { useMaintenanceCalculator } from '../hooks/useMaintenanceCalculator';
import { Slider } from '../../../shared/ui/Slider';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Select } from '../../../shared/ui/Select';
import { ReviewStep } from './ReviewStep';

export const MaintenanceCalculator: React.FC = () => {
    const {
        input,
        result,
        isCalculating,
        updateIncome,
        updateFamily,
        updateCity,
        updateWifeHomemaker,
        calculate,
        reset
    } = useMaintenanceCalculator();

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-7 space-y-6">
                <Card className="animate-fade-in-up">
                    <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Financial Details</h2>
                        <p className="text-sm text-slate-500">Enter monthly income details for both parties.</p>
                    </div>

                    <div className="space-y-8">
                        <Slider
                            label="Husband's Monthly Income"
                            value={input.income.husbandMonthlyIncome}
                            min={0}
                            max={500000}
                            step={1000}
                            prefix="₹"
                            onChange={(val) => updateIncome('husbandMonthlyIncome', val)}
                        />
                        <Slider
                            label="Wife's Monthly Income"
                            value={input.income.wifeMonthlyIncome}
                            min={0}
                            max={500000}
                            step={1000}
                            prefix="₹"
                            onChange={(val) => updateIncome('wifeMonthlyIncome', val)}
                        />
                    </div>
                </Card>

                <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Family & Context</h2>
                        <p className="text-sm text-slate-500">Duration of marriage and dependents affect the calculation.</p>
                    </div>

                    <div className="space-y-8">
                        <Slider
                            label="Marriage Duration (Years)"
                            value={input.family.marriageDurationYears}
                            min={0}
                            max={50}
                            onChange={(val) => updateFamily('marriageDurationYears', val)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Children</label>
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
                                        label="Child Custody"
                                        value={input.family.custody}
                                        onChange={(e) => updateFamily('custody', e.target.value)}
                                        options={[
                                            { value: 'none', label: 'Who has custody?' },
                                            { value: 'wife', label: 'Wife' },
                                            { value: 'husband', label: 'Husband' },
                                            { value: 'shared', label: 'Shared' }
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <Select
                                label="City Type"
                                value={input.cityType}
                                onChange={(e) => updateCity(e.target.value as any)}
                                options={[
                                    { value: 'metro', label: 'Metro City (Tier 1)' },
                                    { value: 'tier-1', label: 'Tier 2 City' },
                                    { value: 'tier-2-rural', label: 'Rural / Small Town' },
                                ]}
                            />

                            <div
                                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={() => updateWifeHomemaker(!input.isWifeHomemaker)}
                            >
                                <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Is Wife a Homemaker?</span>
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
                            Calculate Maintenance
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Right Column: Result - Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
                {result ? (
                    <ReviewStep result={result} onReset={reset} />
                ) : (
                    <Card className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent shadow-none">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-4xl">
                            ⚖️
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Ready to Estimate</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Fill in the details on the left and click "Calculate" to see the estimated monthly maintenance amount.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};
