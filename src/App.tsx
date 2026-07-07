import { useState } from 'react';
import { CategoryProvider } from '@/context/CategoryContext';
import { FeedPage } from '@/pages/FeedPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { SavedPage } from '@/pages/SavedPage';
import { AccountPage } from '@/pages/AccountPage';
import { BottomNav } from '@/components/BottomNav';
import { CategoryDrawer } from '@/components/CategoryDrawer';

type TabId = 'feed' | 'explore' | 'saved' | 'account';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedPage onMenuClick={() => setIsDrawerOpen(true)} />;
      case 'explore':
        return <ExplorePage onMenuClick={() => setIsDrawerOpen(true)} />;
      case 'saved':
        return <SavedPage onMenuClick={() => setIsDrawerOpen(true)} />;
      case 'account':
        return <AccountPage onMenuClick={() => setIsDrawerOpen(true)} />;
      default:
        return <FeedPage onMenuClick={() => setIsDrawerOpen(true)} />;
    }
  };

  return (
    <CategoryProvider>
      {renderPage()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <CategoryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </CategoryProvider>
  );
}

export default App;
