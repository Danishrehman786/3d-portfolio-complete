"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      {/* Floating Code Snippets */}
      <motion.div
        className="absolute top-20 right-10 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3 text-xs font-mono text-cyan-400"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {'<div className="hero">'}
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-10 bg-black/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-3 text-xs font-mono text-purple-400"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      >
        {"const magic = true;"}
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 bg-black/20 backdrop-blur-sm border border-pink-400/30 rounded-lg p-3 text-xs font-mono text-pink-400"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      >
        {"React.createElement()"}
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-cyan-400/40 rounded-full flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-6 h-6 border border-purple-400/40 rotate-45"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        animate={{
          rotate: [45, 405],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1.5,
        }}
      />

      {/* Floating Geometric Shapes */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 border border-white/20 rounded-sm"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}
