"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function EarthBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [scale, setScale] = useState(0.8)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Calculate scale based on scroll position
      // Scale increases as user scrolls down, decreases when scrolling up
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = currentScrollY / maxScroll
      const newScale = 0.6 + scrollProgress * 1.8 // Scale from 0.6 to 2.4
      setScale(newScale)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
      {/* Main Earth Image */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: scale,
          rotate: scrollY * 0.05, // Slow rotation based on scroll
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
        style={{
          opacity: 0.25,
        }}
      >
        <div className="relative">
          {/* Glow effect behind the Earth */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
              width: "120%",
              height: "120%",
              left: "-10%",
              top: "-10%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Earth Image */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-2oMeY9IYWj9apNTbhWT3Yka5A6XM3Y.png"
            alt="Earth"
            className="w-[600px] h-[600px] object-cover rounded-full drop-shadow-2xl"
            style={{
              filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
            }}
          />

          {/* Atmospheric ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
            style={{
              width: "105%",
              height: "105%",
              left: "-2.5%",
              top: "-2.5%",
            }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Outer atmospheric glow */}
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-400/10"
            style={{
              width: "110%",
              height: "110%",
              left: "-5%",
              top: "-5%",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </motion.div>

      {/* Floating particles around Earth */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbital rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: scrollY * -0.02,
          scale: scale * 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
        style={{ opacity: 0.15 }}
      >
        <div className="w-[800px] h-[800px] border border-cyan-400/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: scrollY * 0.03,
          scale: scale * 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
        style={{ opacity: 0.1 }}
      >
        <div className="w-[900px] h-[900px] border border-purple-400/20 rounded-full" />
      </motion.div>

      {/* Constellation effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  )
}
