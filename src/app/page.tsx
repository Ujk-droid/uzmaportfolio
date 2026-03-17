"use client";

import { Navigation } from "@/components/navigation/navigation";
import { HeroSection } from "@/components/hero/hero-section";
import { Footer } from "@/components/footer/footer";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconCode, IconRocket, IconMessageStar } from "@tabler/icons-react";
import { FloatingParticles3D, MouseGlow, GradientOrb } from "@/components/ui/floating-particles-3d";

export default function HomePage() {
  // Animation variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-hidden">
      <MouseGlow color="rgba(124, 58, 237, 0.15)" size={600} />
      <Navigation />
      <HeroSection />

      {/* Quick Links Section - Enhanced with 3D effects and scroll animations */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <GradientOrb position="top-right" size={600} color="rgba(124, 58, 237, 0.25)" opacity={0.5} animated />
        <GradientOrb position="bottom-left" size={500} color="rgba(6, 182, 212, 0.25)" opacity={0.4} animated />
        <GradientOrb position="center" size={400} color="rgba(236, 72, 153, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={40} mouseInteraction className="absolute inset-0" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-sm font-medium text-indigo-200 backdrop-blur-sm">
                Explore More
              </span>
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Explore My{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
                Work
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-zinc-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Navigate through my services, projects, and get in touch
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Services Card - Enhanced 3D */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="relative h-full p-8 rounded-3xl glass-card glass-card-hover border border-violet-500/30 hover:border-violet-400/50 transform-style-3d transition-all duration-500 overflow-hidden">
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_40px_-5px_rgba(124,58,237,0.6)]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconCode className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    Services
                  </h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    Full-stack development, AI automation, and API integrations for modern businesses
                  </p>
                  <span className="inline-flex items-center gap-2 text-violet-400 font-medium group-hover:gap-4 transition-all duration-300">
                    Learn more <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-violet-400/40 transition-colors duration-300" />
                
                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
              </div>
            </motion.div>

            {/* Projects Card - Enhanced 3D */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="relative h-full p-8 rounded-3xl glass-card glass-card-hover border border-cyan-500/30 hover:border-cyan-400/50 transform-style-3d transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600/20 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_40px_-5px_rgba(6,182,212,0.6)]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconRocket className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    Projects
                  </h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    Explore my portfolio of successful projects showcasing innovation and excellence
                  </p>
                  <span className="inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-4 transition-all duration-300">
                    View all <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-400/40 transition-colors duration-300" />
                
                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-pink-500/50 group-hover:bg-pink-400 transition-colors" />
              </div>
            </motion.div>

            {/* Contact Card - Enhanced 3D */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="relative h-full p-8 rounded-3xl glass-card glass-card-hover border border-pink-500/30 hover:border-pink-400/50 transform-style-3d transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-600/20 via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_40px_-5px_rgba(244,114,182,0.6)]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconMessageStar className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
                    Contact
                  </h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    Ready to start your project? Let&apos;s discuss how I can help
                  </p>
                  <span className="inline-flex items-center gap-2 text-pink-400 font-medium group-hover:gap-4 transition-all duration-300">
                    Get in touch <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-pink-400/40 transition-colors duration-300" />
                
                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-pink-500/50 group-hover:bg-pink-400 transition-colors" />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-rose-500/50 group-hover:bg-rose-400 transition-colors" />
              </div>
            </motion.div>
          </motion.div>

          {/* Additional CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg overflow-hidden shadow-[0_10px_50px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(124,58,237,0.7)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Let&apos;s Work Together
                  <IconArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
