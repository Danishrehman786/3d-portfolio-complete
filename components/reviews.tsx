"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface Review {
  id: number
  name: string
  role: string
  company: string
  rating: number
  comment: string
  avatar: string
}

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentReview, setCurrentReview] = useState(0)
  const [showAddReview, setShowAddReview] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    comment: "",
  })

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      rating: 5,
      comment:
        "Absolutely incredible work! The attention to detail and creativity exceeded all our expectations. The project was delivered on time and the communication throughout was excellent.",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      rating: 5,
      comment:
        "Working with this developer was a game-changer for our business. The innovative solutions and technical expertise helped us achieve our goals faster than we thought possible.",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Agency",
      rating: 5,
      comment:
        "The perfect blend of technical skill and creative vision. Every interaction was professional, and the final product was beyond our wildest dreams. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60&text=ER",
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "InnovateLab",
      rating: 5,
      comment:
        "Outstanding developer with exceptional problem-solving skills. The code quality is top-notch and the user experience is seamless. Will definitely work together again!",
      avatar: "/placeholder.svg?height=60&width=60&text=DK",
    },
  ])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: reviews.length + 1,
      ...newReview,
      avatar: `/placeholder.svg?height=60&width=60&text=${newReview.name
        .split(" ")
        .map((n) => n[0])
        .join("")}`,
    }
    setReviews([...reviews, review])
    setNewReview({ name: "", role: "", company: "", rating: 5, comment: "" })
    setShowAddReview(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
    ))
  }

  return (
    <section ref={ref} className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Client Reviews
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">What my clients say about working with me</p>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <img
                  src={reviews[currentReview].avatar || "/placeholder.svg"}
                  alt={reviews[currentReview].name}
                  className="w-16 h-16 rounded-full border-2 border-cyan-400/30 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{reviews[currentReview].name}</h3>
                  <p className="text-cyan-400">{reviews[currentReview].role}</p>
                  <p className="text-white/60 text-sm">{reviews[currentReview].company}</p>
                </div>
              </div>

              <div className="flex mb-4">{renderStars(reviews[currentReview].rating)}</div>

              <p className="text-lg text-white/80 leading-relaxed italic">"{reviews[currentReview].comment}"</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>

        {/* Review indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentReview ? "bg-cyan-400" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Add Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddReview(true)}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Plus size={20} />
            Add Your Review
          </motion.button>
        </motion.div>

        {/* Add Review Modal */}
        {showAddReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Add Your Review</h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Your Role"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={newReview.company}
                  onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
                  required
                />

                <div>
                  <label className="block text-white mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Your Review"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 resize-none"
                  required
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
