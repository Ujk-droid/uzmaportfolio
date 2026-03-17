"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconCpu, IconGridDots, IconCircleDotted, IconActivity, IconServer, IconBolt } from "@tabler/icons-react";

interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  subMetrics?: { label: string; value: string }[];
}

export function SystemSenseSection() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      label: "CPU Usage",
      value: 0,
      unit: "%",
      icon: IconCpu,
      color: "from-indigo-500 to-purple-500",
      subMetrics: [
        { label: "Cores Active", value: "8/8" },
        { label: "Threads", value: "16" },
      ],
    },
    {
      label: "Memory",
      value: 0,
      unit: "GB",
      icon: IconGridDots,
      color: "from-purple-500 to-pink-500",
      subMetrics: [
        { label: "Total", value: "16 GB" },
        { label: "Available", value: "8.2 GB" },
      ],
    },
    {
      label: "Storage",
      value: 0,
      unit: "%",
      icon: IconCircleDotted,
      color: "from-pink-500 to-rose-500",
      subMetrics: [
        { label: "Used", value: "256 GB" },
        { label: "Total", value: "512 GB" },
      ],
    },
    {
      label: "Network",
      value: 0,
      unit: "Mbps",
      icon: IconActivity,
      color: "from-cyan-500 to-blue-500",
      subMetrics: [
        { label: "Upload", value: "45 Mbps" },
        { label: "Download", value: "120 Mbps" },
      ],
    },
  ]);

  const [systemStatus, setSystemStatus] = useState<"optimal" | "good" | "warning">("optimal");
  const [uptime, setUptime] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as loaded on client-side to avoid hydration mismatch
    setIsLoaded(true);

    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.label === "Network"
            ? Math.floor(Math.random() * 100) + 20
            : metric.label === "Memory"
            ? Math.floor(Math.random() * 4) + 6
            : Math.floor(Math.random() * 30) + 40,
        }))
      );

      // Update system status based on CPU usage
      setMetrics((current) => {
        const cpuMetric = current.find((m) => m.label === "CPU Usage");
        if (cpuMetric) {
          if (cpuMetric.value > 80) {
            setSystemStatus("warning");
          } else if (cpuMetric.value > 50) {
            setSystemStatus("good");
          } else {
            setSystemStatus("optimal");
          }
        }
        return current;
      });

      // Update uptime
      setUptime((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case "optimal":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "good":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "warning":
        return "text-red-400 bg-red-500/10 border-red-500/30";
    }
  };

  const getStatusText = () => {
    switch (systemStatus) {
      case "optimal":
        return "System Optimal";
      case "good":
        return "System Good";
      case "warning":
        return "System Warning";
    }
  };

  return (
    <section className="py-16 bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4">
            <IconBolt className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">AI Command Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            System{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Sense
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Real-time monitoring of system resources and performance metrics
          </p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${getStatusColor()} backdrop-blur-sm`}>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IconServer className="w-5 h-5" />
            </motion.div>
            <span className="font-semibold">{getStatusText()}</span>
            <span className="text-sm opacity-70">Uptime: {formatUptime(uptime)}</span>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm overflow-hidden">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="text-xs font-medium text-zinc-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    LIVE
                  </motion.div>
                </div>

                {/* Value */}
                <div className="mb-4">
                  <motion.div
                    className="text-3xl font-bold text-white"
                    key={metric.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {metric.value}
                    <span className="text-lg text-zinc-400 ml-1">{metric.unit}</span>
                  </motion.div>
                  <div className="text-sm text-zinc-500 mt-1">{metric.label}</div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(metric.value / (metric.label === "Memory" ? 16 : 100)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Sub metrics */}
                {metric.subMetrics && (
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <div className="grid grid-cols-2 gap-2">
                      {metric.subMetrics.map((sub) => (
                        <div key={sub.label}>
                          <div className="text-xs text-zinc-500">{sub.label}</div>
                          <div className="text-sm font-medium text-zinc-300">{sub.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 -z-20 rounded-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Revenue Tracking Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-xs text-zinc-500 mb-1">Revenue Tracked</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                125,000 PKR
              </div>
            </div>
            <div className="w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-xs text-zinc-500 mb-1">Automation Rate</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                94.5%
              </div>
            </div>
            <div className="w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-xs text-zinc-500 mb-1">Tasks Automated</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                2,847
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
