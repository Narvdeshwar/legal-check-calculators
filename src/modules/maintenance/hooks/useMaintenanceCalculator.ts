import { useState, useCallback, useEffect } from 'react';
import type { CalculatorInput, CalculationResult, CityType, Region } from '../domain/types';
import { calculateMaintenance } from '../domain/calculator';

const INITIAL_STATE: CalculatorInput = {
    region: 'us', // Defaulting to US as it has the highest traffic
    income: {
        husbandMonthlyIncome: 5000,
        wifeMonthlyIncome: 0,
    },
    family: {
        marriageDurationYears: 5,
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

    // Update document title and meta tags for SEO when region changes
    useEffect(() => {
        const countryMap: Record<Region, string> = {
            us: 'United States',
            india: 'India',
            mexico: 'Mexico',
            romania: 'Romania',
            ireland: 'Ireland',
            uk: 'United Kingdom',
            canada: 'Canada',
            australia: 'Australia',
            pakistan: 'Pakistan',
            germany: 'Germany',
            switzerland: 'Switzerland'
        };
        const country = countryMap[input.region];
        document.title = `${country} Maintenance & Alimony Calculator | Legal Check`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', `Calculate estimated monthly maintenance and alimony in ${country}. Free jurisdictional tool based on regional legal standards.`);
        }
    }, [input.region]);

    const updateRegion = useCallback((region: Region) => {
        setInput(prev => ({ 
            ...prev, 
            region,
            income: region === 'india' ? { husbandMonthlyIncome: 50000, wifeMonthlyIncome: 0 } 
                  : region === 'romania' ? { husbandMonthlyIncome: 10000, wifeMonthlyIncome: 0 }
                  : region === 'ireland' ? { husbandMonthlyIncome: 6000, wifeMonthlyIncome: 0 }
                  : { husbandMonthlyIncome: 5000, wifeMonthlyIncome: 0 }
        }));
    }, []);

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
        updateRegion,
        updateIncome,
        updateFamily,
        updateCity,
        updateWifeHomemaker,
        calculate,
        reset
    };
};
