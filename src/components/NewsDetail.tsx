import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Lightbulb, Info, Target, Globe, Search } from 'lucide-react';
import type { NewsItem } from '../data/mockData';
import CategoryTag from './CategoryTag';
import './NewsDetail.css';

interface NewsDetailProps {
    news: NewsItem;
    onBack: () => void;
}

const NewsDetail = ({ news, onBack }: NewsDetailProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="news-detail fade-in">
            <button className="back-button" onClick={onBack}>
                <ArrowLeft size={18} />
                <span>목록으로</span>
            </button>

            <header className="detail-header">
                <div className="header-meta">
                    <CategoryTag category={news.category} />
                    <span className="source-name">{news.source}</span>
                    <span className="date">{news.date}</span>
                </div>
                <h1 className="detail-title">{news.titleKoran}</h1>
                <div className="one-line-box">
                    <span className="label">요약</span>
                    <p className="content">{news.oneLineSummary}</p>
                </div>
            </header>

            <div className="detail-content">
                <section className="detail-section">
                    <h2><Info size={20} /> 1. 무슨 이야기인가?</h2>
                    <p>{news.context}</p>
                </section>

                <section className="detail-section">
                    <h2><Target size={20} /> 2. 왜 지금 중요한가?</h2>
                    <p>{news.whyImportant}</p>
                </section>

                <section className="meaning-box">
                    <div className="meaning-header">
                        <Lightbulb size={24} />
                        <h2>직장인에게 의미하는 것</h2>
                    </div>
                    <p>{news.meaningForWork}</p>
                </section>
            </div>

            <footer className="detail-footer">
                <div className="detail-footer-grid">
                    <button
                        className="original-link-button premium"
                        onClick={() => handleLinkClick(news.originalUrl)}
                    >
                        <Globe size={18} />
                        원문 기사 보러가기 <ExternalLink size={18} />
                    </button>

                    <button
                        className="original-link-button secondary"
                        onClick={() => handleLinkClick(`https://www.google.com/search?q=${encodeURIComponent(news.titleKoran + " " + news.source)}`)}
                    >
                        <Search size={16} />
                        기사 제목으로 구글 검색
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default NewsDetail;
