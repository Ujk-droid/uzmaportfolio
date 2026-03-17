"use client";

import { Navigation } from "@/components/navigation/navigation";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconMail, IconMapPin, IconPhone, IconMessageStar, IconSparkles, IconRocket, IconCode } from "@tabler/icons-react";
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
      <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur-sm border border-violet-400/30 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)]">
        <Icon className="w-6 h-6 text-violet-300" />
      </div>
    </motion.div>
  );
}

// 3D Contact Info Card
function ContactInfoCard({ icon: Icon, title, info, description, delay = 0, href }: { 
  icon: React.ElementType; 
  title: string; 
  info: string; 
  description: string;
  delay?: number;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const scale = useSpring(1, { stiffness: 150, damping: 20 });

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

  const CardContent = (
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
      className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(124,58,237,0.4)] group cursor-default h-full"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
      
      <div className="relative z-10">
        <motion.div
          className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_5px_20px_-5px_rgba(124,58,237,0.5)]"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-lg text-violet-300 font-medium mb-2">{info}</p>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, z: -50 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{ perspective: "1000px" }}
    >
      {href ? (
        <Link href={href} className="block hover:scale-[1.02] transition-transform duration-300">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </motion.div>
  );
}

export default function ContactPage() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-hidden">
      <MouseGlow color="rgba(124, 58, 237, 0.1)" size={600} />
      <Navigation />

      {/* Hero Section - Enhanced with 3D effects */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" size={600} color="rgba(124, 58, 237, 0.3)" />
        <Spotlight className="top-20 right-0" size={400} color="rgba(6, 182, 212, 0.25)" />
        <GradientOrb position="top-right" size={700} color="rgba(124, 58, 237, 0.25)" opacity={0.5} animated />
        <GradientOrb position="bottom-left" size={600} color="rgba(6, 182, 212, 0.2)" opacity={0.4} animated />
        <GradientOrb position="center" size={400} color="rgba(244, 114, 182, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={50} mouseInteraction className="absolute inset-0" />

        {/* Floating 3D Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: "1000px" }}>
          <FloatingIcon icon={IconMail} delay={0} className="top-20 left-10 hidden md:block" />
          <FloatingIcon icon={IconPhone} delay={1.5} className="top-40 right-20 hidden md:block" />
          <FloatingIcon icon={IconMapPin} delay={0.8} className="bottom-20 left-1/4 hidden md:block" />
          <FloatingIcon icon={IconMessageStar} delay={1.2} className="bottom-40 right-1/3 hidden md:block" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-zinc-300 hover:text-white hover:border-violet-400/50 transition-all duration-300 backdrop-blur-sm group shadow-[0_5px_20px_-5px_rgba(124,58,237,0.3)]"
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
              Get in{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated block mt-2">
                Touch
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to transform your ideas into reality? Let&apos;s discuss
              how I can help bring your vision to life.
            </motion.p>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 rounded-full mt-8"
            />
          </motion.div>
        </div>
      </section>

      <ContactSection />

      {/* Enhanced Contact Info Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <GradientOrb position="top-left" size={600} color="rgba(124, 58, 237, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-right" size={700} color="rgba(6, 182, 212, 0.15)" opacity={0.3} animated />
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
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose your preferred way to reach out
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ContactInfoCard
              icon={IconMail}
              title="Email"
              info="hello@uzma.dev"
              description="Best for project inquiries"
              delay={0}
              href="mailto:hello@uzma.dev"
            />
            <ContactInfoCard
              icon={IconPhone}
              title="Phone"
              info="+1 (555) 123-4567"
              description="Mon-Fri from 9am to 6pm"
              delay={0.2}
              href="tel:+15551234567"
            />
            <ContactInfoCard
              icon={IconMapPin}
              title="Location"
              info="Remote Worldwide"
              description="Available for remote work"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with 3D cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <GradientOrb position="top-right" size={500} color="rgba(244, 114, 182, 0.15)" opacity={0.4} animated />
        <GradientOrb position="bottom-left" size={600} color="rgba(59, 130, 246, 0.15)" opacity={0.3} animated />
        <FloatingParticles3D count={30} mouseInteraction className="absolute inset-0" />

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
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Quick answers to common questions
            </motion.p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateY: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  rotateY: 2,
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                className="group perspective-1000"
                style={{ perspective: "1000px" }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(124,58,237,0.4)]">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold shadow-lg">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400 pl-11 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <GradientOrb position="top-right" size={600} color="rgba(124, 58, 237, 0.2)" opacity={0.4} animated />
        <GradientOrb position="bottom-left" size={500} color="rgba(6, 182, 212, 0.2)" opacity={0.3} animated />
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
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent gradient-text-animated">
                Amazing?
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s create something extraordinary together that pushes the boundaries of innovation
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <MotionLink
                href="#contact-form"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 via-cyan-600 to-violet-600 text-white font-semibold text-lg overflow-hidden shadow-[0_15px_50px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(124,58,237,0.7)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start a Conversation
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IconMessageStar className="w-5 h-5" />
                  </motion.span>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* 3D depth layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-700 to-cyan-700 -z-10 translate-y-2 opacity-50 blur-sm" />
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
