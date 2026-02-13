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

    const shortSummary = cleanSnippet ? (cleanSnippet.length > 120 ? cleanSnippet.slice(0, 120) + '...' : cleanSnippet) : '글로벌 시장의 핵심 동향을 담은 최신 소식입니다.';

    const base = {
        titleKoran: `[실시간] ${title}`,
        oneLineSummary: shortSummary,
        context: `${title}에 관한 심층적인 시장 분석 및 동향 리포트입니다.`,
        whyImportant: '해당 산업의 기술적 진보와 시장 재편에 중대한 변곡점이 될 수 있는 소식이기 때문에 주목해야 합니다.',
        meaningForWork: '관련 분야 실무자라면 이 변화가 자사 서비스의 로드맵이나 운영 전략에 미칠 영향을 즉각 검토하고 대응책을 마련해야 합니다.'
    };

    // Specific logic to make automated summaries feel less generic
    if (category === 'Bio') {
        base.titleKoran = `[STAT 분석] ${title}`;
        base.whyImportant = '규제 기관의 승인 방향과 신약 파이프라인의 가치 평가에 직접적인 영향을 주는 STAT의 단독 분석입니다.';
        base.meaningForWork = '임상 및 인허가 담당자는 이 사례가 자사 파이프라인의 전략 수립에 주는 시사점을 분석하고 안전성 데이터를 재점검해야 합니다.';
    } else if (category === 'AI') {
        base.titleKoran = `[MIT 분석] ${title}`;
        base.whyImportant = '인공지능 모델의 성능 한계 돌파나 보안상의 새로운 취약점 발견 등 기술적 임팩트가 매우 큰 보도입니다.';
        base.meaningForWork = 'AI 서비스 기획자라면 차세대 모델 도입 시 고려해야 할 인프라 효율성이나 프롬프트 가드레킹 강화 방안을 검토해야 합니다.';
    } else if (category === 'EdTech') {
        base.titleKoran = `[EdSurge 리포트] ${title}`;
        base.whyImportant = '디지털 학습 환경의 변화와 학생들의 학습 성과에 미치는 실질적인 임팩트를 다룬 에듀서지의 전문 리포트입니다.';
        base.meaningForWork = '에듀테크 기획자라면 사용자 경험(UX) 설계 시 학습 지속성을 높이기 위한 상호작용 요소를 어떻게 개선할지 고민해야 합니다.';
    } else if (category === 'Robot') {
        base.titleKoran = `[Robot Report] ${title}`;
        base.whyImportant = '로봇의 자율 주행 능력이나 인간과의 협업 안전성 등 산업 현장의 자동화 수준을 한 단계 높이는 중요한 기술적 성과입니다.';
        base.meaningForWork = '현장 자동화 책임자라면 실제 도입 시 환경적 제약 사항과 안전 센서의 신뢰도를 바탕으로 ROI를 재평가해야 합니다.';
    }

    return base;
};

async function updateNews() {
    console.log('Starting News Update...');
    let allNews = [];

    for (const [category, config] of Object.entries(FEEDS)) {
        try {
            console.log(`Fetching ${category}...`);
            const feed = await parser.parseURL(config.rss);
            // Fetch more items initially to ensure we have valid ones
            const items = feed.items.slice(0, 10).map((item, index) => {
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
                    originalUrl: item.link || item.guid,
                    date: new Date(item.pubDate || Date.now()).toISOString().split('T')[0]
                };
            });
            // We only need the top 3 per category for the final JSON to keep it light
            allNews.push(...items.slice(0, 3));
        } catch (err) {
            console.error(`Failed to fetch ${category}:`, err.message);
        }
    }

    if (allNews.length > 0) {
        // Ensure consistent formatting
        const filePath = path.join(process.cwd(), 'src/data/news.json');
        fs.writeFileSync(filePath, JSON.stringify(allNews, null, 2), 'utf-8');
        console.log(`Successfully updated news.json with ${allNews.length} items.`);
    }
}

updateNews();
