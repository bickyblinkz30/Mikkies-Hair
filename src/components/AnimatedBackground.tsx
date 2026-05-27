"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      opacitySpeed: number
      isGold: boolean
    }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: Math.random() * 0.005 + 0.002,
        isGold: Math.random() > 0.6,
      })
    }

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function drawWaves(ctx: CanvasRenderingContext2D, t: number) {
      const w = canvas!.width
      const h = canvas!.height
      const maxDim = Math.sqrt(w * w + h * h)

      for (let i = 0; i < 6; i++) {
        ctx.beginPath()

        const angle = -0.3 + i * 0.12
        const baseOffset = i * 90 - 250
        const amplitude = 45 + i * 18
        const freq = 0.003 + i * 0.0004
        const speed = 0.08 + i * 0.025

        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)

        const centerX = w * 0.5 + cosA * baseOffset
        const centerY = h * 0.5 + sinA * baseOffset

        let first = true
        for (let d = -maxDim * 0.5; d < maxDim * 1.5; d += 4) {
          const px = centerX + d * cosA
          const py = centerY + d * sinA

          const perpX = -sinA
          const perpY = cosA

          const wave =
            Math.sin(d * freq + t * speed + i * 1.8) * amplitude +
            Math.sin(d * freq * 1.8 + t * speed * 0.5 + i * 3.2) * amplitude * 0.2

          const x = px + perpX * wave
          const y = py + perpY * wave

          if (first) {
            ctx.moveTo(x, y)
            first = false
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.012 + i * 0.008})`
        ctx.lineWidth = 1.5 + i * 0.4
        ctx.stroke()
      }

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()

        const angle = -0.6 + i * 0.2
        const baseOffset = i * 120 - 150
        const amplitude = 35 + i * 15
        const freq = 0.004 + i * 0.001
        const speed = 0.06 + i * 0.02

        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)

        const centerX = w * 0.5 + cosA * baseOffset
        const centerY = h * 0.5 + sinA * baseOffset

        let first = true
        for (let d = -maxDim * 0.5; d < maxDim * 1.5; d += 4) {
          const px = centerX + d * cosA
          const py = centerY + d * sinA

          const perpX = -sinA
          const perpY = cosA

          const wave =
            Math.sin(d * freq + t * speed + i * 2.0) * amplitude +
            Math.sin(d * freq * 2.2 + t * speed * 0.6 + i * 1.5) * amplitude * 0.15

          const x = px + perpX * wave
          const y = py + perpY * wave

          if (first) {
            ctx.moveTo(x, y)
            first = false
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(192, 192, 192, ${0.01 + i * 0.007})`
        ctx.lineWidth = 2 + i * 0.5
        ctx.stroke()
      }
    }

    function drawParticles(ctx: CanvasRenderingContext2D, t: number) {
      const w = canvas!.width
      const h = canvas!.height

      for (const p of particles) {
        p.x += p.speedX + Math.sin(t * 0.015 + p.y * 0.008) * 0.15
        p.y += p.speedY + Math.cos(t * 0.015 + p.x * 0.008) * 0.15
        p.opacity += Math.sin(t * p.opacitySpeed) * 0.004

        if (p.opacity > 0.6) p.opacity = 0.6
        if (p.opacity < 0.03) p.opacity = 0.03

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        if (p.isGold) {
          ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        }
        ctx.fill()

        if (p.size > 1.5) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)

          if (p.isGold) {
            ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity * 0.12})`
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.1})`
          }
          ctx.fill()
        }
      }
    }

    function animate(timestamp: number) {
      time = timestamp * 0.001
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      drawWaves(ctx!, time)
      drawParticles(ctx!, time)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}
