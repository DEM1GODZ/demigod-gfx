"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [supportsSmoothScroll, setSupportsSmoothScroll] = useState(false)

  useEffect(() => {
    setSupportsSmoothScroll(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    )
  }, [])

  if (!supportsSmoothScroll) {
    return children
  }

  return (
    <ReactLenis root options={{ lerp: 0.14, duration: 0.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
