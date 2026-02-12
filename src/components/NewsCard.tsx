import { ArrowRight, Clock } from 'lucide-react';
import type { NewsItem } from '../data/mockData';
import CategoryTag from './CategoryTag';
import './NewsCard.css';

interface NewsCardProps {
    news: NewsItem;
    onClick: (id: string) => void;
}

const NewsCard = ({ news, onClick }: NewsCardProps) => {
    return (
        <div
            className="news-card fade-in"
            onClick={() => onClick(news.id)}
        >
            <div className="card-header">
                <CategoryTag category={news.category} />
                <span className="source-name">{news.source}</span>
            </div>
            <h3 className="card-title">{news.titleKoran}</h3>
            <p className="card-summary">{news.oneLineSummary}</p>
            <div className="card-footer">
                <div className="card-meta">
                    <Clock size={12} />
                    <span>{news.date}</span>
                </div>
                <div className="read-more">
                    <span>전문 보기</span>
                    <ArrowRight size={14} />
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
