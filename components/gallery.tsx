"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "Matcha Dream",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1edddb67a7a625dd7f66d6763fd9f2f9-JadaWiMs9gYeHGJhiopk1eD8iDUZHE.jpg",
    aspectRatio: 1.4,
  },
  {
    id: 2,
    title: "Carnette Sport",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/056f4b0b8ba1bce781a7931c117bb7a1-oRnG45JFPWgkW4Te2lHANxcf2G0TsH.jpg",
    aspectRatio: 1.3,
  },
  {
    id: 3,
    title: "Annse",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9ec7e58e7ec5536e9b49f3f7aa5ce36a-K0uCxmRghVEA01ryPj9LtXQzs4gYz7.jpg",
    aspectRatio: 1.2,
  },
  {
    id: 4,
    title: "Brute Force",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-05-05_12-46-28-430.png-bV8PUcdhnRmrN4zxaAw2RGxuRMW2at.jpeg",
    aspectRatio: 1.35,
  },
  {
    id: 5,
    title: "Swag Icon",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b2665b8598c8cc6875173c09b333e107-IUTryvtN9j0YggyJ1kyzM8EBMYk7t7.jpg",
    aspectRatio: 1.25,
  },
]

interface GalleryProps {
  isOpen: boolean
  onClose: () => void
}

export function Gallery({ isOpen, onClose }: GalleryProps) {
  const [selectedId, setSelectedId] = useState<number>(1)

  const selectedItem = galleryItems.find((item) => item.id === selectedId)

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
          {/* Main Gallery Container */}
          <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Left Main Content - Large Dynamic Frame */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative border-r border-white/10">
              <motion.div
                layoutId="gallery-frame"
                transition={{ 
                  layout: { duration: 0.5, ease: "easeInOut" }
                }}
                className="relative w-full h-auto max-h-[70vh] bg-black rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                style={{
                  aspectRatio: selectedItem?.aspectRatio || 1.5,
                }}
              >
                <AnimatePresence mode="wait">
                  {selectedItem && (
                    <motion.img
                      key={`img-${selectedItem.id}`}
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full h-full object-contain"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Info Below Main Image */}
              <motion.div
                key={`info-${selectedId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-6 text-center"
              >
                <p className="font-sans text-sm md:text-base font-light tracking-tight text-white/80">
                  All designs are original. Made by @demigod_gfx
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                data-cursor-hover
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-8 left-8 text-white hover:text-white/70 transition-colors z-50"
                aria-label="Close gallery"
              >
                <X className="w-8 h-8" />
              </motion.button>
            </div>

            {/* Right Sidebar - Scrollable Thumbnails */}
            <div className="w-full md:w-72 flex-shrink-0 border-l border-white/10 bg-background/50 backdrop-blur-sm overflow-y-auto">
              <div className="flex flex-col gap-2 p-4">
                {galleryItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`relative rounded-lg overflow-hidden border transition-all duration-300 text-left group ${
                      selectedId === item.id
                        ? "border-white/80 ring-2 ring-[#2563eb]"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-full h-32 relative overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                    </div>


                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
