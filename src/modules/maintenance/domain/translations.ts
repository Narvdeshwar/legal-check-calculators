import type { Region } from './types';

export interface Translations {
    header: {
        title: string;
        subtitle: string;
    };
    jurisdiction: {
        title: string;
        subtitle: string;
    };
    financials: {
        title: string;
        subtitle: string;
        husbandIncome: string;
        wifeIncome: string;
    };
    family: {
        title: string;
        subtitle: string;
        marriageDuration: string;
        children: string;
        custody: string;
        cityType: string;
        homemaker: string;
        custodyOptions: {
            none: string;
            wife: string;
            husband: string;
            shared: string;
        };
        cityOptions: {
            metro: string;
            tier1: string;
            tier2: string;
        };
    };
    result: {
        calculate: string;
        readyTitle: string;
        readySubtitle: string;
        estimatedTitle: string;
        perMonth: string;
        baseAmount: string;
        bonusDuration: string;
        bonusChildren: string;
        adjustmentCity: string;
        note: string;
        howCalculated: string;
        disclaimer: string;
        calculateAgain: string;
    };
    faq: {
        title: string;
        subtitle: string;
    };
}

export const translations: Record<Region, Translations> = {
    us: {
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
    },
    india: {
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
            subtitle: "Enter monthly income details (INDIA).",
            husbandIncome: "Husband's Monthly Income",
            wifeIncome: "Wife's Monthly Income"
        },
        family: {
            title: "Family & Context",
            subtitle: "Duration of marriage and dependents affect the calculation.",
            marriageDuration: "Marriage Duration (Years)",
            children: "Children",
            custody: "Child Custody",
            cityType: "City Type",
            homemaker: "Is Wife a Homemaker?",
            custodyOptions: {
                none: "Who has custody?",
                wife: "Wife",
                husband: "Husband",
                shared: "Shared"
            },
            cityOptions: {
                metro: "Metro City (Tier 1)",
                tier1: "Tier 2 City",
                tier2: "Rural / Small Town"
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
            subtitle: "Common queries about maintenance and alimony laws in India."
        }
    },
    mexico: {
        header: {
            title: "Estimador de Pensión",
            subtitle: "EE. UU. • India • México • Reino Unido • Australia • Canadá • Control Legal"
        },
        jurisdiction: {
            title: "Jurisdicción Regional",
            subtitle: "Selecciona tu país para aplicar los estándares legales correspondientes."
        },
        financials: {
            title: "Detalles Financieros",
            subtitle: "Ingresa los detalles de ingresos mensuales (MÉXICO).",
            husbandIncome: "Ingreso Mensual del Esposo",
            wifeIncome: "Ingreso Mensual de la Esposa"
        },
        family: {
            title: "Familia y Contexto",
            subtitle: "La duración del matrimonio y los dependientes afectan el cálculo.",
            marriageDuration: "Duración del Matrimonio (Años)",
            children: "Hijos",
            custody: "Custodia de los Hijos",
            cityType: "Tipo de Ciudad",
            homemaker: "¿La esposa es ama de casa?",
            custodyOptions: {
                none: "¿Quién tiene la custodia?",
                wife: "Esposa",
                husband: "Esposo",
                shared: "Compartida"
            },
            cityOptions: {
                metro: "Ciudad Metropolitana",
                tier1: "Ciudad Mediana",
                tier2: "Zona Rural"
            }
        },
        result: {
            calculate: "Calcular Pensión",
            readyTitle: "Listo para Estimar",
            readySubtitle: "Completa los detalles a la izquierda y haz clic en \"Calcular\" para ver el monto mensual estimado.",
            estimatedTitle: "Pensión Mensual Estimada",
            perMonth: "por mes",
            baseAmount: "Monto Base",
            bonusDuration: "Bono por Matrimonio Largo",
            bonusChildren: "Soporte para Hijos",
            adjustmentCity: "Ajuste por Ciudad",
            note: "Nota:",
            howCalculated: "¿Cómo se calcula esto?",
            disclaimer: "Descargo de responsabilidad: Esta es una estimación basada en la aplicación general de las leyes. Las órdenes judiciales reales varían significativamente caso por caso.",
            calculateAgain: "Calcular de Nuevo"
        },
        faq: {
            title: "Preguntas Frecuentes",
            subtitle: "Consultas comunes sobre las leyes de pensión alimenticia y mantenimiento en México."
        }
    },
    romania: {
        header: {
            title: "Calculator Pensie Alimentară",
            subtitle: "SUA • India • Mexic • Regatul Unit • Australia • Canada • Control Legal"
        },
        jurisdiction: {
            title: "Jurisdicție Regională",
            subtitle: "Selectați țara pentru a aplica standardele legale relevante."
        },
        financials: {
            title: "Detalii Financiare",
            subtitle: "Introduceți detaliile veniturilor lunare (ROMÂNIA).",
            husbandIncome: "Venitul Lunar al Soțului",
            wifeIncome: "Venitul Lunar al Soției"
        },
        family: {
            title: "Familie și Context",
            subtitle: "Durata căsătoriei și persoanele în întreținere afectează calculul.",
            marriageDuration: "Durata Căsătoriei (Ani)",
            children: "Copii",
            custody: "Custodia Copiilor",
            cityType: "Tipul Orașului",
            homemaker: "Soția este Casnică?",
            custodyOptions: {
                none: "Cine are custodia?",
                wife: "Soția",
                husband: "Soțul",
                shared: "Comună"
            },
            cityOptions: {
                metro: "Metropolă",
                tier1: "Oraș Mediu",
                tier2: "Zonă Rurală"
            }
        },
        result: {
            calculate: "Calculează Pensia",
            readyTitle: "Gata de Estimare",
            readySubtitle: "Completați detaliile din stânga și faceți clic pe \"Calculează\" pentru a vedea suma lunară estimată.",
            estimatedTitle: "Pensie Lunară Estimată",
            perMonth: "pe lună",
            baseAmount: "Sumă de Bază",
            bonusDuration: "Bonus Căsătorie Lungă",
            bonusChildren: "Suport pentru Copii",
            adjustmentCity: "Ajustare Oraș",
            note: "Notă:",
            howCalculated: "Cum se calculează?",
            disclaimer: "Exonerarea de răspundere: Aceasta este o estimare bazată pe aplicarea generală a legilor. Deciziile judecătorești reale variază semnificativ de la caz la caz.",
            calculateAgain: "Calculează din nou"
        },
        faq: {
            title: "Întrebări Frecvente",
            subtitle: "Întrebări comune despre legile privind pensia alimentară în România."
        }
    },
    ireland: {
        header: {
            title: "Maintenance Estimator",
            subtitle: "UK • Australia • Canada • US • India • Mexico • Ireland • Legal Check"
        },
        jurisdiction: {
            title: "Regional Jurisdiction",
            subtitle: "Select your country to apply relevant legal standards."
        },
        financials: {
            title: "Financial Details",
            subtitle: "Enter monthly income details (IRELAND).",
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
                metro: "Major Urban Area",
                tier1: "Town",
                tier2: "Rural Area"
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
            subtitle: "Common queries about maintenance and alimony laws in Ireland."
        }
    },
    uk: {
        header: {
            title: "Maintenance Estimator",
            subtitle: "UK • Australia • Canada • US • India • Mexico • Ireland • Legal Check"
        },
        jurisdiction: {
            title: "Regional Jurisdiction",
            subtitle: "Select your country to apply relevant legal standards."
        },
        financials: {
            title: "Financial Details",
            subtitle: "Enter monthly income details (UK).",
            husbandIncome: "Husband's Monthly Income",
            wifeIncome: "Wife's Monthly Income"
        },
        family: {
            title: "Family & Context",
            subtitle: "Duration of marriage and dependents affect the calculation.",
            marriageDuration: "Marriage Duration (Years)",
            children: "Children",
            custody: "Child Custody",
            cityType: "Location Type",
            homemaker: "Is Wife a Homemaker?",
            custodyOptions: {
                none: "Who has custody?",
                wife: "Wife",
                husband: "Husband",
                shared: "Shared"
            },
            cityOptions: {
                metro: "London / Major City",
                tier1: "Town / Suburban",
                tier2: "Rural Area"
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
            disclaimer: "Disclaimer: In the UK, no fixed formula exists; courts rule based on 'needs' and 'fairness'. This is a rough estimation only.",
            calculateAgain: "Calculate Again"
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Common queries about maintenance and alimony laws in the United Kingdom."
        }
    },
    canada: {
        header: {
            title: "Maintenance Estimator",
            subtitle: "Canada • UK • Australia • US • India • Mexico • Ireland • Legal Check"
        },
        jurisdiction: {
            title: "Regional Jurisdiction",
            subtitle: "Select your country to apply relevant legal standards."
        },
        financials: {
            title: "Financial Details",
            subtitle: "Enter monthly income details (CANADA).",
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
                metro: "Major City (e.g. Toronto)",
                tier1: "Mid-sized City",
                tier2: "Rural Area"
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
            disclaimer: "Disclaimer: This estimation uses a model consistent with the Spousal Support Advisory Guidelines (SSAG). Actual outcomes depend on case specifics.",
            calculateAgain: "Calculate Again"
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Common queries about maintenance and alimony laws in Canada."
        }
    },
    australia: {
        header: {
            title: "Maintenance Estimator",
            subtitle: "Australia • Canada • UK • US • India • Mexico • Ireland • Legal Check"
        },
        jurisdiction: {
            title: "Regional Jurisdiction",
            subtitle: "Select your country to apply relevant legal standards."
        },
        financials: {
            title: "Financial Details",
            subtitle: "Enter monthly income details (AUSTRALIA).",
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
                metro: "Major City (e.g. Sydney)",
                tier1: "Regional City",
                tier2: "Rural / Outskirts"
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
            disclaimer: "Disclaimer: Australian law focuses on 'needs' and 'capacity'. This estimate provides a general model of expected results.",
            calculateAgain: "Calculate Again"
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Common queries about maintenance and alimony laws in Australia."
        }
    }
};
