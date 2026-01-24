import { useState, useCallback } from 'react';
import type { CalculatorInput, CalculationResult, CityType } from '../domain/types';
import { calculateMaintenance } from '../domain/calculator';

const INITIAL_STATE: CalculatorInput = {
    income: {
        husbandMonthlyIncome: 50000,
        wifeMonthlyIncome: 0,
    },
    family: {
        marriageDurationYears: 2,
        dependentChildren: 0,
        custody: 'none',
    },
    cityType: 'tier-1',
    isWifeHomemaker: true,
};

export const useMaintenanceCalculator = () => {
    const [input, setInput] = useState<CalculatorInput>(INITIAL_STATE);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const updateIncome = useCallback((field: keyof CalculatorInput['income'], value: number) => {
        setInput(prev => ({
            ...prev,
            income: { ...prev.income, [field]: value }
        }));
    }, []);

    const updateFamily = useCallback((field: keyof CalculatorInput['family'], value: any) => {
        setInput(prev => ({
            ...prev,
            family: { ...prev.family, [field]: value }
        }));
    }, []);

    const updateCity = useCallback((city: CityType) => {
        setInput(prev => ({ ...prev, cityType: city }));
    }, []);

    const updateWifeHomemaker = useCallback((isHomemaker: boolean) => {
        setInput(prev => ({ ...prev, isWifeHomemaker: isHomemaker }));
    }, []);

    const calculate = useCallback(async () => {
        setIsCalculating(true);
        // Simulate a small delay for "thinking" effect (smoothness perception)
        await new Promise(resolve => setTimeout(resolve, 800));

        const res = calculateMaintenance(input);
        setResult(res);
        setIsCalculating(false);
    }, [input]);

    const reset = useCallback(() => {
        setInput(INITIAL_STATE);
        setResult(null);
    }, []);

    return {
        input,
        result,
        isCalculating,
        updateIncome,
        updateFamily,
        updateCity,
        updateWifeHomemaker,
        calculate,
        reset
    };
};
