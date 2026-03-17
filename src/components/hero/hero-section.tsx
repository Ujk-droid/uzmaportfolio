"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer, LampContent } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";

const MotionLink = motion.create(Link);

export function HeroSection() {
  return (
    <LampContainer className="min-h-screen">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        size={500}
        color="rgba(99, 102, 241, 0.3)"
      />

      <LampContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          {/* Profile Image - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto mb-8 w-40 h-40 md:w-48 md:h-48 group"
          >
            {/* Animated glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <motion.div
              className="absolute -inset-2 rounded-full border border-indigo-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-4 rounded-full border border-purple-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-900">
              <Image
                src="/ujk1.png"
                alt="Uzma - Full-stack Developer"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Sparkle badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
            >
              <IconSparkles className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          {/* Badge - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 mb-8 backdrop-blur-sm group cursor-default"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading - Enhanced */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="block bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent"
            >
              Building Digital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated"
            >
              Excellence
            </motion.span>
          </h1>

          {/* Subtitle - Enhanced */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTA Buttons - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <MotionLink
              href="/projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold overflow-hidden shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.7)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </MotionLink>

            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-zinc-800/80 backdrop-blur-sm text-white font-semibold border border-zinc-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
            >
              <span className="flex items-center gap-2">
                Get in Touch
                <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:animate-pulse" />
              </span>
            </MotionLink>
          </motion.div>

          {/* Stats - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-6 md:gap-12 pt-16 border-t border-zinc-800/50"
          >
            {[
              { value: "5+", label: "Years Experience", sublabel: "Professional" },
              { value: "50+", label: "Projects Delivered", sublabel: "Worldwide" },
              { value: "30+", label: "Happy Clients", sublabel: "Testimonials" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="text-center group cursor-default"
              >
                <motion.div
                  className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm md:text-base text-zinc-400 font-medium">{stat.label}</div>
                <div className="text-xs text-zinc-600 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </LampContent>
    </LampContainer>
  );
}
