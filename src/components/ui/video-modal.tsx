"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconPlayerPlay, IconPlayerPause, IconVolume2, IconVolumeOff } from "@tabler/icons-react";
import React, { useRef, useState, useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export function VideoModal({ isOpen, onClose, videoSrc, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-play when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = "unset";
      // Pause and reset when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setProgress(0);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress || 0);
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
          >
            <IconX className="w-6 h-6" />
          </motion.button>

          {/* Title */}
          {title && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 z-50"
            >
              <h3 className="text-white font-semibold text-lg">{title}</h3>
            </motion.div>
          )}

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
          >
            {/* Video wrapper */}
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden bg-black shadow-2xl",
                "border border-zinc-800"
              )}
            >
              {/* Video element */}
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-auto max-h-[70vh] object-contain"
                onClick={togglePlay}
                muted={isMuted}
                playsInline
              />

              {/* Play overlay when paused */}
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  onClick={togglePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 cursor-pointer"
                  >
                    <IconPlayerPlay className="w-10 h-10 text-white ml-1" />
                  </motion.div>
                </motion.div>
              )}

              {/* Controls overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              >
                {/* Progress bar */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-zinc-400 w-10 text-right">
                    {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                  />
                  <span className="text-xs text-zinc-400 w-10">
                    {videoRef.current ? formatTime(videoRef.current.duration) : "0:00"}
                  </span>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause button */}
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {isPlaying ? (
                        <IconPlayerPause className="w-6 h-6 text-white" />
                      ) : (
                        <IconPlayerPlay className="w-6 h-6 text-white" />
                      )}
                    </button>

                    {/* Volume button */}
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {isMuted ? (
                        <IconVolumeOff className="w-5 h-5 text-white" />
                      ) : (
                        <IconVolume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>

                  {/* Quality badge */}
                  <div className="px-2 py-1 rounded bg-zinc-800/80 text-xs text-zinc-400 font-medium">
                    HD
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10 rounded-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
