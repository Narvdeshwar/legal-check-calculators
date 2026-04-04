import type { Translations } from "../domain/translations";

export const us: Translations = {
    currency: "USD",
    header: {
        title: "Maintenance Estimator",
        subtitle: "US • India • Mexico • UK • Australia • Canada • Legal Check"
    },
    jurisdiction: {
        title: "Regional Jurisdiction",
        subtitle: "Select your country to apply relevant legal standards."
    },
    financials: {
        title: "Financial Details",
        subtitle: "Enter monthly income details (US).",
        husbandIncome: "Husband's Monthly Income",
        wifeIncome: "Wife's Monthly Income"
    },
    family: {
        title: "Family & Context",
        subtitle: "Duration of marriage and dependents affect the calculation.",
        marriageDuration: "Marriage Duration (Years)",
        children: "Children",
        custody: "Child Custody",
        cityType: "Area Type",
        homemaker: "Is Wife a Homemaker?",
        custodyOptions: {
            none: "Who has custody?",
            wife: "Wife",
            husband: "Husband",
            shared: "Shared"
        },
        cityOptions: {
            metro: "Major Metro",
            tier1: "Suburban",
            tier2: "Rural"
        }
    },
    result: {
        calculate: "Calculate Maintenance",
        readyTitle: "Ready to Estimate",
        readySubtitle: "Fill in the details on the left and click \"Calculate\" to see the estimated monthly maintenance amount.",
        estimatedTitle: "Estimated Monthly Maintenance",
        perMonth: "per month",
        baseAmount: "Base Amount",
        bonusDuration: "Long Marriage Bonus",
        bonusChildren: "Child Support",
        adjustmentCity: "City Adjustment",
        note: "Note:",
        howCalculated: "How this is calculated?",
        disclaimer: "Disclaimer: This is an estimation based on general application of laws. Actual court orders vary significantly case-by-case.",
        calculateAgain: "Calculate Again"
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Common queries about maintenance and alimony laws in the United States."
    }
};
