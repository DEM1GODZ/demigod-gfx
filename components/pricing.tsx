"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronLeft, Copy, Mail, X } from "lucide-react"
import { SentientSphere } from "./sentient-sphere"

interface PricingProps {
  isOpen: boolean
  onClose: () => void
}

type Currency = "robux" | "nitro"
type PlanKey = "standard" | "premium" | "commercial"

const plans = [
  {
    key: "standard" as const,
    name: "Standard Tier",
    robux: "80 – 250 R$",
    nitro: "1 Basic Nitro",
    usd: "$2.99 USD",
    scope: "Simple PFPs, clean wallpapers, light overlays, or matching profile sets.",
    features: ["Basic lighting & typography", "2 minor revisions", "Standard turnaround"],
  },
  {
    key: "premium" as const,
    name: "Premium Tier",
    robux: "400 – 600 R$",
    nitro: "1 Full Nitro",
    usd: "$9.99 USD",
    scope: "Heavy typography, complex anime/game edits, high-effort thumbnails, or bulk PFP sets.",
    features: ["Advanced layering & custom textures", "Priority delivery", "7-day draft revision window", "Project queue boost"],
  },
  {
    key: "commercial" as const,
    name: "Commercial / Studio",
    robux: "1000 – 1500 R$",
    nitro: "2–3 Full Nitros",
    usd: "$19.99 – $29.99 USD",
    scope: "High-end ad posters, commercial banners, full shop headers, and business identity visuals.",
    features: ["Full commercial usage rights", "Source files, if available", "30-day draft revision window", "High priority support"],
  },
]

const tos = [
  "100% upfront payment is required before work starts.",
  "Nitro payment MUST be given through the gift links.",
  "Non-refundable once project work has officially begun.",
  "Revisions are restricted to the designated timeframe after draft delivery: 7 days for Premium and 30 days for Commercial.",
  "Strictly NO NSFW or explicit content commissions are accepted.",
  "DEMIGOD_GFX retains full rights to showcase finished designs in portfolios and promotional media.",
]

