import { Settings as SettingsIcon, FolderOpen, Coffee, User, Globe, Palette, Gamepad2 } from '../../../lib/icons';

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#666666] mb-8">Settings</h1>
      
      {/* Game Settings - Card Style */}
      <div className="bg-[#111111] rounded-lg p-6 border border-[#222222] mb-6">
        <h3 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2" />
          Game Settings
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors">
            <label className="block text-[#666666] mb-2 flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" />
              Game Directory
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none" 
                value="C:/Users/Player/.minecraft" 
              />
              <button className="bg-[#222222] hover:bg-[#333333] text-white px-3 py-2 rounded-md transition-colors">
                Save
              </button>
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors">
            <label className="block text-[#666666] mb-2 flex items-center">
              <Coffee className="w-4 h-4 mr-2" />
              Java Path
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none" 
                value="C:/Program Files/Java/jre1.8.0_301" 
              />
              <button className="bg-[#222222] hover:bg-[#333333] text-white px-3 py-2 rounded-md transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings - List Style */}
      <div className="bg-[#111111] rounded-lg p-6 border border-[#222222] mb-6">
        <h3 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Account Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-md border border-[#222222] hover:bg-[#151515] transition-colors">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-3 text-[#666666]" />
              <span className="text-[#666666]">Username</span>
            </div>
            <input 
              type="text" 
              className="w-64 bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none" 
              placeholder="Enter your username" 
            />
          </div>
        </div>
      </div>

      {/* Game Preferences - Grid Style */}
      <div className="bg-[#111111] rounded-lg p-6 border border-[#222222]">
        <h3 className="text-lg font-semibold text-[#666666] mb-4 flex items-center">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Launcher Options
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors">
            <div className="flex items-center mb-3">
              <Palette className="w-4 h-4 mr-2 text-[#666666]" />
              <span className="text-[#666666] font-medium">Theme</span>
            </div>
            <select 
              className="w-full bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors">
            <div className="flex items-center mb-3">
              <Globe className="w-4 h-4 mr-2 text-[#666666]" />
              <span className="text-[#666666] font-medium">Language</span>
            </div>
            <select 
              className="w-full bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="bg-[#0a0a0a] p-4 rounded-md border border-[#222222] hover:border-[#333333] transition-colors">
            <div className="flex items-center mb-3">
              <Gamepad2 className="w-4 h-4 mr-2 text-[#666666]" />
              <span className="text-[#666666] font-medium">Auto Update</span>
            </div>
            <select 
              className="w-full bg-[#111111] p-2 rounded-md text-[#666666] border border-[#222222] focus:border-[#333333] outline-none"
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
              <option value="notify">Notify Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 