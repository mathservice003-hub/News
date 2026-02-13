import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
    }
});

const FEEDS = {
    EdTech: {
        rss: 'https://www.edsurge.com/news/rss',
        sourceName: 'EdSurge'
    },
    AI: {
        rss: 'https://www.technologyreview.com/feed/',
        sourceName: 'MIT Technology Review'
    },
    Robot: {
        rss: 'https://www.therobotreport.com/feed/',
        sourceName: 'The Robot Report'
    },
    Bio: {
        rss: 'https://www.statnews.com/category/pharma/feed/',
        sourceName: 'STAT News'
    }
};

const simulateAISummary = (item, category) => {
    const title = item.title || '최신 기사';
    const rawSnippet = item.contentSnippet || item.summary || item.content || '';
    const cleanSnippet = rawSnippet
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();

    const base = {
        titleKoran: `[실시간] ${title}`,
        oneLineSummary: cleanSnippet ? (cleanSnippet.length > 80 ? cleanSnippet.slice(0, 80) + '...' : cleanSnippet) : '비즈니스 핵심 요약입니다.',
        context: `${title}에 관한 글로벌 시장의 최신 트렌드 분석입니다.`,
        whyImportant: '해당 산업 지형에 중요한 변화를 가져올 수 있는 소식입니다.',
        meaningForWork: '실무 파트에서는 이 변화가 자사 전략에 미칠 영향을 검토해야 합니다.'
    };

    if (category === 'Bio') {
        base.titleKoran = `[STAT 분석] ${title}`;
        base.whyImportant = '제약 산업의 규제 지형과 기업 가치에 중대한 영향을 미칠 수 있는 STAT의 단독 보도입니다.';
        base.meaningForWork = '바이오 실무자라면 신약 승인 프로세스 및 정책 변화에 따른 리스크 대응 전략을 마련해야 합니다.';
    } else if (category === 'AI') {
        base.titleKoran = `[MIT 분석] ${title}`;
        base.whyImportant = '기술 패권과 인프라 효율성에 대한 MIT 테크놀로지 리뷰의 심층 분석입니다. 장기적 기술 로드맵 수립에 필수적입니다.';
        base.meaningForWork = 'IT 전략가는 차세대 AI 모델 도입 시 인프라 요구 사항과 데이터 보안 가이드라인을 재점검해야 합니다.';
    } else if (category === 'EdTech') {
        base.titleKoran = `[EdSurge 리포트] ${title}`;
        base.whyImportant = '교육 현장의 디지털 전환과 학습 효율성에 대한 에듀서지의 전문 리포트입니다.';
        base.meaningForWork = '에듀테크 기획자라면 사용자 상호작용 지표와 교육 정책의 변화를 서비스 설계에 반영해야 합니다.';
    }

    return base;
};

async function updateNews() {
    console.log('Starting News Update...');
    const allNews = [];

    for (const [category, config] of Object.entries(FEEDS)) {
        try {
            console.log(`Fetching ${category}...`);
            const feed = await parser.parseURL(config.rss);
            const items = feed.items.slice(0, 3).map((item, index) => {
                const summary = simulateAISummary(item, category);
                return {
                    id: `auto-${category}-${Date.now()}-${index}`,
                    category,
                    source: config.sourceName,
                    titleKoran: summary.titleKoran,
                    oneLineSummary: summary.oneLineSummary,
                    context: summary.context,
                    whyImportant: summary.whyImportant,
                    meaningForWork: summary.meaningForWork,
                    originalUrl: item.link,
                    date: new Date().toISOString().split('T')[0]
                };
            });
            allNews.push(...items);
        } catch (err) {
            console.error(`Failed to fetch ${category}:`, err.message);
        }
    }

    if (allNews.length > 0) {
        // Sort by date to keep news.json tidy if needed, though App.tsx handles it
        const filePath = path.join(process.cwd(), 'src/data/news.json');
        fs.writeFileSync(filePath, JSON.stringify(allNews, null, 2), 'utf-8');
        console.log(`Successfully updated news.json with ${allNews.length} items.`);
    }
}

updateNews();
