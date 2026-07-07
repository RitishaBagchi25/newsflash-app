import { getCategoryInfo } from '@/lib/categories';

interface CategoryBadgeProps {
  category: string | null;
  size?: 'sm' | 'md';
}

export const CategoryBadge = ({ category, size = 'sm' }: CategoryBadgeProps) => {
  const info = getCategoryInfo(category);
  const Icon = info.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${info.bgColor} ${info.color} ${sizeClasses[size]}`}
    >
      <Icon size={iconSizes[size]} />
      <span>{info.label}</span>
    </span>
  );
};
