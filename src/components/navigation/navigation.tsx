"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX, IconArrowUpRight } from "@tabler/icons-react";

const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* Gradient line at bottom when scrolled */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
          />
        )}

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Enhanced */}
            <Link
              href="/"
              className="group relative text-2xl font-bold text-white"
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                uzma
              </span>
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                .khan
              </span>
              {/* Hover glow */}
              <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center gap-2">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                    pathname === item.href
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {/* Active/hover background */}
                  {(pathname === item.href || hoveredItem === item.name) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30"
                    />
                  )}
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                  {/* Dot indicator for active */}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    />
                  )}
                </Link>
              ))}

              {/* Hire Me Button - Enhanced */}
              <Link
                href="/contact"
                className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold overflow-hidden shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.7)] transition-all duration-300 ml-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me
                  <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative p-2.5 rounded-xl text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconX className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconMenu2 className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 md:hidden"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {NAVIGATION.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300",
                          pathname === item.href
                            ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        )}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Hire Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAVIGATION.length * 0.1 }}
                    className="mt-4"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]"
                    >
                      Hire Me
                      <IconArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
