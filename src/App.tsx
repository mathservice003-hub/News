import { useState, useEffect } from 'react';
import { RefreshCw, Layout, Smartphone, Cpu, Activity, GraduationCap } from 'lucide-react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsDetail from './components/NewsDetail';
import newsSourceData from './data/news.json';
import type { NewsItem } from './data/mockData';
import { fetchLatestNews } from './services/newsService';
import './App.css';

type Category = 'AI' | 'Robot' | 'Bio' | 'EdTech' | 'All';

function App() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasInitialSynced, setHasInitialSynced] = useState(false);

  // Constants for sources
  const SOURCES = {
    AI: 'MIT Technology Review',
    EDTECH: 'EdSurge',
    BIO: 'STAT News',
    ROBOT: 'The Robot Report'
  };

  // Initialize data and trigger auto-sync on mount
  useEffect(() => {
    const rawData = newsSourceData as NewsItem[];
    // Filter initial data to ensure it matches current source requirements
    const filteredInitial = rawData.filter(n => {
      if (n.category === 'AI') return n.source === SOURCES.AI;
      if (n.category === 'EdTech') return n.source === SOURCES.EDTECH;
      if (n.category === 'Bio') return n.source === SOURCES.BIO;
      return true; // Robot is currently open, or follows general rules
    });

    const unique = Array.from(new Map(filteredInitial.map(item => [item.originalUrl, item])).values());
    setNewsList(unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    // Auto-sync for real-time news on first load
    if (!hasInitialSynced) {
      handleSyncNews();
      setHasInitialSynced(true);
    }
  }, []);

  const handleSyncNews = async () => {
    setIsSyncing(true);
    try {
      const categories: Exclude<Category, 'All'>[] = ['EdTech', 'AI', 'Robot', 'Bio'];
      const results = await Promise.all(categories.map(cat => fetchLatestNews(cat).catch(() => [])));
      const flattened = results.flat();

      if (flattened.length > 0) {
        setNewsList(prev => {
          const combined = [...flattened, ...prev];
          // Filter out anything that doesn't match the required sources for each category
          const sourceFiltered = combined.filter(n => {
            if (n.category === 'AI') return n.source === SOURCES.AI;
            if (n.category === 'EdTech') return n.source === SOURCES.EDTECH;
            if (n.category === 'Bio') return n.source === SOURCES.BIO;
            return true;
          });
          const unique = Array.from(new Map(sourceFiltered.map(item => [item.originalUrl, item])).values());
          return unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
      }
    } catch (e) {
      console.error("Sync error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  const categories: { id: Category; label: string; icon: any }[] = [
    { id: 'All', label: '전체', icon: Layout },
    { id: 'EdTech', label: 'EdTech', icon: GraduationCap },
    { id: 'AI', label: 'AI', icon: Cpu },
    { id: 'Robot', label: 'Robot', icon: Smartphone },
    { id: 'Bio', label: 'Bio', icon: Activity },
  ];

  const getFilteredAndLimitedNews = () => {
    // Basic filter by category
    const categoryFiltered = activeCategory === 'All'
      ? newsList
      : newsList.filter(n => n.category === activeCategory);

    // Apply source restriction to each category regardless of view
    const sourceRestrestricted = categoryFiltered.filter(n => {
      if (n.category === 'AI') return n.source === SOURCES.AI;
      if (n.category === 'EdTech') return n.source === SOURCES.EDTECH;
      if (n.category === 'Bio') return n.source === SOURCES.BIO;
      if (n.category === 'Robot') return n.source === SOURCES.ROBOT;
      return true;
    });

    if (activeCategory === 'All') {
      // In 'All' view, we want 3 from each restricted category
      const ai = sourceRestrestricted.filter(n => n.category === 'AI').slice(0, 3);
      const robot = sourceRestrestricted.filter(n => n.category === 'Robot').slice(0, 3);
      const bio = sourceRestrestricted.filter(n => n.category === 'Bio').slice(0, 3);
      const edtech = sourceRestrestricted.filter(n => n.category === 'EdTech').slice(0, 3);

      return [...ai, ...robot, ...bio, ...edtech].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    // In specific category view, just take the top 3 (after source filtering)
    return sourceRestrestricted.slice(0, 3);
  };

  const displayNews = getFilteredAndLimitedNews();
  const selectedNews = newsList.find(n => n.id === selectedNewsId);

  return (
    <div className="app-wrapper">
      <Header />

      <main className="container main-content">
        {!selectedNews ? (
          <div className="news-feed fade-in">
            <div className="feed-header">
              <div className="feed-title-area">
                <h2>오늘의 핵심 브리핑</h2>
                <button
                  className={`sync-button ${isSyncing ? 'syncing' : ''}`}
                  onClick={handleSyncNews}
                  disabled={isSyncing}
                >
                  <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                  {isSyncing ? '동기화 중' : '실시간 업데이트'}
                </button>
              </div>
              <p>글로벌 전문 미디어의 실시간 뉴스를 분석하여 매일 업데이트합니다.</p>
            </div>

            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`tab-button ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <cat.icon size={16} />
                  <span>{cat.label}</span>
                  {activeCategory === cat.id && (
                    <div className="tab-underline" />
                  )}
                </button>
              ))}
            </div>

            <div className="card-grid">
              {displayNews.map((news) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  onClick={setSelectedNewsId}
                />
              ))}
            </div>

            <footer className="feed-footer">
              <p>© 2026 SciBrief for Work. v1.1.0 | 매분 매초 업데이트되는 기술 통찰</p>
            </footer>
          </div>
        ) : (
          <NewsDetail
            news={selectedNews}
            onBack={() => setSelectedNewsId(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
