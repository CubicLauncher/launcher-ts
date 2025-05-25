import { useState } from 'react';
import './App.css';
import Sidebar from './components/cubic/navigation/Sidebar';
import TopBar from './components/cubic/navigation/TopBar';
import LaunchModal from './components/cubic/modals/LaunchModal';
import Downloads from './components/cubic/sections/Downloads';
import Settings from './components/cubic/sections/Settings';
import MainContent from './components/cubic/sections/MainContent';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('1.20.1');
  const [selectedTab, setSelectedTab] = useState('play');

  const versions = ['1.20.1', '1.19.2', '1.18.2', '1.17.1'];
  const newsItems = [
    { title: 'Minecraft 1.20.1 Released', image: 'https://via.placeholder.com/300x150', date: '2024-03-20' },
    { title: 'New Features Coming Soon', image: 'https://via.placeholder.com/300x150', date: '2024-03-19' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {/* Main Content Area */}
      <div className="flex-1">
        <TopBar onPlayClick={() => setIsModalOpen(true)} />

        {/* Content */}
        <div className="p-8">
          {selectedTab === 'play' && (
            <MainContent 
              selectedVersion={selectedVersion}
              onVersionChange={setSelectedVersion}
              versions={versions}
            />
          )}

          {selectedTab === 'settings' && <Settings />}

          {selectedTab === 'downloads' && <Downloads />}
        </div>
      </div>

      <LaunchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedVersion={selectedVersion}
        onVersionChange={setSelectedVersion}
        versions={versions}
      />
    </div>
  );
};

export default App;
