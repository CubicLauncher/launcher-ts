// Imports
import { Sidebar } from "./components/cubic/navigation/sidebar";
import { Toaster } from "sonner";
import useThemeStore from "./lib/themes/themeStore";
import { usePageStore } from "./lib/pages/pageStore";
import Home from "./components/cubic/pages/Home";
import { useThemeStyles } from "./lib/themes/useThemeStyles";

// Component
const App = () => {
  // Hooks
  const styles = useThemeStyles();
  const theme = useThemeStore((state) => state.theme);
  const page = usePageStore((state) => state.page);

  // Render
  return (
    <div>
      <div className="flex flex-col h-screen font-sans">

        {/* Main layout */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <Sidebar /> 
          <main className={`flex-1 overflow-y-auto ${styles.background}`}>
            {page === "Home" && <Home />}
          </main>
        </div>

        {/* Footer */}
        <footer className="p-3 text-xs flex justify-between items-center">
          <span>CubicMC 0.1</span>
          <span>© 2025 Santiagolxx & NotStaff</span>
        </footer>
      </div>

      {/* Notifications */}
      <Toaster
        theme={theme}
        offset={60}
        style={{ right: "20px" }}
        richColors
      />
    </div>
  );
};

export default App;
