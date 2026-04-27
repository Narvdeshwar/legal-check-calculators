import { MetadataRoute } from 'next';
import { translations } from '@/modules/maintenance/domain/translations';
import { blogPosts } from '@/modules/blog/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://legal-check-calculators.vercel.app';
    const regions = Object.keys(translations);

    const regionUrls = regions.map((region) => ({
        url: `${baseUrl}/${region}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const blogUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms',
        '/disclaimer',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.5,
    }));

    return [...staticPages, ...regionUrls, ...blogUrls];
}
