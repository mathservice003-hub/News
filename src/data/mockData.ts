export interface NewsItem {
    id: string;
    category: 'AI' | 'Robot' | 'Bio' | 'EdTech';
    source: string;
    titleKoran: string;
    oneLineSummary: string;
    context: string;
    whyImportant: string;
    meaningForWork: string;
    originalUrl: string;
    date: string;
}

// Helper to get relative dates based on current system time (2026-02-12)
const getRelativeDate = (offsetDays = 0) => {
    const date = new Date('2026-02-12');
    date.setDate(date.getDate() - offsetDays);
    return date.toISOString().split('T')[0];
};

export const mockNews: NewsItem[] = [
    // --- AI Category ---
    {
        id: 'ai-2026-1',
        category: 'AI',
        source: 'MIT Technology Review',
        titleKoran: '2026년 10대 돌파구 기술 발표: 하이퍼스케일 AI 데이터 센터의 급부상',
        oneLineSummary: 'MIT 테크 리뷰가 선정한 2026년 혁신 기술 중 차세대 AI 엔진을 위한 거대 인프라가 핵심으로 꼽혀',
        context: 'MIT 테크놀로지 리뷰는 창간 25주년을 맞아 2026년 세상을 바꿀 10대 기술을 발표했습니다. 특히 AI 컴패니언과 상업용 우주 정거장 등이 함께 이름을 올렸습니다.',
        whyImportant: '단순한 소프트웨어 개발을 넘어 에너지 인프라와 하드웨어 거대화가 AI 경쟁의 본질로 변하고 있음을 시사합니다.',
        meaningForWork: 'IT 및 전략 기획자라면 AI 도입 비용 구조에서 인프라와 에너지 효율이 차지하는 비중이 점점 커질 것임을 고려하여 장기 전략을 세워야 합니다.',
        originalUrl: 'https://www.technologyreview.com/2026/01/08/1105151/10-breakthrough-technologies-2026/',
        date: '2026-02-10'
    },
    {
        id: 'ai-2026-2',
        category: 'AI',
        source: 'MarketingProfs',
        titleKoran: 'OpenAI 프론티어 및 앤스로픽 클로드 4.6 출시: 플랫폼 경쟁 점입가경',
        oneLineSummary: '주요 AI 기업들의 차세대 모델 대격돌로 AI가 단순 도구에서 비즈니스 핵심 운영 체제로 진화',
        context: '2026년 2월 6일 보고에 따르면 OpenAI의 프론티어와 앤스로픽의 클로드 4.6이 동시에 시장에 충격을 주며, 모델 성능 경쟁이 아닌 비즈니스 통합 플랫폼 경쟁으로 이동하고 있습니다.',
        whyImportant: '기업들이 어떤 AI 생태계를 선택하느냐에 따라 향후 10년의 운영 효율이 결정될 수 있는 중대한 전환점입니다.',
        meaningForWork: '마케팅 및 운영 실무자들은 개별 AI 툴 사용법보다, 회사 메인 시스템과의 API 통합 및 데이터 흐름 설계에 더 집중해야 합니다.',
        originalUrl: 'https://www.marketingprofs.com/articles/2026/51234/ai-update-february-2026',
        date: '2026-02-06'
    },
    {
        id: 'ai-2026-3',
        category: 'AI',
        source: 'SME Magazine',
        titleKoran: '창업자 3명 중 1명, "2026년 AI 도입으로 인력 감축 계획"',
        oneLineSummary: 'AI를 통한 자동화가 고도화됨에 따라 단순 업무 직무의 소멸이 현실화되는 중',
        context: '2026년 2월 11일 설문 등에 따르면, 글로벌 창업자들의 33%가 AI 도입을 성공적으로 마치며 인력 구조 조정 및 직무 재편을 계획하고 있다고 답했습니다.',
        whyImportant: '기술 혁신이 실질적인 고용 구조 변화로 이어지는 단계입니다. 단순 반복 업무보다는 AI가 할 수 없는 창의적 기획의 가치가 극대화됩니다.',
        meaningForWork: '모든 직장인은 자신의 업무 중 어느 부분이 AI로 자동화될 수 있는지 파악하고, AI를 관리하거나 설계하는 고차원 업무로 이동을 준비해야 합니다.',
        originalUrl: 'https://www.smeweb.com/2026/02/11/founders-plan-job-cuts-due-to-ai/',
        date: '2026-02-11'
    },

    // --- Robot Category ---
    {
        id: 'robot-2026-1',
        category: 'Robot',
        source: 'The Robot Report',
        titleKoran: '앱트로닉, 아폴로 휴머노이드 개발 위해 10억 달러 투자 유치',
        oneLineSummary: '산업용 휴머노이드 로봇 시장의 선두주자 앱트로닉이 대규모 펀딩으로 양산 체제 돌입',
        context: '2026년 2월 10일, 앱트로닉(Apptronik)은 아폴로 휴머노이드 로봇의 고도화와 대량 생산을 위해 약 10억 달러 규모의 투자 유치에 성공했다고 발표했습니다.',
        whyImportant: '휴머노이드 로봇이 연구실을 넘어 실제 산업 현장의 노동력 부족을 해결하는 실질적인 솔루션으로 자리 잡고 있음을 증명하는 사건입니다.',
        meaningForWork: '제조 및 물류 분야 실무자라면 인간의 복잡한 노동을 대체하는 휴머노이드 배치의 경제성을 검토하기 시작해야 할 시점입니다.',
        originalUrl: 'https://www.therobotreport.com/apptronik-raises-nearly-1-billion-for-apollo-humanoid-robot/',
        date: '2026-02-10'
    },
    {
        id: 'robot-2026-2',
        category: 'Robot',
        source: 'The Robot Report',
        titleKoran: '보스턴 다이내믹스 CEO 로버트 플레이터 사임: 새로운 리더십 체제 가동',
        oneLineSummary: '로봇 산업의 상징적 인물 사임으로 보스턴 다이내믹스의 상업화 전략 변화 예고',
        context: '2026년 2월 10일, 보스턴 다이내믹스는 로버트 플레이터 CEO의 사임을 공식화하고 아만다 맥마스터 임시 CEO 체제로 전환한다고 밝혔습니다.',
        whyImportant: '기술 중심 회사에서 수익성 중심의 상업적 로봇 기업으로 변모하려는 현대차 그룹의 의중이 반영된 것으로 풀이됩니다.',
        meaningForWork: '로봇 비즈니스에 관심 있는 전략가라면 기술적 화려함보다 실제 시장에 팔리는 "제품으로서의 로봇" 경쟁에 주목해야 합니다.',
        originalUrl: 'https://www.therobotreport.com/boston-dynamics-ceo-robert-playter-steps-down/',
        date: '2026-02-10'
    },
    {
        id: 'robot-2026-3',
        category: 'Robot',
        source: 'The Robot Report',
        titleKoran: 'LimX Dynamics, 휴머노이드 확장 위해 2억 달러 규모 시리즈 B 유치',
        oneLineSummary: '다이나믹한 보행 능력을 가진 휴머노이드 로봇의 시장 출시를 앞당기기 위한 자금 확보',
        context: '2026년 2월 4일 보도에 따르면 LimX Dynamics가 2억 달러 규모의 투자를 유치하며 휴머노이드 로봇의 R&D 및 글로벌 시장 확장을 가속화하고 있습니다.',
        whyImportant: '미국계 기업뿐만 아니라 글로벌 전역에서 기능성 휴머노이드 개발 경쟁이 치열해지고 있음을 시사합니다.',
        meaningForWork: '로봇 기술 도입을 고려하는 기업이라면 다양한 제조사의 로봇 성능과 가격을 비교 분석할 수 있는 역량을 갖추어야 합니다.',
        originalUrl: 'https://www.therobotreport.com/limx-dynamics-raises-200m-for-humanoid/',
        date: '2026-02-04'
    },

    // --- Bio Category ---
    {
        id: 'bio-2026-1',
        category: 'Bio',
        source: 'BioPharma Dive',
        titleKoran: '매드리갈 제약, 44억 달러 규모의 비알코올성 지방간질환(MASH) 파이프라인 확보',
        oneLineSummary: 'MASH 치료제 시장의 선두주자가 차세대 RNA 간섭 치료제 도입으로 시장 전략 강화',
        context: '2026년 2월 9일, 매드리갈 제약은 중국의 수조우 리보로부터 6개의 전임상 단계 RNAi 후보 물질을 라이선싱하며 대규모 파이프라인 확장을 단행했습니다.',
        whyImportant: '증가하는 간질환 시장에서 혁신 기술을 선점하려는 글로벌 제약사의 공격적인 움직임이 가속화되고 있습니다.',
        meaningForWork: '바이오 실무자라면 RNA 기반 플랫폼 기술이 신약 개발의 핵심 무기로 완전히 정착했음을 파악해야 합니다.',
        originalUrl: 'https://www.biopharmadive.com/news/madrigal-pharmaceuticals-mash-liver-deal-ribo/706500/',
        date: '2026-02-09'
    },
    {
        id: 'bio-2026-2',
        category: 'Bio',
        source: 'PharmaTimes',
        titleKoran: 'THX 파마 및 바이오코덱스, 희귀 질환 치료제 1.7억 유로 규모 라이선싱 계약',
        oneLineSummary: '희귀 질환인 바텐병 치료제 Batten-1을 포함한 신규 약물 후보군의 글로벌 권리 이전',
        context: '2026년 2월 11일, 양사는 Batten-1과 TX01 등의 치료제 개발을 위한 전략적 파트너십을 맺었으며, 총 계약 규모는 1억 7300만 유로에 달합니다.',
        whyImportant: '희귀 질환 시장이 글로벌 제약사들의 새로운 수익원이자 기술력 증명의 장으로 변모하고 있습니다.',
        meaningForWork: '제약사 전략 담당자라면 블록버스터급 신약 외에도 희귀 질환 타겟의 고부가 가치 비즈니스 모델을 검토해야 합니다.',
        originalUrl: 'https://www.pharmatimes.com/news/thx-pharma-biocodex-rare-disease-deal/',
        date: '2026-02-11'
    },
    {
        id: 'bio-2026-3',
        category: 'Bio',
        source: 'BioWorld',
        titleKoran: '일라이 릴리, Orna Therapeutics 인수로 세포 치료제 영역 대폭 확장',
        oneLineSummary: 'mRNA 기술을 넘어 원형 RNA(oRNA) 기술 선점을 통한 차세대 세포 치료 플랫폼 구축',
        context: '2026년 2월 9일 보도에 따르면 일라이 릴리는 오르나 테라퓨틱스를 인수하며 업계가 주목하는 새로운 RNA 기술권을 확보했습니다.',
        whyImportant: '기존 mRNA의 한계를 뛰어넘는 새로운 모달리티가 상용화 궤도에 올랐음을 뜻합니다.',
        meaningForWork: '연구직 전문직군이라면 RNA 기술의 변천사와 그에 따른 데이터 특징을 심도 있게 연구해야 합니다.',
        originalUrl: 'https://www.bioworld.com/articles/7123-lilly-orna-therapeutics-acquisition/',
        date: '2026-02-09'
    },

    // --- EdTech Category ---
    {
        id: 'edtech-2026-1',
        category: 'EdTech',
        source: 'EdSurge',
        titleKoran: '생각하는 기계의 시대, 인간의 사고 수준은 더 높아져야 한다',
        oneLineSummary: 'AI가 정보를 요약하고 답변을 내놓는 시대에 인간 교육의 핵심은 비판적 분석으로 시프트',
        context: '에듀서지 2월 11일 보도에 따르면, AI가 지식 전달을 넘어서며 교육의 본질이 단순 암기에서 고차원적 문제 해결로 이동하고 있습니다.',
        whyImportant: '전통적인 교육 방식이 무력화됨에 따라 학습 로드맵과 기업 내 인력 육성 전략의 전면적인 재편이 필요합니다.',
        meaningForWork: '직장인이라면 AI 활용법은 기본이며, AI가 내놓은 결과물의 신뢰성을 검증하는 역량에 더 투자해야 합니다.',
        originalUrl: 'https://www.edsurge.com/news/2026-02-11-when-machines-think-human-thinking-must-go-higher',
        date: '2026-02-11'
    },
    {
        id: 'edtech-2026-2',
        category: 'EdTech',
        source: 'EdTech Innovation Hub',
        titleKoran: '알파 스쿨, 교육용 소버린 AI 구축 위해 5천만 달러 규모 Incept Labs 설립',
        oneLineSummary: '국가별 교육 시스템에 최적화된 맞춤형 AI 인프라 구축을 위한 전략적 투자',
        context: '2026년 2월, 알파 스쿨은 인셉트 랩스를 설립하고 범용적인 챗봇이 아닌 교육 전용 데이터와 환경을 갖춘 AI 모델 개발에 착수했습니다.',
        whyImportant: '교육 데이터 주권과 보안의 중요성이 커지면서 범용 AI가 아닌 맞춤형 소버린 AI의 시대가 도래했음을 의미합니다.',
        meaningForWork: '교육 기획자라면 보안이 보장된 전용 AI 서버 구축이 향후 시스템 경쟁력의 핵심이 될 것임을 파악해야 합니다.',
        originalUrl: 'https://www.edtechinnovationhub.com/alpha-school-50m-incept-labs/',
        date: '2026-02-09'
    },
    {
        id: 'edtech-2026-3',
        category: 'EdTech',
        source: 'The Manila Times',
        titleKoran: '2026 세계 에듀테크 어워즈 발표: AI 기반 맞춤형 학습 도구 강세',
        oneLineSummary: 'AI 튜터링 및 학습 장애 아동을 위한 보조 기술 시스템이 최고 혁신상 수상',
        context: '2026년 2월 9일 개최된 제1회 세계 에듀테크 어워즈에서 루미오(Lumio)와 2U 등이 AI를 통한 실질적인 성과 개선을 인정받아 수상했습니다.',
        whyImportant: 'AI가 단순한 트렌드를 넘어 교육 현장에서 수치로 증명되는 임팩트를 내기 시작했습니다.',
        meaningForWork: '에듀테크 업체 관계자라면 성능 경쟁보다는 "사용자의 학습 성과가 얼마나 개선되었는가"를 수치로 증명하는 역량이 중요합니다.',
        originalUrl: 'https://www.manilatimes.net/2026/02/09/world-wide-edtech-awards-winners/',
        date: '2026-02-09'
    }
];
