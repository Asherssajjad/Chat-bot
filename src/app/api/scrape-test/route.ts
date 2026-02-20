import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove unnecessary elements
        $('script, style, noscript, iframe, svg, nav, footer, header').remove();

        // Extract Text
        // Only get text from paragraphs, headings, and lists to make it cleaner
        const textBlocks: string[] = [];
        $('p, h1, h2, h3, h4, h5, h6, li, td, th').each((_, el) => {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            if (text.length > 20) { // Ignore very short fragments
                textBlocks.push(text);
            }
        });

        // Deduplicate and join text
        const uniqueTextBlocks = Array.from(new Set(textBlocks));
        const combinedText = uniqueTextBlocks.join(' \n\n ');

        // Extract Images
        const images: { src: string, alt: string }[] = [];
        $('img').each((_, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            const alt = $(el).attr('alt');

            if (src && src.startsWith('http')) {
                // Ignore tiny tracking pixels or icons based on likely paths
                if (!src.includes('pixel') && !src.includes('icon') && !src.includes('logo')) {
                    images.push({ src, alt: alt || 'No description' });
                }
            }
        });

        // Make images unique by src
        const uniqueImagesMap = new Map();
        for (const img of images) {
            if (!uniqueImagesMap.has(img.src)) {
                uniqueImagesMap.set(img.src, img);
            }
        }
        const uniqueImages = Array.from(uniqueImagesMap.values());

        return NextResponse.json({
            success: true,
            data: {
                url,
                title: $('title').text().trim(),
                textPreview: combinedText.slice(0, 1000) + (combinedText.length > 1000 ? '...' : ''),
                fullText: combinedText,
                textLength: combinedText.length,
                images: uniqueImages,
                imageCount: uniqueImages.length
            }
        });

    } catch (error: any) {
        console.error("Scraper Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Scraping failed' },
            { status: 500 }
        );
    }
}
