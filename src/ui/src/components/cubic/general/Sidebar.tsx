"use client"

import type React from "react"
import { Home, Play, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { usePageStore, type Page } from "../../../lib/stores/PageStore"
import useSidebarStore from "../../../lib/stores/SidebarStore"
import { useThemeStyles } from "../../../lib/hooks/useThemeStyles"
import SettingsDrawer from "../settings/SettingsDrawer"
import { cn } from "../../../lib/utils"
import { motion, useAnimate, useDragControls } from "framer-motion"

type NavItem = {
  id: Page
  label: string
  icon: React.ReactNode
}

export function Sidebar() {
  const { page, setPage } = usePageStore()
  const { isCollapsed, toggleSidebar } = useSidebarStore()
  const styles = useThemeStyles()
  
  const dragControls = useDragControls()
  const [scope, animate] = useAnimate()

  const navItems: NavItem[] = [
    { id: "Home", label: "Home", icon: <Home size={20} /> },
    { id: "Play", label: "Play", icon: <Play size={20} /> },
    { id: "Downloads", label: "Downloads", icon: <Package size={20} /> },
  ]

  const handleToggle = async () => {
    const newState = !isCollapsed
    await animate(scope.current, {
      width: newState ? 64 : 240,
    }, {
      type: "spring",
      stiffness: 300,
      damping: 30
    })
    toggleSidebar()
  }

  return (
    <motion.aside
      ref={scope}
      drag="x"
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={async (_, info) => {
        if (Math.abs(info.offset.x) > 50) {
          await handleToggle()
        } else {
          // Si no se arrastró lo suficiente, volver a la posición original
          await animate(scope.current, {
            width: isCollapsed ? 64 : 240,
          }, {
            type: "spring",
            stiffness: 300,
            damping: 30
          })
        }
      }}
      className={cn(
        "hidden md:flex flex-col",
        styles.sidebar.background,
        styles.sidebar.border,
        "border-r shadow-xl"
      )}
      style={{
        width: isCollapsed ? 64 : 240
      }}
    >
      <div className="flex items-center justify-between px-4 py-6">
        {!isCollapsed && (
          <div className={cn("text-xl font-semibold", styles.sidebar.text)}>
            CubicMC
          </div>
        )}
        <button
          onClick={handleToggle}
          className={cn(
            "p-1 rounded-lg transition-colors",
            styles.sidebar.hover,
            styles.sidebar.text
          )}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1 px-2">
        {navItems.map((item) => {
          const isActive = page === item.id
          const navStyles = isActive ? styles.sidebar.navItem.active : styles.sidebar.navItem.inactive

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                navStyles.background,
                navStyles.text,
                navStyles.border,
                isActive ? "translate-y-[2px]" : styles.sidebar.hover,
                "active:translate-y-[2px] active:shadow-sm"
              )}
              style={{
                boxShadow: isActive 
                  ? "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15)"
                  : "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.05)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
              }}
            >
              <div className={navStyles.hoverText}>{item.icon}</div>
              {!isCollapsed && (
                <span className={cn("text-sm font-medium", navStyles.labelText)}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="p-2">
        <SettingsDrawer side="right" />
      </div>
    </motion.aside>
  )
}
