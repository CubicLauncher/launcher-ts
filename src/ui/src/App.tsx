import { Sidebar } from "./components/cubic/general/Sidebar";
import ThemeProvider from "./lib/providers/ThemeProvider";
import { Toaster } from "sonner";
import useThemeStore from "./lib/stores/ThemeStore";
import Home from "./pages/home";
import { usePageStore } from "./lib/stores/PageStore";

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  const page = usePageStore((state) => state.page);

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen dark:bg-[#0b0b07] dark:text-white text-[#090807] bg-[#f9f8f6] font-sans">
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <Sidebar />
          <div className="p-2">{page === "Home" && <Home />}</div>
        </div>
        <footer className="p-3 dark:bg-stone-900 dark:text-stone-400 bg-[#fffbf0] text-xs flex justify-between items-center">
          <div>CubicMC 0.1</div>
          <div>© 2025 Santiagolxx & NotStaff</div>
        </footer>
      </div>
      <Toaster theme={theme} offset={60} style={{ right: "20px" }} richColors />
    </ThemeProvider>
  );
};

export default App;
