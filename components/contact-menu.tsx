"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Copy, ExternalLink, Mail, MessageCircle, X } from "lucide-react"

interface ContactMenuProps {
  isOpen: boolean
  onClose: () => void
}

const contactOptions = [
  {
    label: "Email",
    detail: "demigod.business1@gmail.com",
    href: "mailto:demigod.business1@gmail.com?subject=GFX%20Order%20Inquiry&body=Hi%20Demigod%2C%0A%0AI%27d%20like%20to%20discuss%20a%20GFX%20project.%0A%0AProject%20details%3A",
    icon: Mail,
    action: "Open mail",
  },
  {
    label: "Discord",
    detail: "demigod_akshu",
    href: "#discord",
    icon: MessageCircle,
    action: "Copy username",
  },
  {
    label: "Pinterest",
    detail: "Browse the visual archive",
    href: "https://pin.it/1LIz3IcE8",
    icon: ExternalLink,
    action: "Open Pinterest",
  },
]

export function ContactMenu({ isOpen, onClose }: ContactMenuProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleOptionClick = async (option: (typeof contactOptions)[number]) => {
    if (option.label === "Discord") {
      await navigator.clipboard?.writeText("demigod_akshu")
      return
    }
    if (option.label === "Email") {
      await navigator.clipboard?.writeText("demigod.business1@gmail.com")
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2400)
      return
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-background/60 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-menu-title"
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/25 bg-white/[0.11] p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.96, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-accent/10" />
            <div className="relative">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contact menu"
                className="absolute right-0 top-0 rounded-full border border-white/15 bg-white/10 p-2 text-muted-foreground transition hover:bg-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-accent">LET&apos;S CONNECT</p>
              <h2 id="contact-menu-title" className="max-w-sm text-balance font-sans text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                Pick your <span className="italic">channel.</span>
              </h2>
              <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-muted-foreground">
                Tell me what you&apos;re building, and I&apos;ll get back to you with the next step.
              </p>

              <div className="mt-8 grid gap-3">
                {contactOptions.map((option, index) => {
                  const Icon = option.icon
                  const isDiscord = option.label === "Discord"
                  return (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      target={option.label === "Pinterest" ? "_blank" : undefined}
                      rel={option.label === "Pinterest" ? "noopener noreferrer" : undefined}
                      onClick={(event) => {
                        if (isDiscord || option.label === "Email") event.preventDefault()
                        void handleOptionClick(option)
                      }}
                      className="group flex min-h-20 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 transition-colors hover:border-white/35 hover:bg-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-5"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.08, duration: 0.35 }}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-foreground transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-lg text-foreground">{option.label}</span>
                        <span className="block truncate font-mono text-[11px] tracking-wide text-muted-foreground">
                          {option.label === "Email" && copiedEmail ? "Email copied — paste it into your mail app" : option.detail}
                        </span>
                      </span>
                      {isDiscord || (option.label === "Email" && copiedEmail) ? <Copy className="h-4 w-4 text-accent" /> : <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
