import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { supabase, NewsArticle } from '@/lib/supabase';
import { useCategory } from '@/context/CategoryContext';
import { categoryFilterMap } from '@/lib/categories';
import { Layout } from '@/components/Layout';
import { ArticleHeroCard, ArticleWideCard, ArticleGridCard } from '@/components/ArticleCards';
import { ArticleDetail } from '@/components/ArticleDetail';

const ITEMS_PER_PAGE = 20;

interface FeedPageProps {
  onMenuClick: () => void;
}

export const FeedPage = ({ onMenuClick }: FeedPageProps) => {
  const { activeCategory } = useCategory();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchArticles = useCallback(
    async (pageNum: number, refresh: boolean = false) => {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 0) {
        setLoading(true);
      }

      try {
        const categoryFilter = categoryFilterMap[activeCategory];
        let query = supabase
          .from('News Data Temp')
          .select('*')
          .order('created_at', { ascending: false })
          .range(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE - 1);

        if (categoryFilter) {
          query = query.ilike('category', categoryFilter);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (refresh) {
          setArticles(data || []);
          setPage(0);
          setHasMore((data?.length ?? 0) === ITEMS_PER_PAGE);
        } else if (pageNum === 0) {
          setArticles(data || []);
          setHasMore((data?.length ?? 0) === ITEMS_PER_PAGE);
        } else {
          setArticles((prev) => [...prev, ...(data || [])]);
          setHasMore((data?.length ?? 0) === ITEMS_PER_PAGE);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeCategory]
  );

  useEffect(() => {
    setPage(0);
    fetchArticles(0);
  }, [activeCategory, fetchArticles]);

  useEffect(() => {
    if (page > 0) {
      fetchArticles(page);
    }
  }, [page, fetchArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !refreshing) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, refreshing]);

  const handleRefresh = () => {
    if (!refreshing) {
      fetchArticles(0, true);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onClose={handleCloseDetail} />;
  }

  return (
    <Layout onMenuClick={onMenuClick} showCategoryChip>
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="flex items-center justify-center py-3 bg-accent-50">
          <Loader2 size={20} className="text-accent-500 animate-spin" />
          <span className="ml-2 text-sm text-accent-600 font-medium">Refreshing...</span>
        </div>
      )}

      {loading && articles.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="text-accent-500 animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <p className="text-gray-500 text-center">No articles found</p>
          <button
            onClick={handleRefresh}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Pull to refresh area */}
          <div
            className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center -translate-y-full cursor-pointer"
            onTouchStart={(e) => {
              const startY = e.touches[0].clientY;
              const handleTouchMove = (moveEvent: TouchEvent) => {
                const diff = moveEvent.touches[0].clientY - startY;
                if (diff > 100 && window.scrollY === 0) {
                  handleRefresh();
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                }
              };
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchmove', handleTouchMove);
              document.addEventListener('touchend', handleTouchEnd);
            }}
          />

          {/* Hero Card */}
          <ArticleHeroCard article={articles[0]} onClick={() => handleArticleClick(articles[0])} />

          {/* Mixed Layout */}
          <div className="border-t border-gray-100">
            {articles.slice(1).map((article, index) => {
              // Pattern: wide, grid (2), wide, grid (2), ...
              const patternIndex = index % 3;
              if (patternIndex === 0) {
                return (
                  <ArticleWideCard
                    key={article.id}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                  />
                );
              }
              // Grid items come in pairs
              if (patternIndex === 1 || patternIndex === 2) {
                const gridStart = patternIndex === 1;
                const nextIndex = index + 1;
                if (gridStart && nextIndex < articles.slice(1).length) {
                  return (
                    <div key={`grid-${index}`} className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
                      <ArticleGridCard
                        article={article}
                        onClick={() => handleArticleClick(article)}
                      />
                      <ArticleGridCard
                        article={articles.slice(1)[nextIndex]}
                        onClick={() => handleArticleClick(articles.slice(1)[nextIndex])}
                      />
                    </div>
                  );
                }
                return (
                  <div key={`grid-${index}`} className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
                    <ArticleGridCard
                      article={article}
                      onClick={() => handleArticleClick(article)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Load more indicator */}
          <div ref={loaderRef} className="flex items-center justify-center py-8">
            {hasMore && (
              <Loader2 size={24} className="text-gray-400 animate-spin" />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
