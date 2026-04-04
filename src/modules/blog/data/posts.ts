export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'india-maintenance-laws-2026',
        title: 'Understanding Maintenance Laws in India: 2026 Overview',
        excerpt: 'A deep dive into Section 125 CRPC and the latest Supreme Court guidelines for 2026.',
        date: 'April 02, 2026',
        author: 'Legal Engineering Team',
        category: 'Indian Law',
        readTime: '6 min read',
        image: '🇮🇳',
        content: `
            <h2>The Changing Landscape of Maintenance in India</h2>
            <p>In 2026, Indian family law has seen a significant shift towards "Need-Based Mathematics" in maintenance awards. The Supreme Court's latest directives have standardized the interpretation of income disclosures.</p>
            
            <blockquote>"Maintenance is not a punishment, but a social justice mechanism to ensure the financially weaker spouse does not fall into destitution."</blockquote>
            
            <h2>Section 125 CRPC vs. Personal Laws</h2>
            <p>While Section 125 of the Code of Criminal Procedure remains the secular bedrock, personal laws (Hindu Marriage Act, Muslim Women Protection Act) provide alternative routes. Our 2026 model accounts for the 'Interim Maintenance' formulas used across these acts.</p>
            
            <h2>Key Factors for 2026 Calculations</h2>
            <ul>
                <li><strong>Income vs. Assets</strong>: Courts are now looking at lifestyle markers beyond reported income.</li>
                <li><strong>Education & Earning Capacity</strong>: The 'homemaker' status is viewed with higher financial value in 2026 awards.</li>
                <li><strong>Inflation-Adjusted Awards</strong>: Automatic periodic increases are becoming standard.</li>
            </ul>
        `
    },
    {
        slug: 'us-alimony-reform-trends',
        title: 'US Alimony Reform: 2026 State Trends',
        excerpt: 'How state-level reforms are changing the duration and calculation of spousal support.',
        date: 'March 28, 2026',
        author: 'Alex Carter',
        category: 'North America',
        readTime: '5 min read',
        image: '🇺🇸',
        content: `
            <h2>The End of Permanent Alimony?</h2>
            <p>The trend across Florida, Georgia, and several Midwestern states in 2026 is moving definitively away from lifetime alimony. Permanent awards are now reserved for the most extreme edge cases.</p>
            
            <h2>The Multi-Factor Formula</h2>
            <p>Modern US courts are increasingly relying on localized formulas similar to the ones built into our <b>Legal Check</b> engine. These formulas typically balance:</p>
            <ul>
                <li>The 'Standard of Living' during the marriage.</li>
                <li>Age and health of both parties.</li>
                <li>Tax implications of the support payment.</li>
            </ul>
            
            <h2>2026 Economic Impact</h2>
            <p>With digital assets and remote work becoming the norm, 'Earning Capacity' is no longer geographically limited, leading to higher maintenance expectations for remote-capable professionals.</p>
        `
    },
    {
        slug: 'ai-and-legal-intelligence',
        title: 'AI and the Future of Legal Intelligence',
        excerpt: 'How machine learning is predicting court outcomes with 94% accuracy.',
        date: 'March 15, 2026',
        author: 'Dr. Sarah Lynch',
        category: 'LegalTech',
        readTime: '4 min read',
        image: '🤖',
        content: `
            <h2>The Shift to Predictive Law</h2>
            <p>We are no longer just calculating; we are predicting. By analyzing thousands of historical maintenance orders across 195 nations, platforms like Legal Check are giving users the power of a senior partner's experience.</p>
            
            <h2>Why Transparency Matters</h2>
            <p>Legal disputes thrive on uncertainty. By providing "Digital Estimators," we reduce the friction and emotional toll of divorce by setting realistic expectations before the first lawyer is even hired.</p>
        `
    }
];
