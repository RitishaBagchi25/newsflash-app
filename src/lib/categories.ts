import {
  Briefcase,
  Film,
  Globe,
  Heart,
  Atom,
  Trophy,
  Cpu,
  LucideIcon,
} from 'lucide-react';

export type CategoryType =
  | 'all'
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const categories: CategoryInfo[] = [
  { id: 'all', label: 'All', icon: Globe, color: 'text-gray-600', bgColor: 'bg-gray-100' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'text-category-business', bgColor: 'bg-blue-100' },
  { id: 'entertainment', label: 'Entertainment', icon: Film, color: 'text-category-entertainment', bgColor: 'bg-pink-100' },
  { id: 'general', label: 'General', icon: Globe, color: 'text-category-general', bgColor: 'bg-gray-100' },
  { id: 'health', label: 'Health', icon: Heart, color: 'text-category-health', bgColor: 'bg-emerald-100' },
  { id: 'science', label: 'Science', icon: Atom, color: 'text-category-science', bgColor: 'bg-purple-100' },
  { id: 'sports', label: 'Sports', icon: Trophy, color: 'text-category-sports', bgColor: 'bg-amber-100' },
  { id: 'technology', label: 'Technology', icon: Cpu, color: 'text-category-technology', bgColor: 'bg-cyan-100' },
];

export const getCategoryInfo = (category: string | null): CategoryInfo => {
  if (!category) return categories.find((c) => c.id === 'general')!;
  const normalized = category.toLowerCase().trim();
  return categories.find((c) => c.id === normalized) || categories.find((c) => c.id === 'general')!;
};

export const categoryFilterMap: Record<CategoryType, string | null> = {
  all: null,
  business: 'Business',
  entertainment: 'Entertainment',
  general: 'General',
  health: 'Health',
  science: 'Science',
  sports: 'Sports',
  technology: 'Technology',
};
