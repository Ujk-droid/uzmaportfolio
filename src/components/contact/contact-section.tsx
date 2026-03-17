"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MultiStepLoader } from "@/components/loader/multi-step-loader";
import { SITE_CONFIG } from "@/config/site";
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconSend, IconMapPin, IconPhone } from "@tabler/icons-react";

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
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      <MultiStepLoader
        loading={isLoading}
        steps={["Validating", "Processing", "Sending", "Complete"]}
      />

      {/* Background Effects - Enhanced */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
                Amazing
              </span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Ready to transform your ideas into reality? Get in touch and let&apos;s
              discuss how I can help bring your vision to life.
            </p>

            {/* Contact Items - Enhanced */}
            <div className="space-y-6">
              {/* Phone */}
              <motion.a
                href={`tel:${SITE_CONFIG.phone}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] transition-shadow duration-300">
                  <IconPhone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Phone</div>
                  <div className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                    {SITE_CONFIG.phone}
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-indigo-400" />
                </div>
              </motion.a>

              {/* Email 1 */}
              <motion.a
                href={`mailto:${SITE_CONFIG.emails[0]}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] transition-shadow duration-300">
                  <IconMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-0.5">Email</div>
                  <div className="text-white font-medium group-hover:text-purple-300 transition-colors">
                    {SITE_CONFIG.emails[0]}
                  </div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconSend className="w-5 h-5 text-purple-400" />
                </div>
              </motion.a>

              {/* Email 2 */}
              <motion.a
                href={`mailto:${SITE_CONFIG.emails[1]}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] transition-shadow duration-300">
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
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-800 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(100,100,100,0.4)] transition-shadow duration-300">
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
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] transition-shadow duration-300">
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
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] transition-shadow duration-300">
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
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] transition-shadow duration-300">
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

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 w-fit"
            >
              <IconMapPin className="w-5 h-5 text-indigo-400" />
              <span className="text-zinc-300 font-medium">Available for remote work worldwide</span>
            </motion.div>
          </motion.div>

          {/* Contact Form - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Submit Button - Enhanced */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold overflow-hidden shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.7)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <IconSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
