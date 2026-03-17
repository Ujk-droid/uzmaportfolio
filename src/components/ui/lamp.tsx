"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode, useRef, useEffect, useState } from "react";

interface LampContainerProps {
  children: ReactNode;
  className?: string;
}

export function LampContainer({ children, className }: LampContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleData, setParticleData] = useState<Array<{ x: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate particle data on client-side only to avoid hydration mismatch
    setParticleData(
      Array(5).fill(null).map(() => ({
        x: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2.5,
      }))
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 w-full rounded-md z-0",
        className
      )}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-zinc-950 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />

      {/* Animated background glow following mouse */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 0.05,
          x: mousePosition.x * 20 - 10,
          y: mousePosition.y * 20 - 10,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
      />

      {/* Lamp Light Effect - Enhanced */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0.6,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-b from-amber-50/15 via-transparent to-transparent blur-3xl"
      />

      {/* Lamp Cone - Enhanced */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 0.9 : 0.5,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="w-full h-full bg-gradient-to-b from-amber-100/25 via-amber-200/8 to-transparent blur-xl"
          style={{
            clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Secondary light cone */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl"
          style={{
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Lamp Bulb - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
      >
        {/* Outer glow */}
        <div className="w-20 h-20 bg-amber-100 rounded-full blur-md shadow-[0_0_80px_30px_rgba(251,191,36,0.4)]" />
        {/* Inner bright core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full blur-sm" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleData.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/50 rounded-full"
            initial={{
              x: `${particleData[i].x}%`,
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: "100vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particleData[i].duration,
              repeat: Infinity,
              delay: particleData[i].delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full px-4">
        {children}
      </div>
    </div>
  );
}

export function LampContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={cn("text-center", className)}
    >
      {children}
    </motion.div>
  );
}
