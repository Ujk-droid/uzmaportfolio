"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function AceternityCard({ title, description, icon, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 overflow-hidden",
        "hover:border-zinc-600 hover:shadow-[0_0_50px_-10px_rgba(120,119,198,0.4)]",
        "transition-all duration-500",
        className
      )}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Outer glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon container - Enhanced */}
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] transition-all duration-300 border border-zinc-700/50 group-hover:border-indigo-500/50"
          whileHover={{ rotate: 5 }}
        >
          <motion.div
            className="group-hover:scale-110 transition-transform duration-300"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Title - Enhanced */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
          {title}
        </h3>

        {/* Description - Enhanced */}
        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>

        {/* Arrow indicator */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="text-sm font-medium">Learn more</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}

export function CardContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", className)}>
      {children}
    </div>
  );
}
