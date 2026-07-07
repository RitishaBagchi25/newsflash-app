import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, ExternalLink, X, ChevronDown, Menu, Zap } from 'lucide-react';
import { supabase, NewsArticle, getDisplayTitle, getDisplayContent, formatRelativeTime } from '@/lib/supabase';
import { useCategory } from '@/context/CategoryContext';
import { categoryFilterMap } from '@/lib/categories';
import { CategoryBadge } from '@/components/CategoryBadge';

interface ExplorePageProps {
  onMenuClick: () => void;
}

export const ExplorePage = ({ onMenuClick }: ExplorePageProps) => {
  const { activeCategory } = useCategory();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticle, setExpandedArticle] = useState<NewsArticle | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const categoryFilter = categoryFilterMap[activeCategory];
        let query = supabase
          .from('News Data Temp')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (categoryFilter) {
          query = query.ilike('category', categoryFilter);
        }

        const { data, error } = await query;

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  const handleScroll = useCallback(() => {
    if (!cardsRef.current) return;
    const scrollTop = cardsRef.current.scrollTop;
    const viewportHeight = cardsRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / viewportHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < articles.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, articles.length]);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-30 flex items-center justify-center">
        <Loader2 size={32} className="text-accent-500 animate-spin" />
      </div>
    );
  }

  if (expandedArticle) {
    return <ExpandedArticleView article={expandedArticle} onClose={() => setExpandedArticle(null)} />;
  }

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-10">
        <div className="px-4 h-14 flex items-center justify-between">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-1.5">
            <Zap size={20} className="text-accent-500 fill-current" />
            <span className="font-display text-lg font-bold tracking-tight">
              NewsFlash
            </span>
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* Page indicator */}
      <div className="absolute top-16 right-4 z-10 flex items-center gap-1 px-3 py-1.5 bg-black/60 rounded-full">
        <span className="text-white text-xs font-medium">
          {currentIndex + 1} / {articles.length}
        </span>
      </div>

      {/* Scrollable cards container */}
      <div
        ref={cardsRef}
        className="flex-1 overflow-y-auto scroll-snap-y"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {articles.map((article) => (
          <ExploreCard
            key={article.id}
            article={article}
            onViewFull={() => setExpandedArticle(article)}
          />
        ))}
      </div>
    </div>
  );
};

interface ExploreCardProps {
  article: NewsArticle;
  onViewFull: () => void;
}

const ExploreCard = ({ article, onViewFull }: ExploreCardProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);
  const truncatedContent = content.length > 200 ? content.slice(0, 200) + '...' : content;

  return (
    <div
      className="h-full w-full scroll-snap-start flex flex-col bg-white"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white pointer-events-none" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
          <CategoryBadge category={article.category} size="md" />

          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-6 leading-tight">
            {title}
          </h2>

          <p className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed">
            {truncatedContent}
          </p>

          <div className="text-gray-400 text-sm mt-4 flex items-center gap-1.5">
            <span>{formatRelativeTime(article.created_at)}</span>
            {article.source && <span> · {article.source}</span>}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative p-6 pb-8">
        <button
          onClick={onViewFull}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 text-white rounded-xl font-semibold text-lg hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25"
        >
          <ExternalLink size={20} />
          View Full Article
        </button>

        <div className="flex justify-center mt-4 text-gray-400">
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};

interface ExpandedArticleViewProps {
  article: NewsArticle;
  onClose: () => void;
}

const ExpandedArticleView = ({ article, onClose }: ExpandedArticleViewProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-lg mx-auto w-full p-6">
        <CategoryBadge category={article.category} size="md" />

        <h1 className="font-display text-2xl font-bold text-gray-900 mt-6 leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
          <span>{formatRelativeTime(article.created_at)}</span>
          {article.source && (
            <>
              <span>·</span>
              <span>{article.source}</span>
            </>
          )}
        </div>

        <div className="mt-6">
          <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-accent-500 text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            <ExternalLink size={18} />
            Read Original Article
          </a>
        )}
      </div>
    </div>
  );
};
