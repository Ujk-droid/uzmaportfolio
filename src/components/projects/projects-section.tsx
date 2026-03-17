"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "@/components/globe/globe";
import { PROJECTS } from "@/config/site";
import { ProjectCard } from "@/components/ui/glare-card";
import { VideoModal } from "@/components/ui/video-modal";

export function ProjectsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const handleVideoClick = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Showcasing innovation through complex technical solutions
          </p>
        </motion.div>

        {/* Globe Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <Globe size={280} color="#a855f7" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-sm text-zinc-400">Connectivity</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onVideoClick={handleVideoClick}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects Section */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                More Projects
              </h3>
              <p className="text-zinc-400">
                Additional projects showcasing diverse technical skills
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onVideoClick={handleVideoClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-800 text-white font-medium border border-zinc-700 hover:border-indigo-500 transition-colors"
          >
            Start Your Project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={handleCloseVideo}
        videoSrc={selectedVideo || ""}
        title="Project Demo"
      />
    </section>
  );
}
