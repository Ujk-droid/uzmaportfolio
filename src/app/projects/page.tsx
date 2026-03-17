"use client";

import { Navigation } from "@/components/navigation/navigation";
import { ProjectsSection } from "@/components/projects/projects-section";
import { Footer } from "@/components/footer/footer";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconRocket, IconCode, IconStar, IconLayersOff } from "@tabler/icons-react";
import { FloatingParticles3D, MouseGlow, GradientOrb } from "@/components/ui/floating-particles-3d";
import { Spotlight } from "@/components/ui/spotlight";

const MotionLink = motion.create(Link);

// 3D Floating Icon Component
function FloatingIcon({ icon: Icon, delay = 0, className = "" }: { icon: React.ElementType; delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]">
        <Icon className="w-6 h-6 text-purple-300" />
      </div>
    </motion.div>
  );
}

// 3D Stat Card with Tilt Effect
function StatCard({ number, label, icon: Icon, delay = 0 }: { number: string; label: string; icon: React.ElementType; delay?: number }) {
  const ref = useScroll();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const scale = useSpring(1, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseEnter() {
    scale.set(1.05);
  }

  function handleMouseLeave() {
    scale.set(1);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, z: -50 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(168,85,247,0.4)] group cursor-default"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
        
        <div className="relative z-10 text-center">
          <motion.div
            className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_5px_20px_-5px_rgba(168,85,247,0.5)]"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-purple-300" />
          </motion.div>
          <motion.div
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3"
            whileHover={{ scale: 1.1, z: 20 }}
          >
            {number}
          </motion.div>
          <div className="text-lg text-zinc-300 font-medium">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const opacityOnScroll = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleOnScroll = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-hidden">
      <MouseGlow color="rgba(168, 85, 247, 0.1)" size={600} />
      <Navigation />

      {/* Enhanced Hero Section with 3D effects */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" size={600} color="rgba(168, 85, 247, 0.3)" />
        <Spotlight className="top-20 right-0" size={400} color="rgba(236, 72, 153, 0.25)" />
        <GradientOrb position="top-right" size={700} color="rgba(168, 85, 247, 0.25)" opacity={0.5} animated />
        <GradientOrb position="bottom-left" size={600} color="rgba(6, 182, 212, 0.2)" opacity={0.4} animated />
        <GradientOrb position="center" size={400} color="rgba(236, 72, 153, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={50} mouseInteraction className="absolute inset-0" />

        {/* Floating 3D Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: "1000px" }}>
          <FloatingIcon icon={IconRocket} delay={0} className="top-20 left-10 hidden md:block" />
          <FloatingIcon icon={IconCode} delay={1.5} className="top-40 right-20 hidden md:block" />
          <FloatingIcon icon={IconStar} delay={0.8} className="bottom-20 left-1/4 hidden md:block" />
          <FloatingIcon icon={IconLayersOff} delay={1.2} className="bottom-40 right-1/3 hidden md:block" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ x: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-zinc-300 hover:text-white hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group shadow-[0_5px_20px_-5px_rgba(168,85,247,0.3)]"
              >
                <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 mt-6 leading-tight"
              initial={{ opacity: 0, y: 30, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
              style={{ transformStyle: "preserve-3d", textShadow: "0 10px 30px rgba(255,255,255,0.2)" }}
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent gradient-text-animated block mt-2">
                Projects
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Explore my portfolio of successful projects showcasing innovation
              in full-stack development, AI integration, and automation.
            </motion.p>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full mt-8"
            />
          </motion.div>
        </div>
      </section>

      <ProjectsSection />

      {/* Enhanced Stats Section with 3D cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <GradientOrb position="top-left" size={600} color="rgba(168, 85, 247, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-right" size={700} color="rgba(6, 182, 212, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={40} mouseInteraction className="absolute inset-0" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              By The{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A testament to dedication and excellence
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StatCard
              number="50+"
              label="Projects Completed"
              icon={IconRocket}
              delay={0}
            />
            <StatCard
              number="30+"
              label="Happy Clients"
              icon={IconStar}
              delay={0.2}
            />
            <StatCard
              number="100%"
              label="Success Rate"
              icon={IconCode}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <GradientOrb position="top-right" size={600} color="rgba(236, 72, 153, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-left" size={500} color="rgba(168, 85, 247, 0.2)" opacity={0.3} animated />
        <FloatingParticles3D count={30} mouseInteraction className="absolute inset-0" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            whileInView={{ opacity: 1, y: 0, z: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ perspective: "1000px" }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Have a Project in{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
                Mind?
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s collaborate and bring your vision to life with cutting-edge technology and design
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <MotionLink
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold text-lg overflow-hidden shadow-[0_15px_50px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(168,85,247,0.7)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start a Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IconRocket className="w-5 h-5" />
                  </motion.span>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* 3D depth layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-pink-700 -z-10 translate-y-2 opacity-50 blur-sm" />
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
