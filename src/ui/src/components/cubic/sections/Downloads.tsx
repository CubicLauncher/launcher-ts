import { Download, Clock, Package } from '../../../lib/icons';

const Downloads = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#666666] mb-8">Downloads</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* Active Downloads */}
        <div className="bg-[#111111] rounded-lg p-6 border border-[#222222]">
          <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Active Downloads
          </h2>
          <div className="space-y-4">
            <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#666666]" />
                  <span className="text-[#666666]">Minecraft 1.20.1</span>
                </div>
                <span className="text-[#444444] text-sm">75%</span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-2">
                <div className="bg-[#444444] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-[#444444]">
                <span>750MB / 1GB</span>
                <span>2.5 MB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download History */}
        <div className="bg-[#111111] rounded-lg p-6 border border-[#222222]">
          <h2 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Download History
          </h2>
          <div className="space-y-4">
            <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#666666]" />
                  <span className="text-[#666666]">Minecraft 1.19.2</span>
                </div>
                <span className="text-[#444444] text-sm">Completed</span>
              </div>
              <div className="text-sm text-[#444444] mt-2">
                Downloaded on March 15, 2024
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#666666]" />
                  <span className="text-[#666666]">Minecraft 1.18.2</span>
                </div>
                <span className="text-[#444444] text-sm">Completed</span>
              </div>
              <div className="text-sm text-[#444444] mt-2">
                Downloaded on March 10, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads; 