import { User } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface AccountPageProps {
  onMenuClick: () => void;
}

export const AccountPage = ({ onMenuClick }: AccountPageProps) => {
  return (
    <Layout onMenuClick={onMenuClick}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <User size={28} className="text-gray-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-gray-900">Coming Soon</h2>
        <p className="text-gray-500 text-center mt-2 max-w-xs">
          Manage your account preferences and settings. This feature is in development.
        </p>
      </div>
    </Layout>
  );
};
