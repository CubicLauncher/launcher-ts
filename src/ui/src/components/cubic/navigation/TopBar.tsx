import { User, Play } from 'lucide-react';

interface TopBarProps {
  onPlayClick: () => void;
}

const TopBar = ({ onPlayClick }: TopBarProps) => {
  return (
    <div className="h-16 bg-[#111111] border-b border-[#222222] flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="bg-[#222222] px-4 py-2 rounded-md flex items-center">
          <User className="w-5 h-5 mr-2 text-[#666666]" />
          <span className="text-[#666666]">Player123</span>
        </div>
      </div>
      <button 
        onClick={onPlayClick}
        className="bg-[#333333] hover:bg-[#444444] px-6 py-2 rounded-md transition-colors flex items-center"
      >
        <Play className="w-5 h-5 mr-2" />
        PLAY
      </button>
    </div>
  );
};

export default TopBar; 