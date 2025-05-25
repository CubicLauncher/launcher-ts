import { Play, Clock, Gamepad2, Package, Database, Cpu, HardDrive, Users, MessageSquare, Globe, Star } from '../../../lib/icons';

interface MainContentProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
  versions: string[];
}

const MainContent = ({ selectedVersion, onVersionChange, versions }: MainContentProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Game Versions & Recent Activity */}
        <div className="col-span-4">
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
                <Package className="w-5 h-5 mr-2" />
                Available Versions
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
        </div>

        {/* Right Column - Community & Social */}
        <div className="col-span-8">
          <div className="space-y-6">
            <div className="bg-[#111111] rounded-lg p-4 border border-[#222222]">
              <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Community Hub
              </h2>
              <div className="bg-[#0a0a0a] p-4 rounded-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111111] p-4 rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[#666666] font-medium">Friends Online</p>
                      <Users className="w-4 h-4 text-[#666666]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <p className="text-[#666666]">Alex123</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <p className="text-[#666666]">SteveMC</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#111111] p-4 rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[#666666] font-medium">Popular Servers</p>
                      <Globe className="w-4 h-4 text-[#666666]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[#666666]">Hypixel</p>
                        <p className="text-[#444444] text-sm">10k online</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#666666]">Mineplex</p>
                        <p className="text-[#444444] text-sm">5k online</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#222222]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-[#666666] hover:text-white transition-colors">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat
                      </button>
                      <button className="flex items-center text-[#666666] hover:text-white transition-colors">
                        <Star className="w-4 h-4 mr-2" />
                        Favorites
                      </button>
                    </div>
                    <button className="bg-[#222222] px-4 py-2 rounded-md text-white hover:bg-[#333333] transition-colors">
                      Launch Game
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 