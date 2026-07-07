import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cawaveoqxvnkquwqlzcg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhd2F2ZW9xeHZua3F1d3FsemNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mjg5MjQsImV4cCI6MjA5OTAwNDkyNH0.enNP7C7h5qh-A-5XcWCFmIRf3tXWgSOk9JGzhc8Y4Ak';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NewsArticle {
  id: number;
  created_at: string | null;
  category: string | null;
  title: string | null;
  description: string | null;
  source: string | null;
  content: string | null;
  ai_summary: string | null;
  ai_title: string | null;
  url: string | null;
}

export const getDisplayTitle = (article: NewsArticle): string => {
  return article.ai_title || article.title || 'Untitled';
};

export const getDisplayContent = (article: NewsArticle): string => {
  return article.ai_summary || article.content || article.description || '';
};

export const formatRelativeTime = (dateString: string | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
