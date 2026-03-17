"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlareCard({ children, className, onClick }: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const glareOpacity = useTransform(xSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3]);
  const glareX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["100%", "0%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative perspective-1000",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative h-full w-full rounded-2xl overflow-hidden"
        style={{
          transform: "translateZ(0)",
        }}
      >
        {children}

        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"
          style={{
            opacity: isHovering ? glareOpacity : 0,
            background: `linear-gradient(135deg at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Shine effect */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${x.get() * 50 + 50}% ${y.get() * 50 + 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute -inset-4 rounded-3xl bg-black/40 blur-xl -z-10"
        style={{
          transform: "translateZ(-20px)",
          opacity: isHovering ? 0.6 : 0.3,
          x: useTransform(xSpring, [-0.5, 0.5], [10, -10]),
          y: useTransform(ySpring, [-0.5, 0.5], [10, -10]),
        }}
      />
    </motion.div>
  );
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    video?: string;
    tags: string[];
    link: string;
    type?: "video" | "image" | "external";
    featured?: boolean;
  };
  onVideoClick?: (videoSrc: string) => void;
  className?: string;
}

export function ProjectCard({ project, onVideoClick, className }: ProjectCardProps) {
  const isVideo = project.type === "video" || project.video;

  const handleClick = () => {
    if (isVideo && project.video && onVideoClick) {
      onVideoClick(project.video);
    } else if (project.type === "external" && project.link.startsWith("http")) {
      window.open(project.link, "_blank");
    }
  };

  return (
    <GlareCard
      className={cn("group cursor-pointer h-full", className)}
      onClick={handleClick}
    >
      <div className="relative h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
        {/* Image Container - Fixed height */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Video indicator */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                  style={{ borderLeftWidth: "12px" }}
                />
              </motion.div>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 z-20">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content - Flex grow to fill remaining space */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* External link indicator */}
          {project.type === "external" && (
            <div className="mt-4 flex items-center gap-2 text-xs text-indigo-400">
              <span>View Project</span>
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/0 group-hover:border-indigo-500/30 transition-colors pointer-events-none" />
      </div>
    </GlareCard>
  );
}
