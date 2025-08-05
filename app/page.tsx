"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import AnimatedBackground from "@/components/animated-background"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingElements from "@/components/floating-elements"
import EarthBackground from "@/components/earth-background"
import Reviews from "@/components/reviews"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Earth Image Background */}
      <EarthBackground />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Reviews />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
