"use client";

import { Navigation } from "@/components/navigation/navigation";
import { HeroSection } from "@/components/hero/hero-section";
import { Footer } from "@/components/footer/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconCode, IconRocket, IconMessageStar } from "@tabler/icons-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navigation />
      <HeroSection />

      {/* Quick Links Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950 to-zinc-950" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore My{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Navigate through my services, projects, and get in touch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Services Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/services"
                className="group block p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconCode className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  Services
                </h3>
                <p className="text-zinc-400 mb-4">
                  Full-stack development, AI automation, and API integrations for modern businesses
                </p>
                <span className="inline-flex items-center gap-2 text-indigo-400 font-medium group-hover:gap-3 transition-all">
                  Learn more <IconArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/projects"
                className="group block p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconRocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Projects
                </h3>
                <p className="text-zinc-400 mb-4">
                  Explore my portfolio of successful projects showcasing innovation and excellence
                </p>
                <span className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                  View all <IconArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="group block p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconMessageStar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                  Contact
                </h3>
                <p className="text-zinc-400 mb-4">
                  Ready to start your project? Let&apos;s discuss how I can help
                </p>
                <span className="inline-flex items-center gap-2 text-pink-400 font-medium group-hover:gap-3 transition-all">
                  Get in touch <IconArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
