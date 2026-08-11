"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

interface PricingProps {
  isOpen: boolean
  onClose: () => void
}

const features = {
  standard: [
    { text: "1x Custom High-Quality GFX Design", included: true },
    { text: "Max 2 Revision Rounds", included: true },
    { text: "Standard 3-Day Delivery Turnaround", included: true },
    { text: "Bulk Order Restriction: For orders of 3+ designs, please contact directly", included: true },
  ],
  premium: [
    { text: "1x Custom High-Quality GFX Design", included: true },
    { text: "Unlimited Revision Requests", included: true },
    { text: "Priority 24-Hour Express Delivery", included: true },
    { text: "High-Priority Project Queue Placement", included: true },
    { text: "1-Month Post-Delivery Archive Storage Guarantee", included: true },
    { text: "ADD-ON BONUS: Add a 2nd 'Standard' design for just 20-25R$ (FREE if paying with Full Nitro)", included: true },
    { text: "Bulk Order Info: To purchase multiple premium slots, please contact directly", included: true },
  ],
}

export function Pricing({ isOpen, onClose }: PricingProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/75 p-4 backdrop-blur-xl sm:p-6 md:p-8"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 sm:top-8 left-6 sm:left-8 text-white hover:text-white/70 transition-colors z-50"
            aria-label="Close pricing"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.button>

          {/* Main Content Container */}
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 sm:mb-4">
                Pricing Plans
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-light">
                Choose the perfect plan for your GFX design needs
              </p>
            </motion.div>

            {/* Pricing Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8"
            >
              {/* Standard Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/[0.09] shadow-2xl shadow-black/30 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:border-white/45 hover:bg-white/[0.14]"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-6 sm:p-8 h-full flex flex-col justify-between">
                  {/* Title */}
                  <div>
                    <h3 className="font-sans text-2xl sm:text-3xl font-light tracking-tight text-white mb-6 sm:mb-8">
                      Standard Tier
                    </h3>

                    {/* Price Section - Always Visible */}
                    <div className="mb-8 sm:mb-10">
                      <div className="space-y-2 sm:space-y-3">
                        <p className="font-mono text-xs sm:text-sm text-white/70">STARTING AT</p>
                        <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white">
                          50-60 R$
                        </p>
                        <p className="text-white/50 text-xs sm:text-sm font-mono pt-2">OR</p>
                        <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white pt-1">
                          1 Basic Nitro
                        </p>
                        <p className="text-white/40 text-xs sm:text-sm font-mono pt-1">
                          ($2.99 USD)
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                      {features.standard.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                          className="flex gap-3 sm:gap-4 items-start"
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/70 font-light leading-snug">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="mailto:demigod.business1@gmail.com?subject=Standard%20GFX%20Order%20Inquiry&body=Hi%20Demigod%2C%0A%0AI%27d%20like%20to%20order%20the%20Standard%20Tier.%0A%0AProject%20details%3A"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 sm:py-4 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 hover:border-white/50 text-center block"
                  >
                    Select Plan
                  </motion.a>
                </div>
              </motion.div>

              {/* Premium Card - Recommended */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/35 bg-white/[0.12] shadow-2xl shadow-purple-950/30 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:border-white/60 hover:bg-white/[0.18] md:scale-105 md:origin-center"
              >
                {/* Recommended Badge */}
                <div className="absolute top-0 right-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-l border-white/30 text-purple-300 text-xs sm:text-sm font-mono tracking-widest">
                  RECOMMENDED
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-6 sm:p-8 h-full flex flex-col justify-between">
                  {/* Title */}
                  <div>
                    <h3 className="font-sans text-2xl sm:text-3xl font-light tracking-tight text-white mb-6 sm:mb-8">
                      Premium Tier
                    </h3>

                    {/* Price Section - Always Visible */}
                    <div className="mb-8 sm:mb-10">
                      <div className="space-y-2 sm:space-y-3">
                        <p className="font-mono text-xs sm:text-sm text-white/70">STARTING AT</p>
                        <p className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white">
                          80-100 R$
                        </p>
                        <p className="text-white/50 text-xs sm:text-sm font-mono pt-2">OR</p>
                        <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white pt-1">
                          1 Full Nitro
                        </p>
                        <p className="text-white/40 text-xs sm:text-sm font-mono pt-1">
                          ($9.99 USD)
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                      {features.premium.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                          className="flex gap-3 sm:gap-4 items-start"
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/75 font-light leading-snug">
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - Premium Style */}
                  <motion.a
                    href="mailto:demigod.business1@gmail.com?subject=Premium%20GFX%20Order%20Inquiry&body=Hi%20Demigod%2C%0A%0AI%27d%20like%20to%20order%20the%20Premium%20Tier.%0A%0AProject%20details%3A"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 border border-white/30 backdrop-blur-md text-white font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 hover:border-white/50 text-center block"
                  >
                    Select Plan
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
