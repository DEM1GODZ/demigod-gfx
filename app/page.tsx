"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  useEffect(() => {
    const handleOpenGallery = () => setIsGalleryOpen(true)
    const handleCloseGallery = () => setIsGalleryOpen(false)
    window.addEventListener("openGallery", handleOpenGallery)
    window.addEventListener("closeGallery", handleCloseGallery)
    return () => {
      window.removeEventListener("openGallery", handleOpenGallery)
      window.removeEventListener("closeGallery", handleCloseGallery)
    }
  }, [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar isGalleryOpen={isGalleryOpen} onGalleryClose={() => setIsGalleryOpen(false)} onGalleryOpen={() => setIsGalleryOpen(true)} />
      <main>
        <Hero />
        <SectionBlend />
        <About />
        <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
