"use client";

import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "@/config/site";
import { IconCode, IconBrain, IconApi, IconCloud } from "@tabler/icons-react";

const iconMap: Record<string, React.ElementType> = {
  Code: IconCode,
  Brain: IconBrain,
  Api: IconApi,
  Cloud: IconCloud,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4">
            <span className="text-sm font-medium text-indigo-300">What I Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
              Services
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Comprehensive solutions for modern business challenges
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || IconCode;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm overflow-hidden">
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] transition-shadow duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 group-hover:border-indigo-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-tr-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

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
            Discuss Your Project
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
    </section>
  );
}
