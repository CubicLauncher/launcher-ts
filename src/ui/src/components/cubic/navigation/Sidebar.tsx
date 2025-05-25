import { Coffee, Home, Newspaper, Settings, LogOut, Download } from 'lucide-react';

interface SidebarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ selectedTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-20 bg-[#111111] border-r border-[#222222] flex flex-col items-center py-4 h-screen">
      <div className="mb-8">
        <div className="w-12 h-12 bg-[#222222] rounded-2xl flex items-center justify-center">
          <Coffee className="w-7 h-7 text-[#666666]" />
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2 flex-grow">
        <button 
          onClick={() => onTabChange('play')}
          className={`group relative p-3 rounded-2xl transition-all duration-200 ${
            selectedTab === 'play' ? 'bg-[#222222] text-white rounded-3xl' : 'text-[#666666] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Home className="w-6 h-6" />
          <div className={`absolute left-0 w-1 h-0 bg-white rounded-r-full transition-all duration-200 ${
            selectedTab === 'play' ? 'h-8' : 'group-hover:h-4'
          } top-1/2 -translate-y-1/2`} />
        </button>
        <button 
          onClick={() => onTabChange('downloads')}
          className={`group relative p-3 rounded-2xl transition-all duration-200 ${
            selectedTab === 'downloads' ? 'bg-[#222222] text-white rounded-3xl' : 'text-[#666666] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Download className="w-6 h-6" />
          <div className={`absolute left-0 w-1 h-0 bg-white rounded-r-full transition-all duration-200 ${
            selectedTab === 'downloads' ? 'h-8' : 'group-hover:h-4'
          } top-1/2 -translate-y-1/2`} />
        </button>
      </div>

      <div className="mt-auto space-y-2">
      <button 
          onClick={() => onTabChange('settings')}
          className={`group relative p-3 rounded-2xl transition-all duration-200 ${
            selectedTab === 'settings' ? 'bg-[#222222] text-white rounded-3xl' : 'text-[#666666] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Settings className="w-6 h-6" />
          <div className={`absolute left-0 w-1 h-0 bg-white rounded-r-full transition-all duration-200 ${
            selectedTab === 'settings' ? 'h-8' : 'group-hover:h-4'
          } top-1/2 -translate-y-1/2`} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 