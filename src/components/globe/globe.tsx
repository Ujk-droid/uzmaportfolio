"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GlobeProps {
  className?: string;
  size?: number;
  color?: string;
  showGrid?: boolean;
  showPoints?: boolean;
}

export function Globe({
  className,
  size = 300,
  color = "#6366f1",
  showGrid = true,
  showPoints = true,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      angle += 0.005;

      // Draw globe glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw grid lines (latitude)
      if (showGrid) {
        ctx.strokeStyle = `${color}30`;
        ctx.lineWidth = 0.5;
        for (let lat = -80; lat <= 80; lat += 20) {
          const latRad = (lat * Math.PI) / 180;
          const y = centerY + Math.sin(latRad) * radius * 0.9;
          const r = Math.cos(latRad) * radius * 0.9;
          
          ctx.beginPath();
          ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw grid lines (longitude)
        for (let lon = 0; lon < 360; lon += 30) {
          const lonRad = ((lon + angle * 50) * Math.PI) / 180;
          ctx.beginPath();
          for (let lat = -90; lat <= 90; lat += 10) {
            const latRad = (lat * Math.PI) / 180;
            const x = centerX + Math.cos(lonRad) * Math.cos(latRad) * radius * 0.9;
            const y = centerY + Math.sin(latRad) * radius * 0.9 + Math.sin(lonRad) * Math.cos(latRad) * radius * 0.3;
            
            if (lat === -90) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      // Draw connection points
      if (showPoints) {
        const points = [
          { lat: 40, lon: -75 },  // New York
          { lat: 51, lon: 0 },    // London
          { lat: 35, lon: 139 },  // Tokyo
          { lat: -33, lon: 151 }, // Sydney
          { lat: 19, lon: 72 },   // Mumbai
        ];

        points.forEach((point, i) => {
          const latRad = (point.lat * Math.PI) / 180;
          const lonRad = ((point.lon + angle * 50) * Math.PI) / 180;
          
          const x = centerX + Math.cos(lonRad) * Math.cos(latRad) * radius * 0.9;
          const y = centerY + Math.sin(latRad) * radius * 0.9;

          // Draw point
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();

          // Draw pulse
          ctx.fillStyle = `${color}40`;
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.sin(angle * 2 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connections between points
        ctx.strokeStyle = `${color}20`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        for (let i = 0; i < points.length - 1; i++) {
          const point1 = points[i];
          const point2 = points[i + 1];
          
          const latRad1 = (point1.lat * Math.PI) / 180;
          const lonRad1 = ((point1.lon + angle * 50) * Math.PI) / 180;
          const x1 = centerX + Math.cos(lonRad1) * Math.cos(latRad1) * radius * 0.9;
          const y1 = centerY + Math.sin(latRad1) * radius * 0.9;

          const latRad2 = (point2.lat * Math.PI) / 180;
          const lonRad2 = ((point2.lon + angle * 50) * Math.PI) / 180;
          const x2 = centerX + Math.cos(lonRad2) * Math.cos(latRad2) * radius * 0.9;
          const y2 = centerY + Math.sin(latRad2) * radius * 0.9;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Draw outer ring
      ctx.strokeStyle = `${color}30`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, showGrid, showPoints]);

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </motion.div>
  );
}
