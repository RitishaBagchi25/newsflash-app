import { ReactNode } from 'react';
import { Menu, Zap } from 'lucide-react';
import { useCategory } from '@/context/CategoryContext';

interface LayoutProps {
  children: ReactNode;
  onMenuClick: () => void;
  showHeader?: boolean;
  showCategoryChip?: boolean;
}

export const Layout = ({
  children,
  onMenuClick,
  showHeader = true,
  showCategoryChip = false,
}: LayoutProps) => {
  const { activeCategory } = useCategory();

  const categoryLabel = activeCategory === 'all' ? 'All' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
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
      )}

      {showCategoryChip && activeCategory !== 'all' && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-lg mx-auto px-4 py-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-50 text-accent-600 text-sm font-medium rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
              {categoryLabel}
            </span>
          </div>
        </div>
      )}

      <main className="flex-1 pb-16">
        <div className="max-w-lg mx-auto">{children}</div>
      </main>
    </div>
  );
};
