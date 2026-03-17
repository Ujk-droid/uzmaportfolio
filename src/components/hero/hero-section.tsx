"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useTransform as useMotionTransform } from "framer-motion";
import { LampContainer, LampContent } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconSparkles, IconCode, IconPalette, IconRocket, IconHexagon3d, IconLayersOff, IconStar } from "@tabler/icons-react";

const MotionLink = motion.create(Link);

// 3D Floating Element Component
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  rotationIntensity?: number;
}

function FloatingElement({ children, delay = 0, distance = 20, rotationIntensity = 5 }: FloatingElementProps) {
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [0, -distance, 0],
        rotateX: [0, rotationIntensity, 0, -rotationIntensity, 0],
        rotateY: [0, rotationIntensity, 0, -rotationIntensity, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
}

// 3D Card Component with Tilt Effect
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const scale = useSpring(isHovered ? 1.08 : 1, { stiffness: 150, damping: 20 });
  const zIndex = useSpring(isHovered ? 10 : 1, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width - 0.5);
      y.set(mouseY / height - 0.5);
    }
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Animated 3D Icon Component
function Animated3DIcon({ icon: Icon, delay = 0 }: { icon: React.ElementType; delay?: number }) {
  return (
    <FloatingElement delay={delay} distance={15} rotationIntensity={8}>
      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-sm border border-indigo-400/40 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)]">
        <Icon className="w-6 h-6 text-indigo-300" />
      </div>
    </FloatingElement>
  );
}

// Scroll Progress Indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}

