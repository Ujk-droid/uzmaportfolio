"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";
import { IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconHeart } from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 bg-zinc-950 border-t border-zinc-800/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/20 pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative text-2xl font-bold text-white">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  uzma
                </span>
                <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  .dev
                </span>
                {/* Hover glow */}
                <span className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <p className="text-sm text-zinc-500 mt-2 text-center md:text-left">
                Building digital excellence
              </p>
            </motion.div>

            {/* Social Links - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-3"
            >
              {[
                { name: "GitHub", href: SITE_CONFIG.social.github, icon: IconBrandGithub, color: "hover:text-white hover:bg-zinc-800 hover:border-zinc-700" },
                { name: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: IconBrandLinkedin, color: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30" },
                { name: "Facebook", href: SITE_CONFIG.social.facebook, icon: IconBrandFacebook, color: "hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30" },
                { name: "Instagram", href: SITE_CONFIG.social.instagram, icon: IconBrandInstagram, color: "hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30" },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative p-3.5 rounded-xl bg-zinc-900/50 text-zinc-400 border border-zinc-800 ${social.color} transition-all duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {social.name}
                  </span>
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Divider with gradient */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - Enhanced */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-500 text-sm text-center md:text-left"
            >
              © {currentYear}{" "}
              <span className="text-zinc-400">{SITE_CONFIG.name}</span>
              . All rights reserved.
            </motion.p>

            {/* Made with love */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-zinc-500 text-sm"
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <IconHeart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
              <span>by Uzma</span>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm"
            >
              <a href="/privacy" className="text-zinc-500 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-zinc-500 hover:text-white transition-colors">
                Terms
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
