"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconExternalLink } from "@tabler/icons-react";

interface Card {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface CarouselProps {
  cards: Card[];
  className?: string;
}

export function AppleCardsCarousel({ cards, className }: CarouselProps) {
  const [active, setActive] = useState(0);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [cards.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % cards.length);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % cards.length);
      }, 5000);
    }
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + cards.length) % cards.length);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % cards.length);
      }, 5000);
    }
  };

  useEffect(() => {
    controls.start({
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [active, controls]);

  return (
    <div
      ref={carouselRef}
      className={cn("relative w-full max-w-5xl mx-auto py-12", className)}
      onMouseEnter={() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      }}
      onMouseLeave={() => {
        autoplayRef.current = setInterval(() => {
          setActive((prev) => (prev + 1) % cards.length);
        }, 5000);
      }}
    >
      <div className="relative h-[550px] perspective-2000">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, rotateY: 30, x: 400, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -30, x: -400, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <CarouselCard card={cards[active]} index={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex justify-center items-center gap-6 mt-10">
        {/* Previous Button */}
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group p-3.5 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 border border-zinc-700 hover:border-indigo-500/50 shadow-lg hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]"
        >
          <IconArrowLeft className="w-5 h-5 text-white group-hover:text-indigo-300 transition-colors" />
        </motion.button>

        {/* Pagination Dots */}
        <div className="flex gap-2.5">
          {cards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative rounded-full transition-all duration-500",
                index === active
                  ? "w-10 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]"
                  : "w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-600"
              )}
            >
              {index === active && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="group p-3.5 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 border border-zinc-700 hover:border-indigo-500/50 shadow-lg hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]"
        >
          <IconArrowRight className="w-5 h-5 text-white group-hover:text-indigo-300 transition-colors" />
        </motion.button>
      </div>
    </div>
  );
}

function CarouselCard({ card, index }: { card: Card; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="relative h-full w-full group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        {/* Spotlight effect following mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />

        {/* Image with enhanced overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${card.image})` }}
        />
        
        {/* Gradient overlays - Enhanced */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950/95 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
        
        {/* Corner accents */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700">
            <IconExternalLink className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          {/* Tags - Enhanced */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {card.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="px-3.5 py-1.5 text-sm bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 rounded-full border border-indigo-500/30 backdrop-blur-sm font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Title - Enhanced */}
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300"
          >
            {card.title}
          </motion.h3>

          {/* Description - Enhanced */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-300 text-base md:text-lg mb-6 line-clamp-2"
          >
            {card.description}
          </motion.p>

          {/* View Project Link */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300 transition-colors"
          >
            <span className="font-semibold">View Project</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <IconArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
