import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import type { CalculationResult } from '../domain/types';
import type { Translations } from '../domain/translations';
import { supabase } from '../../../utils/supabase';
import { exportToPDF } from '../../../utils/pdfExport';
import { useState, useEffect } from 'react';
import { Download, Lock } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { AdUnit } from '../../../shared/ui/AdUnit';

interface ReviewStepProps {
    result: CalculationResult;
    t: Translations;
    onReset: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ result, t, onReset }) => {
    const [user, setUser] = useState<User | null>(null);

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
                baseAmount: formatCurrency(result.breakdown.baseAmount),
                ...result.breakdown.modifiers,
                legalCategory: result.legalContext,
                note: result.calculationNote
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

                <AdUnit slotId="7827466855" format="fluid" className="mx-2" />

                <div className="p-4 bg-slate-900/5 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        <span className="font-bold not-italic block mb-1 text-slate-700 dark:text-slate-300">
                            {t.result.note} {result.legalContext}
                        </span>
                        {result.calculationNote}
                    </p>
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
