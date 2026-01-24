export type CityType = 'metro' | 'tier-1' | 'tier-2-rural';

export interface IncomeDetails {
    husbandMonthlyIncome: number;
    wifeMonthlyIncome: number;
}

export interface FamilyDetails {
    marriageDurationYears: number;
    dependentChildren: number;
    custody: 'husband' | 'wife' | 'shared' | 'none';
}

export interface CalculatorInput {
    income: IncomeDetails;
    family: FamilyDetails;
    cityType: CityType;
    isWifeHomemaker: boolean;
}

export interface CalculationResult {
    monthlyMaintenanceAmount: number;
    breakdown: {
        baseAmount: number;
        modifiers: {
            duration: number;
            children: number;
            city: number;
        };
        capApplied: boolean;
        capReason?: string;
    };
    calculationNote: string;
}
