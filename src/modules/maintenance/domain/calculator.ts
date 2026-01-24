import type { CalculatorInput, CalculationResult } from './types';

export const calculateMaintenance = (input: CalculatorInput): CalculationResult => {
    const { income, family, cityType, isWifeHomemaker } = input;

    // 1. Base Rule: 20-30% of income difference (Net Disposable Income)
    // Converting input to numbers to ensure safety
    const husbandIncome = Number(income.husbandMonthlyIncome) || 0;
    const wifeIncome = Number(income.wifeMonthlyIncome) || 0;

    const incomeDifference = Math.max(0, husbandIncome - wifeIncome);

    // If wife earns more, usually no maintenance or very minimal (case specific), 
    // but here we focus on husband paying wife as per common requirement.
    // If husband income is less or equal, base maintenance is 0.
    if (husbandIncome <= wifeIncome) {
        return {
            monthlyMaintenanceAmount: 0,
            breakdown: {
                baseAmount: 0,
                modifiers: { duration: 0, children: 0, city: 0 },
                capApplied: false
            },
            calculationNote: "Wife's income is equal to or greater than Husband's income. Generally, no maintenance is awarded in this scenario."
        };
    }

    // Base Calculation (25% average of difference)
    // Standard practice is often 25% of husband's net income if wife has no income,
    // or 25% of the *difference* in incomes.
    // We'll use 25% of the difference as the starting base.
    let basePercentage = 0.25;
    let currentAmount = incomeDifference * basePercentage;
    const baseAmount = currentAmount;

    // 2. Modifiers
    let durationBonus = 0;
    let childrenBonus = 0;
    let cityBonus = 0;

    // a) Marriage > 10 years -> +5% of base difference (simulating ~ +5% weight)
    // Implementation: We add percentage points to the base logic or add flat amount?
    // Requirement: "Marriage > 10 years -> +5%"
    // We interpret this as increasing the maintenance share by 5% of the difference.
    if (family.marriageDurationYears > 10) {
        durationBonus = incomeDifference * 0.05;
    }

    // b) Children -> +5-10% (per child or total? "Children -> +5-10%")
    // We'll calculate dependent children support.
    // If wife has custody, she needs more.
    if (family.dependentChildren > 0 && family.custody === 'wife') {
        // 5% per child, capped at 10% total for simplicity in this version, 
        // or as requirement says "+5-10%". Let's do 5% per child up to 2 children.
        const childPercentage = Math.min(family.dependentChildren * 0.05, 0.10);
        childrenBonus = incomeDifference * childPercentage;
    } else if (family.dependentChildren > 0 && family.custody === 'shared') {
        // Shared custody might imply less maintenance for children, 
        // but we'll leave it as 0 bonus for now or small token? 
        // Let's stick strictly to requirement "Children -> +5-10%". 
        // We assume this applies when the recipient (wife) supports the children.
        // If husband has custody, wife doesn't get child support portion.
        childrenBonus = 0;
    }

    // c) Metro city -> +10% (Higher cost of living)
    if (cityType === 'metro') {
        cityBonus = incomeDifference * 0.10;
    } else if (cityType === 'tier-1') {
        cityBonus = incomeDifference * 0.05;
    }

    currentAmount = baseAmount + durationBonus + childrenBonus + cityBonus;

    // 3. Cap Logic / Reasonable Living Cost
    // "Cannot exceed reasonable living cost"
    // "Homemaker handling"

    let capApplied = false;
    let capReason = '';

    // Hard Cap: Maintenance generally shouldn't exceed 1/3rd to 50% of Husband's Income
    // The Supreme Court of India in *Kulbhushan Kumar vs Raj Kumari* set 25% of husband's net income as a benchmark.
    // However, total maintenance including varying factors can go higher but usually capped at 50%.

    const absoluteMaxCap = husbandIncome * 0.50;

    if (currentAmount > absoluteMaxCap) {
        currentAmount = absoluteMaxCap;
        capApplied = true;
        capReason = "Capped at 50% of Husband's Income to ensure his survivability.";
    }

    // Homemaker handling:
    // We use isWifeHomemaker to add to the note, ensuring it's used.
    let note = "Based on ~25% of income difference + modifiers for lifestyle and liabilities.";
    if (isWifeHomemaker && wifeIncome === 0) {
        note += " Considered homemaker status.";
    }

    return {
        monthlyMaintenanceAmount: Math.round(currentAmount),
        breakdown: {
            baseAmount: Math.round(baseAmount),
            modifiers: {
                duration: Math.round(durationBonus),
                children: Math.round(childrenBonus),
                city: Math.round(cityBonus),
            },
            capApplied,
            capReason
        },
        calculationNote: note
    };
};
