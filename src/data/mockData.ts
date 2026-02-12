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

export const mockNews: NewsItem[] = [];
