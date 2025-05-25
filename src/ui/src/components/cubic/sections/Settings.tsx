import { Settings as SettingsIcon, FolderOpen, Coffee } from '../../../lib/icons';

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#666666] mb-8">Settings</h1>
      <div className="bg-[#111111] rounded-lg p-6 border border-[#222222]">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2" />
              Game Settings
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222]">
                <label className="block text-[#666666] mb-2 flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Game Directory
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none" 
                  value="C:/Users/Player/.minecraft" 
                />
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222]">
                <label className="block text-[#666666] mb-2 flex items-center">
                  <Coffee className="w-4 h-4 mr-2" />
                  Java Path
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none" 
                  value="C:/Program Files/Java/jre1.8.0_301" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 