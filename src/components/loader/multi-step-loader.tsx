"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MultiStepLoaderProps {
  loading?: boolean;
  steps?: string[];
  onComplete?: () => void;
}

export function MultiStepLoader({
  loading = false,
  steps = ["Initializing", "Processing", "Finalizing"],
  onComplete,
}: MultiStepLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!loading) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setCurrentStep((prev) => prev + 1);
      } else {
        setCompletedSteps((prev) => [...prev, currentStep]);
        onComplete?.();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading, currentStep, steps.length, onComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm">
      <div className="w-full max-w-md p-8">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-b from-indigo-500 to-purple-500"
              initial={{ height: "0%" }}
              animate={{ height: `${(completedSteps.length / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center gap-4"
              >
                {/* Step Indicator */}
                <motion.div
                  className={cn(
                    "relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2",
                    completedSteps.includes(index)
                      ? "bg-indigo-500 border-indigo-500"
                      : index === currentStep
                      ? "bg-zinc-900 border-indigo-500"
                      : "bg-zinc-900 border-zinc-700"
                  )}
                  animate={
                    index === currentStep
                      ? { scale: [1, 1.1, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, repeat: index === currentStep ? Infinity : 0, repeatDelay: 1 }}
                >
                  {completedSteps.includes(index) ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        index === currentStep ? "text-indigo-500" : "text-zinc-500"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Step Text */}
                <div className="flex-1">
                  <motion.p
                    className={cn(
                      "text-sm font-medium",
                      completedSteps.includes(index) || index === currentStep
                        ? "text-white"
                        : "text-zinc-500"
                    )}
                    animate={
                      index === currentStep
                        ? { opacity: [0.5, 1, 0.5] }
                        : { opacity: 1 }
                    }
                    transition={{ duration: 1.5, repeat: index === currentStep ? Infinity : 0 }}
                  >
                    {step}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-400 text-sm">Please wait while we process your request</p>
        </motion.div>
      </div>
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-500"
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
