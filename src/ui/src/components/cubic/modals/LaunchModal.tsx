import { X, Play, Coffee, Database } from '../../../lib/icons';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVersion: string;
  onVersionChange: (version: string) => void;
  versions: string[];
}

const LaunchModal = ({ 
  isOpen, 
  onClose, 
  selectedVersion, 
  onVersionChange,
  versions 
}: LaunchModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
      <div className="bg-[#111111] p-6 rounded-lg w-full max-w-2xl border border-[#222222]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#666666]">Launch Settings</h2>
          <button 
            onClick={onClose}
            className="text-[#666666] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#666666] mb-2 flex items-center">
                <Coffee className="w-4 h-4 mr-2" />
                Minecraft Version
              </label>
              <select 
                value={selectedVersion}
                onChange={(e) => onVersionChange(e.target.value)}
                className="w-full bg-[#0a0a0a] text-[#666666] p-2 rounded-md border border-[#222222] focus:border-[#333333] outline-none"
              >
                {versions.map(version => (
                  <option key={version} value={version}>{version}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#666666] mb-2 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Memory (RAM)
              </label>
              <select className="w-full bg-[#0a0a0a] text-[#666666] p-2 rounded-md border border-[#222222] focus:border-[#333333] outline-none">
                <option>2GB</option>
                <option>4GB</option>
                <option>6GB</option>
                <option>8GB</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-[#666666] hover:text-white bg-[#0a0a0a] rounded-md border border-[#222222] hover:border-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button 
              className="bg-[#333333] hover:bg-[#444444] px-6 py-2 rounded-md transition-colors flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Launch Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchModal; 