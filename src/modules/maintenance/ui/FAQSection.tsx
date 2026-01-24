import React, { useState } from 'react';
import { Card } from '../../../shared/ui/Card';

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

export const FAQSection: React.FC = () => {
    const faqs = [
        {
            question: "How is maintenance calculated in India?",
            answer: "There is no fixed formula in Indian law, but the Supreme Court (Kulbhushan Kumar vs. Raj Kumari) has set a precedent of approximately 25% of the husband's net monthly income as a reasonable amount for the wife. The court also considers the husband's liabilities and standard of living."
        },
        {
            question: "Can a working wife claim maintenance?",
            answer: "Yes, a working wife can claim maintenance if her income is insufficient to maintain the standard of living she was accustomed to in her matrimonial home. The court looks at the income gap between spouses."
        },
        {
            question: "Is this calculator legally binding?",
            answer: "No, this calculator provides an estimate based on common legal precedents (like the 25% rule). Actual maintenance is decided by the court on a case-to-case basis considering many factors like conduct, assets, liabilities, and family responsibilities."
        },
        {
            question: "What refers to 'Class I City' or 'Metro'?",
            answer: "Living costs vary by city. Metro cities (like Delhi, Mumbai, Bangalore) have higher costs of living compared to Tier-2 cities or rural areas. Courts often adjust the maintenance amount to reflect the cost of living in the wife's place of residence."
        },
        {
            question: "Does child custody affect maintenance?",
            answer: "Absolutely. If the wife has custody of minor children, the maintenance amount will include a component for the child's upbringing, education, and medical needs, separate from or in addition to spousal maintenance."
        }
    ];

    return (
        <section className="mt-12 w-full mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Frequently Asked Questions
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                    Common queries about maintenance and alimony laws in India.
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
