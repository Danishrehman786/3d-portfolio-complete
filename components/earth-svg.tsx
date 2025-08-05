"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function EarthSVG() {
  const [scrollY, setScrollY] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Calculate scale based on scroll position
      // Scale increases as user scrolls down, decreases when scrolling up
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = currentScrollY / maxScroll
      const newScale = 0.5 + scrollProgress * 1.5 // Scale from 0.5 to 2
      setScale(newScale)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: scale,
          rotate: scrollY * 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        style={{
          opacity: 0.15,
        }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800" className="drop-shadow-2xl">
          <defs>
            {/* Gradients for Earth */}
            <radialGradient id="earthGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="30%" stopColor="#2E5BBA" />
              <stop offset="70%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>

            <radialGradient id="landGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="40%" stopColor="#059669" />
              <stop offset="80%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </radialGradient>

            <radialGradient id="desertGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </radialGradient>

            <radialGradient id="iceGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#F3F4F6" />
              <stop offset="50%" stopColor="#E5E7EB" />
              <stop offset="100%" stopColor="#9CA3AF" />
            </radialGradient>

            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Earth base circle */}
          <circle cx="400" cy="400" r="350" fill="url(#earthGradient)" filter="url(#glow)" />

          {/* Africa */}
          <path
            d="M 400 200 Q 450 250 480 320 Q 470 380 450 420 Q 430 460 400 480 Q 370 460 350 420 Q 330 380 340 320 Q 370 250 400 200 Z"
            fill="url(#landGradient)"
            opacity="0.9"
          />

          {/* Sahara Desert */}
          <path
            d="M 380 220 Q 420 240 440 280 Q 430 310 400 320 Q 370 310 360 280 Q 370 240 380 220 Z"
            fill="url(#desertGradient)"
            opacity="0.8"
          />

          {/* Europe */}
          <path
            d="M 380 180 Q 420 190 440 220 Q 430 240 400 250 Q 370 240 360 220 Q 370 190 380 180 Z"
            fill="url(#landGradient)"
            opacity="0.9"
          />

          {/* Asia (partial) */}
          <path
            d="M 440 200 Q 480 220 500 260 Q 490 300 470 320 Q 450 300 440 260 Q 445 220 440 200 Z"
            fill="url(#landGradient)"
            opacity="0.8"
          />

          {/* Antarctica (bottom) */}
          <path
            d="M 300 650 Q 400 680 500 650 Q 480 700 400 720 Q 320 700 300 650 Z"
            fill="url(#iceGradient)"
            opacity="0.7"
          />

          {/* Arctic (top) */}
          <path
            d="M 300 150 Q 400 120 500 150 Q 480 100 400 80 Q 320 100 300 150 Z"
            fill="url(#iceGradient)"
            opacity="0.7"
          />

          {/* Ocean patterns */}
          <g opacity="0.3">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.circle
                key={i}
                cx={200 + Math.random() * 400}
                cy={200 + Math.random() * 400}
                r={2 + Math.random() * 3}
                fill="#60A5FA"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </g>

          {/* Atmospheric glow */}
          <circle cx="400" cy="400" r="360" fill="none" stroke="url(#earthGradient)" strokeWidth="8" opacity="0.4" />

          <circle cx="400" cy="400" r="370" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  )
}
