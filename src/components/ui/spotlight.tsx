"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function Spotlight({
  className,
  size = 400,
  color = "rgba(99, 102, 241, 0.15)",
  opacity = 0.8,
}: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    controls.start({
      x: mouseX.get() - size / 2,
      y: mouseY.get() - size / 2,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  }, [mouseX, mouseY, controls, size]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {/* Main spotlight */}
      <motion.div
        animate={controls}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity,
          filter: "blur(60px)",
        }}
      />
      
      {/* Secondary glow layer */}
      <motion.div
        animate={controls}
        className="absolute rounded-full"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          background: `radial-gradient(circle, ${color.replace("0.15", "0.25")} 0%, transparent 70%)`,
          opacity: opacity * 0.5,
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all duration-500",
        isHovered && "border-zinc-700 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]",
        className
      )}
    >
      {/* Spotlight glow effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 40px rgba(99, 102, 241, 0.1)`,
        }}
      />
      
      <div className="relative h-full">{children}</div>
    </div>
  );
}
