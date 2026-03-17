"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle3D {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface FloatingParticles3DProps {
  count?: number;
  mouseInteraction?: boolean;
  className?: string;
}

export function FloatingParticles3D({
  count = 50,
  mouseInteraction = true,
  className,
}: FloatingParticles3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle3D[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const colors = [
    "rgba(124, 58, 237, 0.6)",  // Violet
    "rgba(6, 182, 212, 0.6)",   // Cyan
    "rgba(244, 114, 182, 0.6)", // Pink
    "rgba(59, 130, 246, 0.6)",  // Blue
    "rgba(168, 85, 247, 0.6)",  // Purple
  ];

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle3D[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(initialParticles);
  }, [count]);

  useEffect(() => {
    if (!mouseInteraction) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseInteraction]);

  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Mouse interaction
          if (mouseInteraction) {
            const dx = mousePos.x - newX;
            const dy = mousePos.y - newY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, (30 - distance) / 30);

            newX -= dx * influence * 0.02;
            newY -= dy * influence * 0.02;
          }

          // Wrap around edges
          if (newX < 0) newX = 100;
          if (newX > 100) newX = 0;
          if (newY < 0) newY = 100;
          if (newY > 100) newY = 0;

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, mouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}
      style={{ perspective: "1000px" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translateZ(${particle.z}px)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

interface MouseGlowProps {
  color?: string;
  size?: number;
  className?: string;
}

export function MouseGlow({ color = "rgba(124, 58, 237, 0.15)", size = 400, className }: MouseGlowProps) {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed pointer-events-none transition-opacity duration-300 ${className || ""}`}
      style={{
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
      }}
    />
  );
}

interface GradientOrbProps {
  color?: string;
  size?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  blur?: number;
  opacity?: number;
  animated?: boolean;
  className?: string;
}

export function GradientOrb({
  color = "rgba(124, 58, 237, 0.3)",
  size = 500,
  position = "top-left",
  blur = 100,
  opacity = 0.5,
  animated = true,
  className,
}: GradientOrbProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} ${className || ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={
        animated
          ? {
              scale: [1, 1.2, 1],
              opacity: [opacity, opacity * 0.7, opacity],
            }
          : {}
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
