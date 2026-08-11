"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Pricing } from "@/components/pricing"
import { ContactMenu } from "@/components/contact-menu"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const handleOpenGallery = () => setIsGalleryOpen(true)
    const handleCloseGallery = () => setIsGalleryOpen(false)
    const handleOpenPricing = () => setIsPricingOpen(true)
    const handleClosePricing = () => setIsPricingOpen(false)
    const handleOpenContact = () => setIsContactOpen(true)
    const handleCloseContact = () => setIsContactOpen(false)
    window.addEventListener("openGallery", handleOpenGallery)
    window.addEventListener("closeGallery", handleCloseGallery)
    window.addEventListener("openPricing", handleOpenPricing)
    window.addEventListener("closePricing", handleClosePricing)
    window.addEventListener("openContact", handleOpenContact)
    window.addEventListener("closeContact", handleCloseContact)
    return () => {
      window.removeEventListener("openGallery", handleOpenGallery)
      window.removeEventListener("closeGallery", handleCloseGallery)
      window.removeEventListener("openPricing", handleOpenPricing)
      window.removeEventListener("closePricing", handleClosePricing)
      window.removeEventListener("openContact", handleOpenContact)
      window.removeEventListener("closeContact", handleCloseContact)
    }
  }, [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar 
        isGalleryOpen={isGalleryOpen} 
        onGalleryClose={() => setIsGalleryOpen(false)} 
        onGalleryOpen={() => setIsGalleryOpen(true)}
        isPricingOpen={isPricingOpen}
        onPricingClose={() => setIsPricingOpen(false)}
        isContactOpen={isContactOpen}
        onContactClose={() => setIsContactOpen(false)}
      />
      <main>
        <Hero />
        <SectionBlend />
        <About />
        <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        <Pricing isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        <ContactMenu isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <Footer onContactOpen={() => setIsContactOpen(true)} />
      </main>
    </SmoothScroll>
  )
}