// 3D Rotating Cube
function RotatingCube({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative w-16 h-16 ${className}`}
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 backdrop-blur-sm" />
    </motion.div>
  );
}

// Floating Orb with Glow
function FloatingOrb({ 
  className = "", 
  color = "indigo",
  size = "md" 
}: { 
  className?: string; 
  color?: "indigo" | "purple" | "pink" | "cyan";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const colorClasses = {
    indigo: "from-indigo-500 to-indigo-700 shadow-indigo-500/50",
    purple: "from-purple-500 to-purple-700 shadow-purple-500/50",
    pink: "from-pink-500 to-pink-700 shadow-pink-500/50",
    cyan: "from-cyan-500 to-cyan-700 shadow-cyan-500/50",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colorClasses[color]} blur-xl opacity-60 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  // Mouse-based parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { stiffness: 100, damping: 30 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 30 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const opacityOnScroll = useMotionTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleOnScroll = useMotionTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleContainerMouseMove(e: React.MouseEvent) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX.set((e.clientX - width / 2) / width);
    mouseY.set((e.clientY - height / 2) / height);
  }

  return (
    <LampContainer className="min-h-screen">
      <ScrollProgress />
      
      {/* Enhanced Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        size={600}
        color="rgba(99, 102, 241, 0.4)"
      />
      <Spotlight
        className="top-20 right-0"
        size={400}
        color="rgba(168, 85, 247, 0.3)"
      />

      {/* 3D Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ perspective: "1000px" }}>
        <Animated3DIcon icon={IconCode} delay={0} />
        <Animated3DIcon icon={IconPalette} delay={1.5} />
        <Animated3DIcon icon={IconSparkles} delay={0.8} />
        <Animated3DIcon icon={IconRocket} delay={2} />
        <Animated3DIcon icon={IconHexagon3d} delay={1.2} />
        <Animated3DIcon icon={IconLayersOff} delay={0.5} />

        {/* Floating geometric shapes with enhanced colors */}
        <FloatingElement delay={0.5} distance={25} rotationIntensity={12}>
          <div className="absolute top-1/4 left-10 w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-400/30 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.4)]" />
        </FloatingElement>
        <FloatingElement delay={1.2} distance={30} rotationIntensity={10}>
          <div className="absolute top-2/3 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)]" />
        </FloatingElement>
        <FloatingElement delay={2} distance={20} rotationIntensity={15}>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-indigo-500/20 backdrop-blur-sm border border-pink-400/30 rotate-45 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.4)]" />
        </FloatingElement>
        <FloatingElement delay={1.8} distance={35} rotationIntensity={8}>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm border border-cyan-400/30 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.4)]" />
        </FloatingElement>

        {/* Floating Orbs */}
        <FloatingOrb color="indigo" size="lg" className="top-1/4 left-1/4 absolute" />
        <FloatingOrb color="purple" size="md" className="top-1/2 right-1/4 absolute" />
        <FloatingOrb color="pink" size="sm" className="bottom-1/4 left-1/3 absolute" />
        <FloatingOrb color="cyan" size="md" className="top-1/3 left-1/2 absolute" />

        {/* Rotating 3D shapes */}
        <RotatingCube className="absolute bottom-1/4 right-1/4" />
      </div>

      <LampContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center relative z-10"
          style={{ perspective: "1000px" }}
        >
          {/* 3D Profile Image with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, z: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative mx-auto mb-8 w-40 h-40 md:w-48 md:h-48 group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated glow rings with 3D effect */}
            <motion.div
              animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-40"
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* Orbiting rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border-2 border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              style={{ transformStyle: "preserve-3d", rotateX: 60 }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border-2 border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              style={{ transformStyle: "preserve-3d", rotateY: 60 }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border-2 border-pink-400/20 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
              style={{ transformStyle: "preserve-3d", rotateX: 45 }}
            />

            {/* Main image container with 3D tilt */}
            <TiltCard className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-800 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.6)] bg-zinc-900">
              <Image
                src="/uzma.jpg"
                alt="Uzma - Full-stack Developer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-transparent to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              />
            </TiltCard>

            {/* Sparkle badge with pulse */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -bottom-2 -right-2 p-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_10px_30px_-5px_rgba(99,102,241,0.7)]"
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              <IconSparkles className="w-5 h-5 text-white" />
            </motion.div>

            {/* Floating particles around image */}
            <AnimatePresence>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                    x: Math.cos((i / 8) * Math.PI * 2) * 120,
                    y: Math.sin((i / 8) * Math.PI * 2) * 120,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                  style={{ left: "50%", top: "50%" }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Badge - Enhanced with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, z: -50 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/40 mb-8 backdrop-blur-sm group cursor-default shadow-[0_10px_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(99,102,241,0.6)] transition-shadow duration-300"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading - Enhanced with 3D text effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight" style={{ perspective: "500px" }}>
            <motion.span
              initial={{ opacity: 0, y: 20, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.6, type: "spring" }}
              className="block bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent"
              style={{ transformStyle: "preserve-3d", textShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
            >
              Building Digital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.7, type: "spring" }}
              className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated"
              style={{ transformStyle: "preserve-3d", textShadow: "0 10px 30px rgba(168,85,247,0.5)" }}
            >
              Excellence
            </motion.span>
          </h1>

          {/* Subtitle - Enhanced */}
          <motion.p
            initial={{ opacity: 0, y: 20, z: -30 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTA Buttons - Enhanced with 3D effects */}
          <motion.div
            initial={{ opacity: 0, y: 20, z: -30 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <MotionLink
              href="/projects"
              whileHover={{ scale: 1.05, y: -8, rotateX: 5, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold overflow-hidden shadow-[0_10px_40px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_25px_60px_-10px_rgba(99,102,241,0.8)] transition-all duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {/* 3D depth layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 -z-10 translate-y-2 opacity-50 blur-sm" />
            </MotionLink>

            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.05, y: -8, rotateX: 5, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-zinc-800/80 backdrop-blur-sm text-white font-semibold border border-zinc-600 hover:border-indigo-400/60 transition-all duration-300 hover:shadow-[0_15px_40px_-5px_rgba(99,102,241,0.4)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="flex items-center gap-2">
                Get in Touch
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              </span>
            </MotionLink>
          </motion.div>

          {/* Stats - Enhanced with 3D cards */}
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-6 md:gap-12 pt-16 border-t border-zinc-700/50"
            style={{ perspective: "1000px" }}
          >
            {[
              { value: "5+", label: "Years Experience", sublabel: "Professional", icon: IconRocket },
              { value: "50+", label: "Projects Delivered", sublabel: "Worldwide", icon: IconCode },
              { value: "30+", label: "Happy Clients", sublabel: "Testimonials", icon: IconSparkles },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, z: -30 }}
                animate={{ opacity: 1, y: 0, z: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1, type: "spring" }}
                className="text-center group cursor-default"
              >
                <TiltCard className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
                  <motion.div
                    className="inline-flex p-2 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-[0_5px_20px_-5px_rgba(99,102,241,0.4)]"
                    whileHover={{ rotateY: 180 }}
                  >
                    <stat.icon className="w-5 h-5 text-indigo-300" />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2"
                    whileHover={{ scale: 1.1, z: 20 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm md:text-base text-zinc-300 font-medium">{stat.label}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.sublabel}</div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </LampContent>
    </LampContainer>
  );
}
