"use client"

import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import type { Region } from '../domain/types';
import type { Translations } from '../domain/translations';

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
            <button
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="text-base font-medium text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                    {question}
                </span>
                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-8">
                    {answer}
                </div>
            </div>
        </div>
    );
};

interface FAQSectionProps {
    region: Region;
    t: Translations;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ region, t }) => {
    const allFaqs: Record<Region, { question: string, answer: string }[]> = {
        india: [
            {
                question: "How is maintenance calculated in India?",
                answer: "There is no fixed formula in Indian law, but the Supreme Court (Kulbhushan Kumar vs. Raj Kumari) has set a precedent of approximately 25% of the husband's net monthly income as a reasonable amount for the wife."
            },
            {
                question: "What refers to 'Class I City' or 'Metro' in India?",
                answer: "Metro cities (like Delhi, Mumbai, Bangalore) have higher costs of living. Courts often adjust the maintenance amount to reflect the cost of living in the wife's place of residence."
            }
        ],
        us: [
            {
                question: "How is alimony calculated in the US?",
                answer: "Alimony (spousal support) varies by state. Many states use a formula like 20-30% of the difference between spouses' gross incomes, often capped at 40% of the combined income."
            },
            {
                question: "Is alimony taxable in the US?",
                answer: "Since the 2018 Tax Cuts and Jobs Act, for agreements signed after Dec 31, 2018, alimony is no longer tax-deductible for the payer nor taxable income for the recipient at the federal level."
            }
        ],
        mexico: [
            {
                question: "How does 'Alimentos' work in Mexico?",
                answer: "In Mexico, maintenance (alimentos) is based on the principle of 'proporcionalidad'—the needs of the recipient and the ability of the payer. It often ranges from 15% to 20% per dependent."
            },
            {
                question: "How long does maintenance last in Mexico?",
                answer: "Typically, it lasts for a duration equal to the length of the marriage, though it can vary based on the specific civil code of the Mexican state (e.g., CDMX vs. Jalisco)."
            }
        ],
        romania: [
            {
                question: "How is 'Pensie de întreținere' calculated in Romania?",
                answer: "In Romania, alimony for a spouse in need is limited to 1/3 of the payer's net income. For children, it's 25% for one child, 33% for two, and 50% for three or more, but the total cannot exceed half of the payer's income."
            },
            {
                question: "When does alimony end in Romania?",
                answer: "Spousal alimony usually ends upon remarriage of the recipient or after a period equal to the marriage duration (not exceeding 5 years in some cases of divorce by fault)."
            }
        ],
        ireland: [
            {
                question: "How is maintenance determined in Ireland?",
                answer: "In Ireland, maintenance is based on the 'proper provision' principle. The court considers the needs, resources, and earning capacity of both spouses and any dependent children."
            },
            {
                question: "What is the maximum limit for child maintenance in Ireland?",
                answer: "In the District Court, the maximum maintenance order is currently €150 per week per child and €500 per week for a spouse. Higher amounts can be awarded in the Circuit or High Court."
            }
        ],
        uk: [
            {
                question: "How is spousal maintenance calculated in the UK?",
                answer: "There is no set formula in England and Wales. The court calculates maintenance based on the 'needs' of the recipient and the 'ability to pay' of the payer, aiming for a fair transition to independence."
            },
            {
                question: "How long is spousal maintenance paid for in the UK?",
                answer: "It can be for a fixed term (years) or 'joint lives' (until death or remarriage). Recent trends favor 'term orders' to encourage financial independence."
            }
        ],
        canada: [
            {
                question: "What are the Spousal Support Advisory Guidelines (SSAG)?",
                answer: "The SSAG are a set of informal guidelines used across Canada to determine the range and duration of spousal support. They use formulas based on whether there are children and the length of the marriage."
            },
            {
                question: "Is spousal support taxable in Canada?",
                answer: "Yes, periodic spousal support payments are generally taxable income for the recipient and tax-deductible for the payer, provided they are made under a court order or written agreement."
            }
        ],
        australia: [
            {
                question: "How does spousal maintenance work in Australia?",
                answer: "In Australia, a person has a responsibility to financially maintain their former spouse if that person cannot meet their own reasonable expenses and their former spouse has the capacity to pay."
            },
            {
                question: "What is the time limit for claiming maintenance in Australia?",
                answer: "Applications must be made within 12 months of a divorce becoming final or within 2 years of a de facto relationship ending."
            }
        ]
    };

    const commonFaqs = [
        {
            question: "Can a working spouse claim maintenance?",
            answer: "Yes, if their income is insufficient to maintain the standard of living they were accustomed to. The court looks at the income gap between spouses."
        },
        {
            question: "Is this calculator legally binding?",
            answer: "No, this calculator provides an estimate based on common legal models. Actual maintenance is decided by the court considering conduct, assets, and liabilities."
        },
        {
            question: "How does child custody affect maintenance?",
            answer: "If one parent has primary custody, the maintenance amount typically includes a component for child support (upbringing, education, medical needs)."
        }
    ];

    const regionFaqs = allFaqs[region] || allFaqs.india;
    const faqs = [...regionFaqs, ...commonFaqs];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <section className="mt-12 w-full mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {t.faq.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                    {t.faq.subtitle}
                </p>
            </div>

            <Card>
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </Card>
        </section>
    );
};
