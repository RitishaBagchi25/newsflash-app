import { ArrowLeft, Clock, ExternalLink } from 'lucide-react';
import { NewsArticle, getDisplayTitle, getDisplayContent, formatRelativeTime } from '@/lib/supabase';
import { CategoryBadge } from './CategoryBadge';

interface ArticleDetailProps {
  article: NewsArticle;
  onClose: () => void;
}

export const ArticleDetail = ({ article, onClose }: ArticleDetailProps) => {
  const title = getDisplayTitle(article);
  const content = getDisplayContent(article);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <span className="font-display text-lg font-bold text-gray-900">Article</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-lg mx-auto w-full">
        {/* Hero image area */}
        <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300" />

        <div className="p-5">
          <CategoryBadge category={article.category} size="md" />

          <h1 className="font-display text-2xl font-bold text-gray-900 mt-4 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{formatRelativeTime(article.created_at)}</span>
            </div>
            {article.source && (
              <>
                <span>·</span>
                <span>{article.source}</span>
              </>
            )}
          </div>

          {article.description && article.ai_summary && (
            <p className="text-gray-600 text-sm mt-4 font-medium">{article.description}</p>
          )}

          <div className="mt-6">
            <div
              className="prose prose-gray max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap"
            >
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
    </div>
  );
};
