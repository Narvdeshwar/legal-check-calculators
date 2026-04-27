import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { exportToPDF } from '../../../utils/pdfExport';
import { useState, useEffect } from 'react';
import { Download, Lock, ChevronDown, Scale, ShieldCheck } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { AdUnit } from '../../../shared/ui/AdUnit';
import { supabase } from '../../../utils/supabase';
import type { CalculationResult, CalculatorInput } from '../domain/types';
import type { Translations } from '../domain/translations';

interface ReviewStepProps {
    result: CalculationResult;
    input: CalculatorInput;
    t: Translations;
    onReset: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ result, input, t, onReset }) => {
    const [user, setUser] = useState<User | null>(null);
    const [showCitations, setShowCitations] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        
        // Data Collection for Authenticated Users
        const syncData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await supabase.from('calculations').insert({
                    user_id: session.user.id,
                    jurisdiction: result.legalContext,
                    amount: result.monthlyMaintenanceAmount,
                    details: {
                        modifiers: result.breakdown.modifiers,
                        note: result.calculationNote
                    }
                });
            }
        };
        syncData();

        return () => subscription.unsubscribe();
    }, [result]);

    const handleExport = () => {
        if (!user) return;
        exportToPDF({
            jurisdiction: result.legalContext,
            maintenanceAmount: formatCurrency(result.monthlyMaintenanceAmount),
            calculationDetails: {
                "Jurisdiction": result.legalContext,
                "Sub-Region": input.subRegion || "N/A",
                "Husband Monthly Income": formatCurrency(input.income.husbandMonthlyIncome),
                "Wife Monthly Income": formatCurrency(input.income.wifeMonthlyIncome),
                "Marriage Duration": `${input.family.marriageDurationYears} Years`,
                "Dependent Children": input.family.dependentChildren,
                "Custody Arrangement": input.family.custody.toUpperCase(),
                "Base Calculation": formatCurrency(result.breakdown.baseAmount),
                "Duration Adjustment": `+ ${formatCurrency(result.breakdown.modifiers.duration)}`,
                "Children Adjustment": `+ ${formatCurrency(result.breakdown.modifiers.children)}`,
                "City/Living Adjustment": `${result.breakdown.modifiers.city >= 0 ? '+' : ''} ${formatCurrency(result.breakdown.modifiers.city)}`,
                "Final Note": result.calculationNote
            },
            date: new Date().toLocaleDateString()
        });
    };
    const formatCurrency = (amount: number) => {
        const currencyCode = result.currencySymbol === '₹' ? 'INR' 
                        : result.currencySymbol.trim() === 'RON' ? 'RON' 
                        : result.currencySymbol === '€' ? 'EUR' 
                        : 'USD';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0,
        }).format(amount).replace(/INR|RON|USD|EUR/g, result.currencySymbol);
    };

    return (
        <Card className="animate-scale-in border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">{t.result.howCalculated}</h3>

            <div className="space-y-6">
                <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-bold">{t.result.estimatedTitle}</p>
                    <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                            {formatCurrency(result.monthlyMaintenanceAmount)}
                        </span>
                        <span className="text-slate-500 font-medium">/ {t.result.perMonth}</span>
                    </div>
                </div>

                <div className="space-y-3 px-2">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>{t.result.baseAmount}</span>
                        <span className="font-semibold">{formatCurrency(result.breakdown.baseAmount)}</span>
                    </div>

                    {result.breakdown.modifiers.duration > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>{t.result.bonusDuration}</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.duration)}</span>
                        </div>
                    )}

                    {result.breakdown.modifiers.children > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>{t.result.bonusChildren}</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.children)}</span>
                        </div>
                    )}
                    
                    {result.breakdown.modifiers.childEducation && result.breakdown.modifiers.childEducation > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>{t.result.educationCost}</span>
                            <span>+ {formatCurrency(result.breakdown.modifiers.childEducation)}</span>
                        </div>
                    )}

                    {result.breakdown.modifiers.city !== 0 && (
                        <div className={`flex justify-between ${result.breakdown.modifiers.city > 0 ? 'text-green-600' : 'text-slate-500'}`}>
                            <span>{t.result.adjustmentCity}</span>
                            <span>{result.breakdown.modifiers.city > 0 ? '+' : ''} {formatCurrency(result.breakdown.modifiers.city)}</span>
                        </div>
                    )}
                </div>

                <AdUnit slot="7827466855" format="auto" className="mx-2" />

                <div className="p-4 bg-slate-900/5 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-2">
                           <Scale className="w-3 h-3 text-amber-600" />
                           {t.result.note}
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                            {result.calculationNote}
                        </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/30">
                        <button 
                            onClick={() => setShowCitations(!showCitations)}
                            className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            <span>Legal Authority & Citations</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${showCitations ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showCitations && (
                            <div className="mt-3 p-3 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 animate-fade-in">
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-inter">
                                    This calculation is based on <span className="text-slate-900 dark:text-slate-200 font-bold">{result.legalContext}</span>. 
                                    Maintenance (alimony) awards are discretionary, but courts typically use these income-percentage models as starting points for 2026 proceedings.
                                </p>
                                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-amber-600/80 font-medium italic">
                                    <ShieldCheck className="w-3 h-3" />
                                    Statutory reference verified by Global Legal Intelligence Hub.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    {user ? (
                        <Button
                            onClick={handleExport}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export Data to PDF
                        </Button>
                    ) : (
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                            <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-xs">
                                <Lock className="w-3.5 h-3.5" />
                                Premium Feature Locked
                            </div>
                            <p className="text-[10px] text-slate-400">Sign in to unlock professional PDF exports and cloud data synchronization.</p>
                        </div>
                    )}
                    
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter">
                        {t.result.disclaimer}
                    </p>
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="w-full border-slate-200 dark:border-slate-800 font-medium"
                    >
                        {t.result.calculateAgain}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
