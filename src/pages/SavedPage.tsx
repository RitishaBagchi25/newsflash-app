import { Bookmark } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface SavedPageProps {
  onMenuClick: () => void;
}

export const SavedPage = ({ onMenuClick }: SavedPageProps) => {
  return (
    <Layout onMenuClick={onMenuClick}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Bookmark size={28} className="text-gray-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-gray-900">Coming Soon</h2>
        <p className="text-gray-500 text-center mt-2 max-w-xs">
          Save articles to read later. This feature is currently in development.
        </p>
      </div>
    </Layout>
  );
};
