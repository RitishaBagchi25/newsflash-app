import { Clock } from 'lucide-react';
import { NewsArticle, getDisplayTitle, getDisplayContent, formatRelativeTime } from '@/lib/supabase';
import { CategoryBadge } from './CategoryBadge';

interface ArticleHeroCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const ArticleHeroCard = ({ article, onClick }: ArticleHeroCardProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);
  const truncatedContent = content.length > 150 ? content.slice(0, 150) + '...' : content;

  return (
    <article
      onClick={onClick}
      className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer group"
    >
      {/* Background gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
        <CategoryBadge category={article.category} size="md" />
        <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-3 leading-tight line-clamp-3 group-hover:underline decoration-2 underline-offset-2">
          {title}
        </h2>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">{truncatedContent}</p>
        <div className="flex items-center gap-1.5 mt-3 text-gray-400 text-xs">
          <Clock size={12} />
          <span>{formatRelativeTime(article.created_at)}</span>
          {article.source && <span> · {article.source}</span>}
        </div>
      </div>
    </article>
  );
};

interface ArticleWideCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const ArticleWideCard = ({ article, onClick }: ArticleWideCardProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);
  const truncatedContent = content.length > 120 ? content.slice(0, 120) + '...' : content;

  return (
    <article
      onClick={onClick}
      className="flex gap-4 p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <CategoryBadge category={article.category} />
        <h3 className="font-display text-base font-semibold text-gray-900 mt-2 line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1.5 line-clamp-2">{truncatedContent}</p>
        <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-xs">
          <Clock size={12} />
          <span>{formatRelativeTime(article.created_at)}</span>
        </div>
      </div>
      <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gray-200 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
      </div>
    </article>
  );
};

interface ArticleGridCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const ArticleGridCard = ({ article, onClick }: ArticleGridCardProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);
  const truncatedContent = content.length > 80 ? content.slice(0, 80) + '...' : content;

  return (
    <article
      onClick={onClick}
      className="bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow rounded-lg border border-gray-100"
    >
      <div className="h-28 bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="p-3">
        <CategoryBadge category={article.category} />
        <h3 className="font-display text-sm font-semibold text-gray-900 mt-2 line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 text-xs mt-1.5 line-clamp-2">{truncatedContent}</p>
        <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs">
          <Clock size={10} />
          <span>{formatRelativeTime(article.created_at)}</span>
        </div>
      </div>
    </article>
  );
};
