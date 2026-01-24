import React from 'react';
import type { CalculationResult } from '../domain/types';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

interface ReviewStepProps {
    result: CalculationResult;
    onReset: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ result, onReset }) => {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-950 border-amber-200 dark:border-slate-800">
                <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Estimated Monthly Maintenance
                </h2>
                <div className="text-center mb-6">
                    <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-500">
                        {formatCurrency(result.monthlyMaintenanceAmount)}
                    </span>
                    <p className="text-xs text-slate-400 mt-2">per month</p>
                </div>

                <div className="space-y-3 text-sm border-t border-slate-200 dark:border-slate-800/50 pt-4">
                    <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Base Amount</span>
                        <span className="font-medium">{formatCurrency(result.breakdown.baseAmount)}</span>
                    </div>

                    {result.breakdown.modifiers.duration > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Long Marriage Bonus</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.duration)}</span>
                        </div>
                    )}

                    {result.breakdown.modifiers.children > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Child Support</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.children)}</span>
                        </div>
                    )}

                    {result.breakdown.modifiers.city > 0 && (
                        <div className="flex justify-between text-slate-500">
                            <span>City Adjustment</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.city)}</span>
                        </div>
                    )}

                    {result.breakdown.capApplied && (
                        <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500">
                            <span className="font-semibold text-amber-600">Note:</span> {result.breakdown.capReason}
                        </div>
                    )}
                </div>
            </Card>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">How this is calculated?</h4>
                <p>{result.calculationNote}</p>
                <p className="mt-2 text-xs italic opacity-75">
                    Disclaimer: This is an estimation based on general application of laws. Actual court orders vary significantly case-by-case.
                </p>
            </div>

            <Button onClick={onReset} variant="outline" className="w-full justify-center">
                Calculate Again
            </Button>
        </div>
    );
};
