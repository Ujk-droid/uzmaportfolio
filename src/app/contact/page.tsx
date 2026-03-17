"use client";

import { Navigation } from "@/components/navigation/navigation";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
        
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
              Get in{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              Ready to transform your ideas into reality? Let&apos;s discuss 
              how I can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <ContactSection />

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "What is your typical project timeline?",
                  answer: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications can take 2-6 months."
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, I offer maintenance and support packages to ensure your project continues to perform optimally after launch."
                },
                {
                  question: "What technologies do you specialize in?",
                  answer: "I specialize in Next.js, React, Node.js, Python, and various API integrations including Odoo, n8n, and Twilio."
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
