"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MultiStepLoader } from "@/components/loader/multi-step-loader";
import { SITE_CONFIG } from "@/config/site";
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconSend, IconMapPin, IconPhone, IconSparkles } from "@tabler/icons-react";
import { FloatingParticles3D, GradientOrb } from "@/components/ui/floating-particles-3d";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <MultiStepLoader
        loading={isLoading}
        steps={["Validating", "Processing", "Sending", "Complete"]}
      />

      {/* Background Effects - Enhanced */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <GradientOrb position="top-right" size={600} color="rgba(124, 58, 237, 0.2)" opacity={0.4} animated />
      <GradientOrb position="bottom-left" size={500} color="rgba(6, 182, 212, 0.2)" opacity={0.3} animated />
      <FloatingParticles3D count={35} mouseInteraction className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
                Amazing
              </span>
            </motion.h2>
            <motion.p 
              className="text-zinc-400 text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to transform your ideas into reality? Get in touch and let&apos;s
              discuss how I can help bring your vision to life.
            </motion.p>

            {/* Contact Items - Enhanced with 3D */}
            <div className="space-y-5">
              {/* Phone */}
              <motion.a
                href={`tel:${SITE_CONFIG.phone}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconPhone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Phone</div>
                  <div className="text-white font-medium group-hover:text-violet-300 transition-colors">
                    {SITE_CONFIG.phone}
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-violet-400" />
                </div>
              </motion.a>

              {/* Email 1 */}
              <motion.a
                href={`mailto:${SITE_CONFIG.emails[0]}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Email</div>
                  <div className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                    {SITE_CONFIG.emails[0]}
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.a>

              {/* Email 2 */}
              <motion.a
                href={`mailto:${SITE_CONFIG.emails[1]}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-[0_0_30px_-5px_rgba(244,114,182,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(244,114,182,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Alternative Email</div>
                  <div className="text-white font-medium group-hover:text-pink-300 transition-colors">
                    {SITE_CONFIG.emails[1]}
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-pink-400" />
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-zinc-500/20 hover:border-zinc-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-800 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(100,100,100,0.5)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconBrandGithub className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">GitHub</div>
                  <div className="text-white font-medium group-hover:text-zinc-300 transition-colors">
                    github.com/Ujk-droid
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-zinc-400" />
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconBrandLinkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">LinkedIn</div>
                  <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                    linkedin.com/in/uzma-khan
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-blue-400" />
                </div>
              </motion.a>

              {/* Facebook */}
              <motion.a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconBrandFacebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Facebook</div>
                  <div className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                    facebook.com/uzma
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl glass-card glass-card-hover border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-[0_0_30px_-5px_rgba(244,114,182,0.5)] group-hover:shadow-[0_0_40px_-5px_rgba(244,114,182,0.7)] transition-shadow duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <IconBrandInstagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Instagram</div>
                  <div className="text-white font-medium group-hover:text-pink-300 transition-colors">
                    @_techexavision_official_
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-pink-400" />
                </div>
              </motion.a>
            </div>

            {/* Location badge - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="mt-12 inline-flex items-center gap-3 p-5 rounded-2xl glass-card glass-card-hover border border-violet-500/30"
            >
              <div className="p-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
                <IconMapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-zinc-300 font-medium">Available for remote work worldwide</span>
              <IconSparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Contact Form - Enhanced with 3D glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 rounded-2xl glass-card border border-violet-500/20 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur opacity-0 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 rounded-2xl glass-card border border-cyan-500/20 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur opacity-0 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                  Message
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-5 rounded-2xl glass-card border border-pink-500/20 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur opacity-0 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Submit Button - Enhanced 3D */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full px-8 py-5 rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 text-white font-semibold overflow-hidden shadow-[0_0_50px_-10px_rgba(124,58,237,0.6)] hover:shadow-[0_0_70px_-15px_rgba(124,58,237,0.8)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Send Message
                  <IconSend className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/50 transition-colors duration-300" />
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/0 via-white/10 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
