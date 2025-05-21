"use client";

import { useMemo, useEffect, useState } from "react";
import { Clock, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useThemeStyles } from "../../../lib/hooks/useThemeStyles";

interface VersionCardProps {
  progress: number;
  status: "loading" | "success" | "warning";
  onToggleStatus?: (status: "loading" | "warning" | "success") => void;
}

export default function VersionCard({
  progress,
  status,
  onToggleStatus,
}: VersionCardProps) {
  const styles = useThemeStyles();
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.03, 1],
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    });
  }, [status, controls]);

  const animations = useMemo(
    () => ({
      card: {
        rest: {
          y: 0,
          transition: {
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        hover: {
          y: -4,
          transition: {
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      },
      icon: {
        initial: { scale: 1 },
        hover: {
          scale: 1.1,
          rotate: [-2, 2, 0],
          transition: {
            rotate: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        },
      },
      progressText: {
        initial: { opacity: 0, y: 5 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: {
          opacity: 0,
          y: -5,
          transition: {
            duration: 0.1,
            ease: "easeIn",
          },
        },
      },
    }),
    [],
  );

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle size={20} className={styles.status.success.text} />;
      case "warning":
        return (
          <AlertTriangle size={20} className={styles.status.warning.text} />
        );
      default:
        return <Clock size={20} className={styles.status.loading.text} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return styles.status.success.bar;
      case "warning":
        return styles.status.warning.bar;
      default:
        return styles.status.loading.bar;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Completado";
      case "warning":
        return "Advertencia";
      default:
        return "Progresando";
    }
  };

  const getButtonStyles = () => {
    switch (status) {
      case "success":
        return styles.status.success.button;
      case "warning":
        return styles.status.warning.button;
      default:
        return styles.status.loading.button;
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <motion.div
        className={`${styles.instanceCard.background} hover:${styles.instanceCard.hover} rounded-lg overflow-hidden shadow-lg border ${styles.instanceCard.border}`}
        variants={animations.card}
        initial="rest"
        whileHover="hover"
        animate={isHovered ? "hover" : "rest"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Barra de progreso */}
        <div className="w-full h-1 bg-gray-100 dark:bg-stone-800 relative overflow-hidden">
          <motion.div
            className={`h-full ${getStatusColor()}`}
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <motion.div
                variants={animations.icon}
                whileHover="hover"
                className={`p-2 rounded-md mr-3 ${
                  status === "success"
                    ? styles.status.success.text
                    : status === "warning"
                      ? styles.status.warning.text
                      : styles.status.loading.text
                }`}
                animate={controls}
              >
                {getStatusIcon()}
              </motion.div>

              <div>
                <h3 className="text-sm font-medium ${styles.text}">
                  {getStatusText()}
                </h3>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`progress-${Math.floor(progress / 10)}`}
                    variants={animations.progressText}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {progress}% completado
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0,0,0,0.05)",
                transition: { duration: 0.15 },
              }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => {
                if (onToggleStatus) {
                  const nextStatus =
                    status === "success"
                      ? "loading"
                      : status === "warning"
                        ? "loading"
                        : "warning";
                  onToggleStatus(nextStatus);
                }
              }}
              aria-label="Cambiar estado"
            >
              <motion.div
                animate={{ rotateY: status === "warning" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronRight
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
              </motion.div>
            </motion.button>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{
                scale: 1.02,
                y: -1,
                transition: { duration: 0.15 },
              }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${getButtonStyles()}`}
              style={{
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {status === "success" ? "Ver detalles" : "Continuar"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
