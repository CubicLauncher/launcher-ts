"use client";

import { useMemo, useCallback, useEffect } from "react";
import { Home, Play, Package, ChevronLeft } from "lucide-react";
import { usePageStore, type Page } from "../../../lib/stores/PageStore";
import useSidebarStore from "../../../lib/stores/SidebarStore";
import { useThemeStyles } from "../../../lib/hooks/useThemeStyles";
import SettingsDrawer from "../settings/SettingsDrawer";
import { cn } from "../../../lib/utils";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

type NavItem = {
  id: Page;
  label: string;
  icon: React.ReactNode;
};

export function Sidebar() {
  const { page, setPage } = usePageStore();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const styles = useThemeStyles();

  // Controls para poder animar el botón toggle cuando cambia el tema
  const toggleControls = useAnimation();

  // Memoizar los elementos de navegación para evitar recrearlos en cada render
  const navItems = useMemo<NavItem[]>(
    () => [
      { id: "Home", label: "Home", icon: <Home size={20} /> },
      { id: "Play", label: "Play", icon: <Play size={20} /> },
      { id: "Downloads", label: "Downloads", icon: <Package size={20} /> },
    ],
    [],
  );

  // Memoizar las variantes de animación para optimizar rendimiento
  const sidebarVariants = useMemo(
    () => ({
      expanded: {
        width: 240,
        transition: {
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1], // Curva bezier personalizada - más fluida que spring
          when: "beforeChildren",
        },
      },
      collapsed: {
        width: 64,
        transition: {
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1],
          when: "afterChildren",
        },
      },
    }),
    [],
  );

  // Variantes más limpias y eficientes
  const contentVariants = useMemo(
    () => ({
      logoVariants: {
        enter: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.15, ease: "easeOut" },
        },
        exit: {
          opacity: 0,
          x: -10,
          transition: { duration: 0.1, ease: "easeIn" },
        },
      },
      itemsVariants: {
        enter: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
        exit: {
          opacity: 0,
          x: -5,
          transition: {
            duration: 0.1,
            ease: "easeIn",
          },
        },
      },
      toggleIcon: {
        expanded: { rotateY: 0 },
        collapsed: { rotateY: 180 },
      },
    }),
    [],
  );

  // Uso de useCallback para evitar recrear funciones en cada render
  const handleToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  // Efecto para animar el botón toggle cuando cambia el tema
  // Esto es clave para asegurar que las transiciones se actualicen con el cambio de tema
  useEffect(() => {
    // Pequeña animación para refrescar el botón al cambiar de tema
    toggleControls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 },
    });
  }, [styles, toggleControls]);

  return (
    <motion.aside
      layout
      variants={sidebarVariants}
      initial={false}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className={cn(
        "hidden md:flex flex-col",
        styles.sidebar.background,
        styles.sidebar.border,
        "border-r shadow-xl",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center h-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.div
                key="logo"
                initial="exit"
                animate="enter"
                exit="exit"
                variants={contentVariants.logoVariants}
                className={cn(
                  "text-xl font-semibold truncate",
                  styles.sidebar.text,
                )}
              >
                CubicMC
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleToggle}
          animate={toggleControls}
          whileTap={{ scale: 0.85, transition: { duration: 0.1 } }}
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.07)",
            scale: 1.05,
            transition: { duration: 0.15 },
          }}
          className={cn(
            "p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "active:translate-y-px touch-none transition-colors duration-200",
            styles.sidebar.hover,
            styles.sidebar.text,
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.div
            variants={contentVariants.toggleIcon}
            animate={isCollapsed ? "collapsed" : "expanded"}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronLeft size={18} />
          </motion.div>
        </motion.button>
      </div>

      <nav className="flex flex-col gap-2 flex-1 px-2 py-3">
        {navItems.map((item) => {
          const isActive = page === item.id;
          const navStyles = isActive
            ? styles.sidebar.navItem.active
            : styles.sidebar.navItem.inactive;

          return (
            <motion.button
              key={item.id}
              onClick={() => setPage(item.id)}
              whileHover={{
                scale: isActive ? 1.01 : 1.02,
                y: isActive ? 2 : 0,
              }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              className={cn(
                "flex items-center rounded-lg transition-all duration-100 ease-out",
                navStyles.background,
                navStyles.text,
                navStyles.border,
                isActive ? "translate-y-[1.5px]" : "hover:translate-y-[0.5px]",
                isCollapsed ? "justify-center px-2 py-3" : "px-4 py-3 gap-3",
              )}
              style={{
                boxShadow: isActive
                  ? "0 1px 2px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.15)"
                  : "0 3px 5px -1px rgba(0,0,0,0.06), 0 2px 3px -1px rgba(0,0,0,0.04)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <motion.div
                className={cn(
                  navStyles.hoverText,
                  isCollapsed ? "mx-auto" : "",
                )}
                animate={{
                  scale: isActive ? 1.08 : 1,
                  rotate: 0,
                }}
                whileHover={{
                  scale: isActive ? 1.08 : 1.05,
                  rotate: isActive ? [-2, 2, 0] : [-5, 5, 0],
                  transition: {
                    rotate: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                transition={{
                  scale: { duration: 0.15 },
                  rotate: { duration: 0.3 },
                }}
              >
                {item.icon}
              </motion.div>

              <AnimatePresence mode="popLayout">
                {!isCollapsed && (
                  <motion.span
                    key={`label-${item.id}`}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={contentVariants.itemsVariants}
                    className={cn(
                      "text-sm font-medium whitespace-nowrap overflow-hidden",
                      navStyles.labelText,
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      <div
        className={cn(
          "mt-auto mb-1",
          isCollapsed ? "flex justify-center" : "p-2",
        )}
      >
        <SettingsDrawer side="right" />
      </div>
    </motion.aside>
  );
}
