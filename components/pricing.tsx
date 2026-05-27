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
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setRevealed(false)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleRevealPrice = () => {
    setRevealed(true)
  }

  const handleClose = () => {
    setRevealed(false)
    setTimeout(onClose, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background"
        >
          {/* Fade background when price is revealed */}
          <motion.div
            animate={{ opacity: revealed ? 0.6 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black pointer-events-none"
          />

          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-8 left-8 text-white hover:text-white/70 transition-colors z-50"
            aria-label="Close pricing"
          >
            <X className="w-8 h-8" />
          </motion.button>

          {/* Main Content Container */}
          <div className="relative w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Pricing Cards */}
            <motion.div
              animate={{ 
                opacity: revealed ? 0.3 : 1,
                scale: revealed ? 0.95 : 1
              }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {/* Standard Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/8 transition-all duration-300"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-8 md:p-10 h-full flex flex-col justify-between">
                  {/* Title */}
                  <div>
                    <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-white mb-8">
                      Standard Tier
                    </h3>

                    {/* Price Section */}
                    <div className="mb-10">
                      <AnimatePresence mode="wait">
                        {!revealed ? (
                          <motion.button
                            key="hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={handleRevealPrice}
                            className="w-full px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-mono text-sm tracking-wider transition-all duration-300 hover:border-white/50"
                          >
                            View Price
                          </motion.button>
                        ) : (
                          <motion.div
                            key="revealed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-1"
                          >
                            <p className="font-mono text-sm text-white/80">Starting at</p>
                            <p className="font-sans text-4xl md:text-5xl font-light text-white">50-60 R$</p>
                            <p className="text-white/60 text-sm font-mono mt-3">OR</p>
                            <p className="font-sans text-3xl md:text-4xl font-light text-white">1 Basic Nitro</p>
                            <p className="text-white/50 text-xs font-mono mt-2">($2.99 USD)</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {features.standard.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="flex gap-3 items-start"
                        >
                          <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/70 leading-relaxed">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="mailto:demigod.business1@gmail.com?subject=Order%20Standard%20Tier%20GFX"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-10 w-full px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white font-mono text-sm tracking-wider transition-all duration-300 hover:border-white/50 text-center"
                  >
                    Order Now
                  </motion.a>
                </div>
              </motion.div>

              {/* Premium Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/30 bg-white/8 hover:border-white/50 hover:bg-white/12 transition-all duration-300"
              >
                {/* Premium Badge */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Accent Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/15 transition-all duration-300" />

                {/* Content */}
                <div className="relative p-8 md:p-10 h-full flex flex-col justify-between">
                  {/* Premium Label */}
                  <div className="inline-flex items-center gap-2 mb-4 w-fit">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <span className="font-mono text-xs tracking-widest text-white/60 uppercase">Recommended</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-white mb-8">
                      Premium Tier
                    </h3>

                    {/* Price Section */}
                    <div className="mb-10">
                      <AnimatePresence mode="wait">
                        {!revealed ? (
                          <motion.button
                            key="hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={handleRevealPrice}
                            className="w-full px-6 py-3 rounded-lg border border-white/40 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-mono text-sm tracking-wider transition-all duration-300 hover:border-white/60"
                          >
                            View Price
                          </motion.button>
                        ) : (
                          <motion.div
                            key="revealed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-1"
                          >
                            <p className="font-mono text-sm text-white/80">Starting at</p>
                            <p className="font-sans text-4xl md:text-5xl font-light text-white">80-100 R$</p>
                            <p className="text-white/60 text-sm font-mono mt-3">OR</p>
                            <p className="font-sans text-3xl md:text-4xl font-light text-white">1 Full Nitro</p>
                            <p className="text-white/50 text-xs font-mono mt-2">($9.99 USD)</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {features.premium.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="flex gap-3 items-start"
                        >
                          <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/70 leading-relaxed">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - Premium Accent */}
                  <motion.a
                    href="mailto:demigod.business1@gmail.com?subject=Order%20Premium%20Tier%20GFX"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-10 w-full px-6 py-3 rounded-lg border border-white/40 bg-gradient-to-r from-blue-500/30 to-blue-500/10 hover:from-blue-500/40 hover:to-blue-500/20 text-white font-mono text-sm tracking-wider transition-all duration-300 hover:border-white/60 text-center"
                  >
                    Select Plan
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Revealed Pricing Overlay */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  {/* Centered Pricing Focus */}
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-center"
                  >
                    <p className="font-mono text-sm tracking-widest text-white/60 mb-4">PRICING REVEALED</p>
                    <p className="font-sans text-3xl md:text-4xl text-white/80 font-light">
                      Click a button to select your plan
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
