import { useEffect } from 'react';
import { X } from 'lucide-react';
import { categories, CategoryType } from '@/lib/categories';
import { useCategory } from '@/context/CategoryContext';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDrawer = ({ isOpen, onClose }: CategoryDrawerProps) => {
  const { activeCategory, setActiveCategory } = useCategory();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCategoryClick = (categoryId: CategoryType) => {
    setActiveCategory(categoryId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-gray-900">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="py-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-accent-50 text-accent-600 border-r-2 border-accent-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`p-2 rounded-lg ${category.bgColor}`}>
                  <Icon size={20} className={category.color} />
                </span>
                <span className="font-medium">{category.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-accent-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
