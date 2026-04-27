export type Region = 'india' | 'us' | 'mexico' | 'romania' | 'ireland' | 'uk' | 'canada' | 'australia' | 'pakistan' | 'germany' | 'switzerland';
export type CityType = 'metro' | 'tier-1' | 'tier-2-rural';

export interface IncomeDetails {
    husbandMonthlyIncome: number;
    wifeMonthlyIncome: number;
}

export interface CalculatorInput {
    region: Region;
    subRegion?: string;
    income: IncomeDetails;
    family: FamilyDetails;
    cityType: CityType;
    isWifeHomemaker: boolean;
}

export interface FamilyDetails {
    marriageDurationYears: number;
    dependentChildren: number;
    custody: 'none' | 'wife' | 'husband' | 'shared';
    childEducationMonthlyCost?: number;
}

export interface CalculationResult {
    monthlyMaintenanceAmount: number;
    currencySymbol: string;
    legalContext: string;
    breakdown: {
        baseAmount: number;
        modifiers: {
            duration: number;
            children: number;
            city: number;
            childEducation?: number;
        };
        capApplied: boolean;
        capReason?: string;
    };
    calculationNote: string;
}
