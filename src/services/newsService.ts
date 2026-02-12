import type { NewsItem } from '../data/mockData';
import initialNewsData from '../data/news.json';

const PROXY_URL = 'https://api.allorigins.win/raw?url=';

const FEEDS = {
    EdTech: {
        rss: 'https://www.edsurge.com/news/rss',
        base: 'https://www.edsurge.com',
        sourceName: 'EdSurge'
    },
    AI: {
        rss: 'https://www.technologyreview.com/feed/',
        base: 'https://www.technologyreview.com',
        sourceName: 'MIT Technology Review'
    },
    Robot: {
        rss: 'https://www.therobotreport.com/feed/',
        base: 'https://www.therobotreport.com',
        sourceName: 'The Robot Report'
    },
    Bio: {
        rss: 'https://www.statnews.com/category/pharma/feed/',
        base: 'https://www.statnews.com',
        sourceName: 'STAT News'
    }
};

const CATEGORY_MAP: Record<string, string> = {
    'AI': 'AI',
    'Robot': 'Robot',
    'Bio': 'Bio',
    'EdTech': 'EdTech'
};

const simulateAISummary = (item: any, category: string): Partial<NewsItem> => {
    const title = item.title || '최신 기사';

    const rawSnippet = item.contentSnippet || item.summary || item.content || '';
    const cleanSnippet = rawSnippet
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Custom logic for STAT News (Bio)
    if (category === 'Bio') {
        return {
            titleKoran: `[STAT 분석] ${title}`,
            oneLineSummary: cleanSnippet ? (cleanSnippet.length > 80 ? cleanSnippet.slice(0, 80) + '...' : cleanSnippet) : '제약 산업의 거시적 변화와 기업 가치에 대한 STAT의 심층 보도입니다.',
            context: `${title}에 관한 STAT News의 최신 비즈니스 인사이트입니다.`,
            whyImportant: '이 소식은 제약 산업의 규제 지형과 시장 점유율, 그리고 관련 기업들의 장기적인 밸류에이션에 중대한 영향을 미칠 수 있습니다.',
            meaningForWork: '제약 및 바이오 분야 실무자라면 신약 승인 거절 시나리오 및 정책 변화에 따른 리스크를 사전에 분석하고 대응 전략을 마련해야 합니다.',
        };
    }

    // Custom logic for EdSurge (EdTech)
    if (category === 'EdTech') {
        return {
            titleKoran: `[EdSurge 리포트] ${title}`,
            oneLineSummary: cleanSnippet ? (cleanSnippet.length > 80 ? cleanSnippet.slice(0, 80) + '...' : cleanSnippet) : '글로벌 에듀테크 트렌드와 교육 현장의 변화에 대한 EdSurge의 전문 보도입니다.',
            context: `${title}에 관한 EdSurge의 최신 교육 기술 트렌드 분석입니다.`,
            whyImportant: '교육과 기술의 결합이 학습 효율과 미래 인재상에 미치는 영향이 매우 크기 때문에 주목해야 합니다.',
            meaningForWork: '교육 기획 및 서비스 실무자라면 해당 기술이 실제 학습 환경에 미칠 긍정적/부정적 영향을 입체적으로 검토해야 합니다.',
        };
    }

    // Custom logic for MIT Technology Review (AI)
    if (category === 'AI') {
        return {
            titleKoran: `[MIT 분석] ${title}`,
            oneLineSummary: cleanSnippet ? (cleanSnippet.length > 80 ? cleanSnippet.slice(0, 80) + '...' : cleanSnippet) : '인공지능 기술의 미래와 사회적 영향에 대한 MIT 테크놀로지 리뷰의 권위 있는 분석입니다.',
            context: `${title}에 관한 MIT 테크놀로지 리뷰의 최신 AI 기술 트렌드 심층 보도입니다.`,
            whyImportant: '이 기술의 발전 방향이 정보 기술 생태계와 국가별 기술 주권에 중대한 변곡점이 될 수 있기 때문입니다.',
            meaningForWork: 'IT 전략 기획자나 기술 실무자라면 해당 기술의 상용화 로드맵과 인프라 효율성을 자사 서비스에 투영하여 전략을 재수립해야 합니다.',
        };
    }

    return {
        titleKoran: `[실시간] ${title}`,
        oneLineSummary: cleanSnippet ? (cleanSnippet.length > 80 ? cleanSnippet.slice(0, 80) + '...' : cleanSnippet) : '직장인을 위한 핵심 비즈니스 요약입니다.',
        context: `${title}에 관한 글로벌 시장의 최신 트렌드와 상세 분석 뉴스입니다.`,
        whyImportant: '해당 기술이나 정책이 산업 구조에 미치는 영향이 매우 크기 때문에 주목해야 합니다.',
        meaningForWork: '실무 파트에서는 이와 같은 변화가 업무 프로세스나 신규 사업 전략에 미칠 영향을 검토해야 합니다.',
    };
};

export const fetchLatestNews = async (category: string): Promise<NewsItem[]> => {
    try {
        const feedConfig = FEEDS[category as keyof typeof FEEDS];
        if (!feedConfig) return [];

        const response = await fetch(PROXY_URL + encodeURIComponent(feedConfig.rss), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const xml = await response.text();

        const Parser = (await import('rss-parser')).default;
        const parser = new Parser();
        const feed = await parser.parseString(xml);

        return feed.items.slice(0, 5).map((item, index) => {
            const summary = simulateAISummary(item, category);

            let finalUrl = item.link || item.guid || '';

            if (finalUrl) {
                finalUrl = finalUrl.trim();
                if (finalUrl.startsWith('//')) {
                    finalUrl = `https:${finalUrl}`;
                } else if (finalUrl.startsWith('/')) {
                    finalUrl = `${feedConfig.base}${finalUrl}`;
                } else if (!finalUrl.startsWith('http')) {
                    const separator = finalUrl.startsWith('/') ? '' : '/';
                    finalUrl = `${feedConfig.base}${separator}${finalUrl}`;
                }
            }

            return {
                id: `realtime-${category}-${Date.now()}-${index}`,
                category: category as 'AI' | 'Robot' | 'Bio' | 'EdTech',
                source: feedConfig.sourceName,
                titleKoran: summary.titleKoran || '[제목 없음]',
                oneLineSummary: summary.oneLineSummary || '[요약 없음]',
                context: summary.context || '[내용 없음]',
                whyImportant: summary.whyImportant || '[중요성 정보 없음]',
                meaningForWork: summary.meaningForWork || '[실무 의미 정보 없음]',
                originalUrl: finalUrl,
                date: new Date(item.pubDate || Date.now()).toISOString().split('T')[0],
            };
        });
    } catch (error) {
        console.error(`Fetch Error (${category}):`, error);
        const mappedCategory = CATEGORY_MAP[category] || category;
        return (initialNewsData as any[]).filter(item => item.category === mappedCategory).slice(0, 3);
    }
};
