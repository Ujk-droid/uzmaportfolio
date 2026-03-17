"use client";

import { Navigation } from "@/components/navigation/navigation";
import { ServicesSection } from "@/components/services/services-section";
import { Footer } from "@/components/footer/footer";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconCode, IconCpu, IconPlugConnected, IconRocket, IconSparkles, IconWand } from "@tabler/icons-react";
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
      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-400/30 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)]">
        <Icon className="w-6 h-6 text-indigo-300" />
      </div>
    </motion.div>
  );
}

// 3D Service Feature Card
function FeatureCard({ icon: Icon, title, description, delay = 0, color = "indigo" }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay?: number;
  color?: "indigo" | "purple" | "cyan";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const scale = useSpring(1, { stiffness: 150, damping: 20 });

  const colorVariants = {
    indigo: {
      from: "from-indigo-500/10",
      to: "to-purple-500/10",
      border: "border-indigo-400/20",
      hoverBorder: "hover:border-indigo-400/40",
      iconBg: "from-indigo-500/30 to-purple-500/30",
      text: "from-indigo-300 to-purple-300",
      glow: "rgba(99,102,241,0.4)",
    },
    purple: {
      from: "from-purple-500/10",
      to: "to-pink-500/10",
      border: "border-purple-400/20",
      hoverBorder: "hover:border-purple-400/40",
      iconBg: "from-purple-500/30 to-pink-500/30",
      text: "from-purple-300 to-pink-300",
      glow: "rgba(168,85,247,0.4)",
    },
    cyan: {
      from: "from-cyan-500/10",
      to: "to-blue-500/10",
      border: "border-cyan-400/20",
      hoverBorder: "hover:border-cyan-400/40",
      iconBg: "from-cyan-500/30 to-blue-500/30",
      text: "from-cyan-300 to-blue-300",
      glow: "rgba(6,182,212,0.4)",
    },
  };

  const colors = colorVariants[color];

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
        className={`relative p-8 rounded-3xl bg-gradient-to-br ${colors.from} ${colors.to} border ${colors.border} ${colors.hoverBorder} transition-all duration-300 shadow-[0_10px_40px_-15px_${colors.glow}] group cursor-default`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

        <div className="relative z-10">
          <motion.div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colors.iconBg} mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_5px_20px_-5px_rgba(99,102,241,0.5)]`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">{title}</h3>
          <p className="text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-hidden">
      <MouseGlow color="rgba(99, 102, 241, 0.1)" size={600} />
      <Navigation />

      {/* Enhanced Hero Section with 3D effects */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" size={600} color="rgba(99, 102, 241, 0.3)" />
        <Spotlight className="top-20 right-0" size={400} color="rgba(168, 85, 247, 0.25)" />
        <GradientOrb position="top-right" size={700} color="rgba(99, 102, 241, 0.25)" opacity={0.5} animated />
        <GradientOrb position="bottom-left" size={600} color="rgba(6, 182, 212, 0.2)" opacity={0.4} animated />
        <GradientOrb position="center" size={400} color="rgba(168, 85, 247, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={50} mouseInteraction className="absolute inset-0" />

        {/* Floating 3D Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: "1000px" }}>
          <FloatingIcon icon={IconCode} delay={0} className="top-20 left-10 hidden md:block" />
          <FloatingIcon icon={IconCpu} delay={1.5} className="top-40 right-20 hidden md:block" />
          <FloatingIcon icon={IconPlugConnected} delay={0.8} className="bottom-20 left-1/4 hidden md:block" />
          <FloatingIcon icon={IconWand} delay={1.2} className="bottom-40 right-1/3 hidden md:block" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-zinc-300 hover:text-white hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm group shadow-[0_5px_20px_-5px_rgba(99,102,241,0.3)]"
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
              My{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent gradient-text-animated block mt-2">
                Services
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Comprehensive solutions for modern businesses. From full-stack development
              to AI-powered automation and complex API integrations.
            </motion.p>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full mt-8"
            />
          </motion.div>
        </div>
      </section>

      <ServicesSection />

      {/* Enhanced Features Section with 3D cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <GradientOrb position="top-left" size={600} color="rgba(99, 102, 241, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-right" size={700} color="rgba(168, 85, 247, 0.15)" opacity={0.3} animated />
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
              Why Choose{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                My Services
              </span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Delivering excellence through innovation and expertise
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={IconRocket}
              title="Fast Delivery"
              description="Quick turnaround times without compromising on quality or attention to detail"
              delay={0}
              color="indigo"
            />
            <FeatureCard
              icon={IconSparkles}
              title="Premium Quality"
              description="Top-tier code quality with best practices, clean architecture, and scalability"
              delay={0.2}
              color="purple"
            />
            <FeatureCard
              icon={IconCpu}
              title="AI Integration"
              description="Cutting-edge AI solutions to automate workflows and enhance productivity"
              delay={0.4}
              color="cyan"
            />
            <FeatureCard
              icon={IconPlugConnected}
              title="API Expertise"
              description="Seamless integrations with third-party services and custom API development"
              delay={0.6}
              color="indigo"
            />
            <FeatureCard
              icon={IconWand}
              title="Custom Solutions"
              description="Tailored solutions designed specifically for your unique business needs"
              delay={0.8}
              color="purple"
            />
            <FeatureCard
              icon={IconCode}
              title="Full-Stack Dev"
              description="End-to-end development from frontend UI to backend infrastructure"
              delay={1}
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <GradientOrb position="top-right" size={600} color="rgba(168, 85, 247, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-left" size={500} color="rgba(99, 102, 241, 0.2)" opacity={0.3} animated />
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
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent gradient-text-animated">
                Project?
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s discuss how I can help transform your ideas into reality with innovative solutions
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <MotionLink
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold text-lg overflow-hidden shadow-[0_15px_50px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(99,102,241,0.7)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get in Touch
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-700 to-purple-700 -z-10 translate-y-2 opacity-50 blur-sm" />
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
