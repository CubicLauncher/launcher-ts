"use client";
import { Drawer } from "vaul";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import useThemeStore from "../../../lib/stores/ThemeStore";
import { useThemeStyles } from "../../../lib/hooks/useThemeStyles";
import { Settings } from "lucide-react";

type SettingsDrawerProps = {
  side?: "bottom" | "right" | "left"; // Add 'right' and 'left' as valid values
};

export default function SettingsDrawer({
  side = "bottom",
}: SettingsDrawerProps) {
  const { theme, toggleTheme } = useThemeStore();
  const styles = useThemeStyles();
  const isSideDrawer = side === "right" || side === "left";

  // Conditional styles for each drawer position
  const drawerPositionClass = {
    bottom: "fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]",
    right: "fixed top-0 right-0 bottom-0 w-[350px] rounded-l-[10px]",
    left: "fixed top-0 left-0 bottom-0 w-[350px] rounded-r-[10px]",
  };

  return (
    <Drawer.Root direction={isSideDrawer ? side : "bottom"}>
      <Drawer.Trigger asChild>
        <Button variant="primary" size="md">
          <Settings size={20} />
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={`flex flex-col ${styles.drawer.background} ${drawerPositionClass[side]}`}
        >
          <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
            <Drawer.Handle />
            <Drawer.Title className={`font-medium ${styles.drawer.text} mt-8`}>
              Configuracion
            </Drawer.Title>
            <Separator className={`mt-4 mb-4 ${styles.separator}`} />

            {/* Theme Toggle */}
            <div className="mb-4">
              <label
                className={`font-medium ${styles.text} text-sm mb-2 block`}
              >
                Theme
              </label>
              <Button
                variant="primary"
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-yellow-500"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    Dark Mode
                  </>
                )}
              </Button>
            </div>

            <div>
              <label
                htmlFor="name"
                className={`font-medium ${styles.text} text-sm mb-2 block`}
              >
                Username
              </label>
              <input
                id="name"
                className={`border ${styles.input.border} ${styles.input.background} w-full px-3 h-9 rounded-lg outline-none ${styles.input.focus} ${styles.input.text}`}
                maxLength={16}
              />
            </div>
          </div>
          <div
            className={`p-4 ${styles.separator} border-t ${styles.border} mt-auto`}
          >
            <div className="flex gap-6 max-w-md mx-auto">
              <a
                className={`text-xs ${styles.text} flex items-center gap-0.25 justify-start`}
                onClick={() => {
                  console.error("hay q agregar esto :v");
                }}
                target="_blank"
              >
                CubicLauncher
              </a>
              <div className="justify-end flex gap-6 w-full">
                <a
                  className={`text-xs ${styles.text} flex items-center gap-0.25`}
                  href="https://github.com/cubiclauncher"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className={`text-xs ${styles.text} flex items-center gap-0.25`}
                  href="https://discord.gg/acZzSRJnfp"
                >
                  Discord
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
