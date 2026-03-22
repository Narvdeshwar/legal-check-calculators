import type { CalculatorInput, CalculationResult, Region } from './types';

const REGION_CONFIG: Record<Region, { 
    currencySymbol: string; 
    basePercentage: number; 
    maxCap: number; 
    legalContext: string;
}> = {
    'india': {
        currencySymbol: '₹',
        basePercentage: 0.25,
        maxCap: 0.50,
        legalContext: 'Supreme Court guidelines (e.g., Kulbhushan Kumar vs Raj Kumari)'
    },
    'us': {
        currencySymbol: '$',
        basePercentage: 0.20,
        maxCap: 0.40,
        legalContext: 'Standard US State Guidelines (e.g., California/Florida models)'
    },
    'mexico': {
        currencySymbol: '$',
        basePercentage: 0.15,
        maxCap: 0.50,
        legalContext: 'Mexico Civil Code standards (Alimentos)'
    },
    'romania': {
        currencySymbol: 'RON ',
        basePercentage: 0.25,
        maxCap: 0.33,
        legalContext: 'Romanian Civil Code (Art. 389 - Pensie de întreținere)'
    },
    'ireland': {
        currencySymbol: '€',
        basePercentage: 0.25,
        maxCap: 0.40,
        legalContext: 'Irish Family Law (Judicial Separation and Family Law Reform Act)'
    },
    'uk': {
        currencySymbol: '£',
        basePercentage: 0.25,
        maxCap: 0.40,
        legalContext: 'UK Matrimonial Causes Act 1973 (Needs-based assessment)'
    },
    'canada': {
        currencySymbol: '$',
        basePercentage: 0.20,
        maxCap: 0.45,
        legalContext: 'Canada Spousal Support Advisory Guidelines (SSAG)'
    },
    'australia': {
        currencySymbol: '$',
        basePercentage: 0.20,
        maxCap: 0.40,
        legalContext: 'Australian Family Law Act 1975 (Needs & Capacity model)'
    }
};

export const calculateMaintenance = (input: CalculatorInput): CalculationResult => {
    const { income, family, cityType, isWifeHomemaker, region } = input;
    const config = REGION_CONFIG[region || 'india'];

    // 1. Base Rule
    const husbandIncome = Number(income.husbandMonthlyIncome) || 0;
    const wifeIncome = Number(income.wifeMonthlyIncome) || 0;

    const incomeDifference = Math.max(0, husbandIncome - wifeIncome);

    if (husbandIncome <= wifeIncome) {
        return {
            monthlyMaintenanceAmount: 0,
            currencySymbol: config.currencySymbol,
            legalContext: config.legalContext,
            breakdown: {
                baseAmount: 0,
                modifiers: { duration: 0, children: 0, city: 0 },
                capApplied: false
            },
            calculationNote: `Wife's income is equal to or greater than Husband's income. Generally, no maintenance is awarded in this scenario (${config.legalContext}).`
        };
    }

    // Base Calculation
    let currentAmount = incomeDifference * config.basePercentage;
    const baseAmount = currentAmount;

    // 2. Modifiers
    let durationBonus = 0;
    let childrenBonus = 0;
    let cityBonus = 0;

    // a) Marriage duration
    if (family.marriageDurationYears > 10) {
        durationBonus = incomeDifference * 0.05;
    }

    // b) Children
    if (family.dependentChildren > 0 && family.custody === 'wife') {
        const childPercentage = Math.min(family.dependentChildren * 0.05, 0.10);
        childrenBonus = incomeDifference * childPercentage;
    }

    // c) City Type
    if (cityType === 'metro') {
        cityBonus = incomeDifference * 0.10;
    } else if (cityType === 'tier-1') {
        cityBonus = incomeDifference * 0.05;
    }

    currentAmount = baseAmount + durationBonus + childrenBonus + cityBonus;

    // 3. Cap Logic
    let capApplied = false;

    const absoluteMaxCap = husbandIncome * config.maxCap;

    if (currentAmount > absoluteMaxCap) {
        currentAmount = absoluteMaxCap;
        capApplied = true;
    }

    // Note construction
    let note = `Estimated based on ${config.basePercentage * 100}% of income difference + jurisdictional modifiers (${config.legalContext}).`;
    if (isWifeHomemaker && wifeIncome === 0) {
        note += " Considered homemaker/non-earning spouse status.";
    }

    return {
        monthlyMaintenanceAmount: Math.round(currentAmount),
        currencySymbol: config.currencySymbol,
        legalContext: config.legalContext,
        breakdown: {
            baseAmount: Math.round(baseAmount),
            modifiers: {
                duration: Math.round(durationBonus),
                children: Math.round(childrenBonus),
                city: Math.round(cityBonus),
            },
            capApplied,
            capReason: capApplied ? `Capped at ${config.maxCap * 100}% of gross income per ${config.legalContext}` : ''
        },
        calculationNote: note
    };
};
