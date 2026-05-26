"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"

const pricingTiers = [
  {
    id: 1,
    title: "Standard Tier",
    robuxPrice: "50-60R$",
    nitroTier: "1 Basic Nitro",
    usdPrice: "$2.99 USD",
    isRecommended: false,
    features: [
      "1x Custom High-Quality GFX Design",
      "Max 2 Revision Rounds",
      "Standard 3-Day Delivery Turnaround",
      "Bulk Order Restriction: For orders of 3+ designs, please contact directly",
    ],
  },
  {
    id: 2,
    title: "Premium Tier",
    robuxPrice: "80-100R$",
    nitroTier: "1 Full Nitro",
    usdPrice: "$9.99 USD",
    isRecommended: true,
    features: [
      "1x Custom High-Quality GFX Design",
      "Unlimited Revision Requests",
      "Priority 24-Hour Express Delivery",
      "High-Priority Project Queue Placement",
      "1-Month Post-Delivery Archive Storage Guarantee",
      "ADD-ON BONUS: Add a 2nd 'Standard' design for just 20-25R$ (FREE if paying with Full Nitro)",
      "Bulk Order Info: To purchase multiple premium slots, please contact directly",
    ],
  },
]

interface PricingProps {
  isOpen: boolean
  onClose: () => void
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
          className="fixed inset-0 z-40 bg-background"
        >
          {/* Pricing Container */}
          <div className="relative w-full h-screen flex items-center justify-center p-8 md:p-12">
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              data-cursor-hover
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 left-8 text-white hover:text-white/70 transition-colors z-50"
              aria-label="Close pricing"
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className={`relative flex flex-col h-full rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                    tier.isRecommended
                      ? "border-[#2563eb]/60 bg-white/10 ring-2 ring-[#2563eb]/30 shadow-2xl"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  {/* Recommended Badge */}
                  {tier.isRecommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="bg-[#2563eb] text-white px-4 py-1 rounded-full text-xs font-mono tracking-widest"
                      >
                        RECOMMENDED
                      </motion.div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-8">
                      <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-white mb-6">
                        {tier.title}
                      </h3>

                      {/* Pricing Section */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <p className="font-mono text-2xl font-light tracking-tight text-white">
                          {tier.robuxPrice}
                        </p>
                        <p className="font-mono text-sm tracking-widest text-white/60">OR</p>
                        <p className="font-mono text-xl font-light tracking-tight text-white">
                          {tier.nitroTier}
                        </p>
                        <p className="font-mono text-xs tracking-widest text-white/50 mt-2">
                          {tier.usdPrice}
                        </p>
                      </motion.div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 mb-8">
                      <ul className="space-y-4">
                        {tier.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + featureIndex * 0.05 }}
                            className="flex gap-3 text-sm md:text-base text-white/80"
                          >
                            <Check className="w-5 h-5 flex-shrink-0 text-[#2563eb] mt-0.5" />
                            <span className="font-light leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href="mailto:demigod.business1@gmail.com"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative w-full py-3 px-6 rounded-lg font-mono text-sm tracking-widest uppercase transition-all duration-300 text-center ${
                        tier.isRecommended
                          ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] border border-[#2563eb]"
                          : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                      }`}
                      data-cursor-hover
                    >
                      Order Now
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
