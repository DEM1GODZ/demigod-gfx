"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Zap } from "lucide-react"

interface FooterProps {
  onContactOpen: () => void
}

export function Footer({ onContactOpen }: FooterProps) {
  const [time, setTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const milliseconds = now.getMilliseconds().toString().padStart(3, "0")
      setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 10)
    return () => clearInterval(interval)
  }, [])

  const handleDiscordCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText("demigod_akshu")
      setCopyFeedback("Copied!")
      setTimeout(() => setCopyFeedback(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handlePricingClick = () => {
    window.dispatchEvent(new Event("openPricing"))
  }

  return (
    <footer id="footer" className="relative">
      {/* Pricing CTA */}
      <motion.button
        onClick={handlePricingClick}
        data-cursor-hover
        className="relative block overflow-hidden w-full"
        whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
      >
        {/* Content */}
        <div className="relative py-12 md:py-16 px-8 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.h2
              className="font-sans text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-center md:text-left"
            >
              View <span className="italic">Pricing</span>
            </motion.h2>

            <motion.div
              animate={{
                scale: 1,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-white/80" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Main CTA */}
      <motion.button
        type="button"
        onClick={onContactOpen}
        data-cursor-hover
        className="relative block w-full overflow-hidden text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-[#2563eb]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-16 md:py-24 px-8 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.h2
              className="font-sans text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-center md:text-left"
              animate={{
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              Reach <span className="italic">me</span>
            </motion.h2>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Footer Info */}
      <div className="px-8 md:px-12 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Local Time */}
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            <span className="mr-2">LOCAL TIME</span>
            <span className="text-white tabular-nums">{time}</span>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <button
              onClick={handleDiscordCopy}
              data-cursor-hover
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-300 relative"
            >
              DISCORD
              {copyFeedback && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-6 text-white text-[10px] whitespace-nowrap"
                >
                  {copyFeedback}
                </motion.span>
              )}
            </button>
            <a
              href="https://pin.it/1LIz3IcE8"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-300"
            >
              PINTEREST
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
