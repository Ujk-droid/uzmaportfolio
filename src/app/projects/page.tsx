"use client";

import { Navigation } from "@/components/navigation/navigation";
import { ProjectsSection } from "@/components/projects/projects-section";
import { Footer } from "@/components/footer/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
            >
              <IconArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              Explore my portfolio of successful projects showcasing innovation 
              in full-stack development, AI integration, and automation.
            </p>
          </motion.div>
        </div>
      </section>

      <ProjectsSection />

      {/* Additional Projects Info */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "30+", label: "Happy Clients" },
                { number: "100%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate and bring your vision to life
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-shadow"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
