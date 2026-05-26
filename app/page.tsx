"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)

  useEffect(() => {
    const handleOpenGallery = () => setIsGalleryOpen(true)
    const handleCloseGallery = () => setIsGalleryOpen(false)
    const handleOpenPricing = () => setIsPricingOpen(true)
    const handleClosePricing = () => setIsPricingOpen(false)
    
    window.addEventListener("openGallery", handleOpenGallery)
    window.addEventListener("closeGallery", handleCloseGallery)
    window.addEventListener("openPricing", handleOpenPricing)
    window.addEventListener("closePricing", handleClosePricing)
    
    return () => {
      window.removeEventListener("openGallery", handleOpenGallery)
      window.removeEventListener("closeGallery", handleCloseGallery)
      window.removeEventListener("openPricing", handleOpenPricing)
      window.removeEventListener("closePricing", handleClosePricing)
    }
  }, [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar isGalleryOpen={isGalleryOpen} onGalleryClose={() => setIsGalleryOpen(false)} onGalleryOpen={() => setIsGalleryOpen(true)} isPricingOpen={isPricingOpen} onPricingClose={() => setIsPricingOpen(false)} onPricingOpen={() => setIsPricingOpen(true)} />
      <main>
        <Hero />
        <SectionBlend />
        <About />
        <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        <Pricing isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
