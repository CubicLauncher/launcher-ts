import { Play, Clock, Gamepad2, Package, Database, Cpu, HardDrive } from '../../../lib/icons';

interface MainContentProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
  versions: string[];
}

const MainContent = ({ selectedVersion, onVersionChange, versions }: MainContentProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Game Versions */}
        <div className="col-span-3">
          <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
            <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Game Versions
            </h2>
            <div className="space-y-2">
              {versions.map((version) => (
                <button
                  key={version}
                  className={`w-full p-3 rounded-md text-left transition-colors ${
                    selectedVersion === version 
                      ? 'bg-[#222222] text-white' 
                      : 'text-[#666666] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                  onClick={() => onVersionChange(version)}
                >
                  <div className="flex items-center justify-between">
                    <span>Minecraft {version}</span>
                    <Play className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Recent Activity & Quick Launch */}
        <div className="col-span-6">
          <div className="space-y-6">
            <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
              <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </h2>
              <div className="bg-[#0a0a0a] p-4 rounded-md">
                <p className="text-[#666666]">Last played: 2 hours ago</p>
                <p className="text-[#444444] text-sm">Version: 1.20.1</p>
              </div>
            </div>

            <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
              <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Quick Launch
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {versions.map((version) => (
                  <button
                    key={version}
                    className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors"
                  >
                    <p className="text-[#666666] font-medium">Minecraft {version}</p>
                    <p className="text-[#444444] text-sm">Click to launch</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - System Info & Downloads */}
        <div className="col-span-3">
          <div className="space-y-6">
            <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
              <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                System Info
              </h2>
              <div className="bg-[#0a0a0a] p-4 rounded-md space-y-3">
                <div className="flex items-center">
                  <Database className="w-4 h-4 mr-2 text-[#666666]" />
                  <p className="text-[#666666]">RAM: 4GB</p>
                </div>
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-[#666666]" />
                  <p className="text-[#666666]">CPU: Intel i5</p>
                </div>
                <div className="flex items-center">
                  <HardDrive className="w-4 h-4 mr-2 text-[#666666]" />
                  <p className="text-[#666666]">GPU: NVIDIA GTX 1660</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
              <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Downloads
              </h2>
              <div className="bg-[#0a0a0a] p-4 rounded-md">
                <p className="text-[#666666]">No downloads in progress</p>
                <p className="text-[#444444] text-sm">Your games are up to date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 