export function Pricing({ isOpen, onClose }: PricingProps) {
  const [currency, setCurrency] = useState<Currency>("robux")
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  const openOrder = (plan: PlanKey) => {
    setSelectedPlan(plan)
    setStep(1)
    setCopied(false)
  }

  const closeOrder = () => {
    setSelectedPlan(null)
    setStep(1)
    setCopied(false)
  }

  const selected = plans.find((plan) => plan.key === selectedPlan)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl sm:items-center sm:p-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-45 blur-2xl">
            <SentientSphere />
          </div>
          <button onClick={onClose} aria-label="Close pricing" className="absolute left-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white sm:left-8 sm:top-8">
            <X data-icon="inline-start" />
          </button>

          <div className="relative z-10 mx-auto w-full max-w-[1060px] min-w-0 py-12 sm:py-8">
            <header className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
              <p className="mx-auto mb-4 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-white/65">Pricing</p>
              <h2 className="font-sans text-[2.65rem] font-light leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl">Simple, transparent<br />pricing</h2>
              <p className="mx-auto mt-5 max-w-md text-xs leading-5 text-white/50 sm:text-sm">Choose which tier fits your idea and click on the button to make it real</p>
              <button onClick={() => { onClose(); window.setTimeout(() => window.dispatchEvent(new Event("openGallery")), 350) }} className="mt-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[11px] tracking-wide text-white/80 backdrop-blur-xl transition hover:border-blue-300/60 hover:bg-white/15 hover:text-white">
                Unsure? Take a look at some sample designs first!
              </button>
              <div className="mx-auto mt-5 inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-xl" aria-label="Currency switcher">
                <button onClick={() => setCurrency("robux")} className={`rounded-full px-4 py-1.5 font-mono text-xs transition ${currency === "robux" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Robux</button>
                <button onClick={() => setCurrency("nitro")} className={`rounded-full px-4 py-1.5 font-mono text-xs transition ${currency === "nitro" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Nitro / USD</button>
              </div>
            </header>

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3 md:items-center md:gap-3">
              {plans.map((plan, index) => (
                <motion.article key={plan.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className={`group relative flex min-w-0 flex-col overflow-hidden rounded-xl border p-5 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:p-6 ${plan.key === "premium" ? "border-blue-300/50 bg-gradient-to-br from-blue-950/50 via-white/[0.09] to-amber-950/40 shadow-blue-950/50 md:-translate-y-2" : "border-white/15 bg-white/[0.025] shadow-black/30"}`}>
                  {plan.key === "premium" && <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/40 via-amber-200/20 to-transparent blur-3xl" />}
                  <div className="relative flex-1">
                    {plan.key === "premium" && <span className="mb-5 inline-flex rounded-full border border-amber-200/30 bg-amber-100/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-amber-100">MOST PREFERRED</span>}
                    <h3 className="text-xl font-light tracking-tight text-white">{plan.name}</h3>
                    <p className="mt-5 min-h-14 text-sm leading-6 text-white/60">{plan.scope}</p>
                    <div className="my-7 border-y border-white/10 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{currency === "robux" ? "Robux pricing" : "Nitro / USD pricing"}</p>
                      <p className="mt-2 text-3xl font-light text-white">{currency === "robux" ? plan.robux : plan.nitro}</p>
                      <p className="mt-1 text-sm text-white/45">{currency === "robux" ? `or ${plan.nitro} · ${plan.usd}` : plan.usd}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-5 text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-blue-300" />{feature}</li>)}
                    </ul>
                  </div>
                  <button onClick={() => openOrder(plan.key)} className={`relative mt-8 w-full rounded-xl border px-4 py-3 font-mono text-xs tracking-wider transition ${plan.key === "premium" ? "border-blue-200/40 bg-blue-400/20 text-white hover:bg-blue-400/35" : "border-white/20 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"}`}>Select Plan</button>
                </motion.article>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedPlan && selected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl">
                <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] border border-white/20 bg-[#101217]/90 p-6 shadow-2xl shadow-black/50 sm:p-8">
                  <button onClick={closeOrder} aria-label="Close order modal" className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"><X /></button>
                  {step === 2 && <button onClick={() => setStep(1)} aria-label="Back to terms" className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"><ChevronLeft /></button>}
                  {step === 1 ? (
                    <>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-300">Step 1 / 2 · {selected.name}</p>
                      <h3 className="mt-3 text-3xl font-light text-white">Terms of Service</h3>
                      <p className="mt-2 text-sm text-white/50">Please read these terms before reaching out.</p>
                      <ol className="mt-7 flex flex-col gap-4">{tos.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/70"><span className="font-mono text-xs text-blue-300">0{index + 1}</span><span>{item}</span></li>)}</ol>
                      <button onClick={() => setStep(2)} className="mt-8 w-full rounded-xl bg-white px-4 py-3 font-mono text-xs tracking-wide text-black transition hover:bg-blue-100">I Have Read &amp; Agree to the Terms</button>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-300">Step 2 / 2 · {selected.name}</p>
                      <h3 className="mt-3 text-3xl font-light text-white">Choose How to Reach Out</h3>
                      <div className="mt-8 flex flex-col gap-3">
                        <button onClick={async () => { await navigator.clipboard?.writeText("@demigod_gfx"); setCopied(true) }} className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"><span className="flex items-center gap-3 text-sm text-white"><Copy className="size-4 text-blue-300" />Discord <span className="text-white/50">@demigod_gfx</span></span><span className="font-mono text-[10px] text-white/40">{copied ? "COPIED" : "COPY"}</span></button>
                        <a href="mailto:demigod.business1@gmail.com" onClick={closeOrder} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-sm text-white transition hover:bg-white/10"><Mail className="size-4 text-blue-300" />Gmail <span className="text-white/50">demigod.business1@gmail.com</span></a>
                      </div>
                      <p className="mt-6 text-center text-xs leading-5 text-white/40">Please allow up to 48 hours after reaching out for your request to be reviewed and accepted.</p>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
