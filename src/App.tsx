import { useEffect, useRef } from 'react'

// ── Galaxy Background + Interactive Star ──
function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let width = window.innerWidth
    let height = window.innerHeight

    let targetX = 0.5
    let targetY = 0.5
    let currentX = 0.5
    let currentY = 0.5

    // Pre-generate animated stars with different types
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseSize: Math.random() * 1.8 + 0.3,
      baseOpacity: Math.random() * 0.7 + 0.3,
      type: Math.random() > 0.9 ? 'colored' : 'white',
      color: `hsl(${Math.random() * 60 + 220}, 80%, 70%)`,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.5,
      driftY: (Math.random() - 0.5) * 0.35,
    }))

    // Shooting stars
    const shootingStars = Array.from({ length: 5 }, (_, i) => ({
      active: false,
      timer: Math.random() * 300 + i * 100,
      x: 0, y: 0,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      speed: 0,
      length: 0,
      life: 0,
    }))

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / width
      targetY = e.clientY / height
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    handleResize()

    let frameCount = 0
    const animate = () => {
      frameCount++
      const time = Date.now() * 0.001

      // Smooth follow
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05

      // ── Draw galaxy background ──
      // Dark base
      ctx.fillStyle = '#030308'
      ctx.fillRect(0, 0, width, height)

      // Galaxy gradient overlay (static)
      const galaxyGrad = ctx.createRadialGradient(
        width * 0.3, height * 0.4, 0,
        width * 0.3, height * 0.4, width * 0.7
      )
      galaxyGrad.addColorStop(0, 'rgba(88, 28, 135, 0.15)')
      galaxyGrad.addColorStop(0.3, 'rgba(30, 58, 138, 0.1)')
      galaxyGrad.addColorStop(0.6, 'rgba(15, 23, 42, 0.05)')
      galaxyGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = galaxyGrad
      ctx.fillRect(0, 0, width, height)

      // Second galaxy blob
      const galaxyGrad2 = ctx.createRadialGradient(
        width * 0.7, height * 0.6, 0,
        width * 0.7, height * 0.6, width * 0.5
      )
      galaxyGrad2.addColorStop(0, 'rgba(199, 21, 189, 0.12)')
      galaxyGrad2.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)')
      galaxyGrad2.addColorStop(1, 'transparent')
      ctx.fillStyle = galaxyGrad2
      ctx.fillRect(0, 0, width, height)

      // Third accent
      const galaxyGrad3 = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, width * 0.4
      )
      galaxyGrad3.addColorStop(0, 'rgba(6, 182, 212, 0.08)')
      galaxyGrad3.addColorStop(1, 'transparent')
      ctx.fillStyle = galaxyGrad3
      ctx.fillRect(0, 0, width, height)

      // ── Animated twinkling stars ──
      stars.forEach(star => {
        // Drift effect
        star.x += star.drift
        star.y += star.driftY
        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0

        // Twinkling with variable speed
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset)
        const pulse = (twinkle * 0.5 + 0.5)
        const alpha = star.baseOpacity * (0.3 + pulse * 0.7)

        ctx.save()
        ctx.globalAlpha = alpha

        if (star.type === 'colored') {
          // Colored star with glow
          ctx.shadowBlur = 8
          ctx.shadowColor = star.color
          ctx.fillStyle = star.color
        } else {
          ctx.fillStyle = '#ffffff'
        }

        // Draw star shape (4-pointed)
        const size = star.baseSize * (0.8 + pulse * 0.4)
        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? size : size * 0.3
          const angle = (i * Math.PI) / 4 - Math.PI / 4 + time * 0.2
          const px = star.x + Math.cos(angle) * r
          const py = star.y + Math.sin(angle) * r
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      // ── Shooting stars ──
      shootingStars.forEach((ss) => {
        ss.timer--
        if (ss.timer <= 0 && !ss.active) {
          // Start new shooting star
          ss.active = true
          ss.x = Math.random() * width
          ss.y = Math.random() * height * 0.5
          ss.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4
          ss.speed = 8 + Math.random() * 6
          ss.length = 80 + Math.random() * 60
          ss.life = 60 + Math.random() * 30
        }

        if (ss.active) {
          ss.life--
          ss.x += Math.cos(ss.angle) * ss.speed
          ss.y += Math.sin(ss.angle) * ss.speed

          if (ss.life <= 0 || ss.x > width + 100 || ss.y > height + 100) {
            ss.active = false
            ss.timer = Math.random() * 400 + 200
            return
          }

          const progress = 1 - ss.life / (60 + 30)
          const alpha = Math.sin(progress * Math.PI) * 0.8

          ctx.save()
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.lineWidth = 1.5
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(200, 200, 255, 0.8)'
          ctx.beginPath()
          ctx.moveTo(ss.x, ss.y)
          ctx.lineTo(
            ss.x - Math.cos(ss.angle) * ss.length * (1 - progress),
            ss.y - Math.sin(ss.angle) * ss.length * (1 - progress)
          )
          ctx.stroke()
          ctx.restore()
        }
      })

      // ── Interactive glowing star at mouse ──
      const starX = currentX * width
      const starY = currentY * height
      const baseSize = Math.min(width, height) * 0.25

      ctx.save()
      ctx.translate(starX, starY)

      // Outer aura (large soft glow) - reduced opacity
      const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, baseSize * 2.5)
      auraGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)')
      auraGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.04)')
      auraGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = auraGrad
      ctx.fillRect(-baseSize * 2.5, -baseSize * 2.5, baseSize * 5, baseSize * 5)

      // Light rays
      const rayCount = 8
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.2
        const rayLength = baseSize * (1.5 + Math.sin(time * 2 + i) * 0.3)
        const rayWidth = 0.03

        ctx.save()
        ctx.rotate(angle)
        const rayGrad = ctx.createLinearGradient(0, 0, rayLength, 0)
        rayGrad.addColorStop(0, 'rgba(200, 180, 255, 0.2)')
        rayGrad.addColorStop(0.5, 'rgba(150, 130, 255, 0.05)')
        rayGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = rayGrad
        ctx.beginPath()
        ctx.moveTo(0, -rayWidth * baseSize)
        ctx.lineTo(rayLength, 0)
        ctx.lineTo(0, rayWidth * baseSize)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // Main 3D star body
      const spikes = 4
      const outerR = baseSize
      const innerR = baseSize * 0.38

      // Shadow for 3D effect - very subtle
      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(168, 85, 247, 0.25)'

      // Build star path
      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR
        const angle = (i * Math.PI) / spikes - Math.PI / 2 + time * 0.15
        const px = Math.cos(angle) * r
        const py = Math.sin(angle) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      // 3D gradient fill (top-left light source)
      const lightAngle = -Math.PI / 4
      const gradX = Math.cos(lightAngle) * outerR * 0.3
      const gradY = Math.sin(lightAngle) * outerR * 0.3
      const starGrad = ctx.createRadialGradient(gradX, gradY, 0, 0, 0, outerR)
      starGrad.addColorStop(0, 'rgba(220, 200, 255, 0.6)')
      starGrad.addColorStop(0.2, 'rgba(160, 120, 255, 0.5)')
      starGrad.addColorStop(0.5, 'rgba(100, 60, 200, 0.45)')
      starGrad.addColorStop(0.8, 'rgba(60, 30, 120, 0.35)')
      starGrad.addColorStop(1, 'rgba(30, 10, 60, 0.2)')
      ctx.fillStyle = starGrad
      ctx.fill()

      // Inner bright core
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, innerR * 0.6)
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
      coreGrad.addColorStop(0.5, 'rgba(220, 200, 255, 0.2)')
      coreGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = coreGrad
      ctx.fill()

      // Highlight (specular) on top-left
      ctx.beginPath()
      ctx.arc(-outerR * 0.15, -outerR * 0.15, outerR * 0.12, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      ctx.fill()

      // Edge glow
      ctx.strokeStyle = 'rgba(180, 140, 255, 0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.shadowBlur = 0

      // Orbiting mini star
      const orbitT = time * 0.8
      const orbitDist = baseSize * 1.2
      const orbX = Math.cos(orbitT) * orbitDist
      const orbY = Math.sin(orbitT) * orbitDist * 0.6
      const orbSize = baseSize * 0.15

      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? orbSize : orbSize * 0.35
        const angle = (i * Math.PI) / spikes - Math.PI / 2 - time * 0.3
        const px = orbX + Math.cos(angle) * r
        const py = orbY + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      const orbGrad = ctx.createRadialGradient(orbX - orbSize * 0.2, orbY - orbSize * 0.2, 0, orbX, orbY, orbSize)
      orbGrad.addColorStop(0, 'rgba(255, 200, 255, 0.9)')
      orbGrad.addColorStop(0.6, 'rgba(236, 72, 153, 0.7)')
      orbGrad.addColorStop(1, 'rgba(168, 85, 247, 0.3)')
      ctx.fillStyle = orbGrad
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(236, 72, 153, 0.6)'
      ctx.fill()
      ctx.shadowBlur = 0

      // Orbit trail
      ctx.beginPath()
      ctx.ellipse(0, 0, orbitDist, orbitDist * 0.6, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      ctx.stroke()
      ctx.setLineDash([])

      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

export default function App() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <GalaxyBackground />

      {/* Navigation */}
      <nav>
        <a href="#hero" className="logo">R<span style={{ color: '#8b5cf6' }}>.</span></a>
        <div className="nav-links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>À propos</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="container">
        <p className="mono">Développeur & Créatif</p>
        <h1 className="hero-title"><span className="gradient-text">Raphaël</span></h1>
        <p className="subtitle">Développeur web passionné par la création d'expériences digitales immersives.</p>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* About */}
      <section id="apropos" className="container about-section">
        <div className="grid-cols-2">
          <div>
            <p className="section-label">À Propos</p>
            <h2>Passionné par le code,<br /><span className="gradient-text">obsédé par le détail.</span></h2>
          </div>
          <div className="flex-col justify-end">
            <p className="about-text">Développeur full-stack avec une appétence particulière pour les interfaces immersives et les applications performantes.</p>
            <div className="stats">
              <div className="stat"><span className="stat-value gradient-text">2+</span><span className="stat-label">Ans d'XP</span></div>
              <div className="stat"><span className="stat-value gradient-text">∞</span><span className="stat-label">Curiosité</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container contact-section">
        <p className="section-label">Contact</p>
        <h2>Travaillons<br /><span className="gradient-text">ensemble.</span></h2>
        <p style={{ color: '#71717a', marginTop: '1rem', fontWeight: 300 }}>Tu as un projet en tête ? Discutons-en.</p>
        <a href="mailto:raphael.michel026@gmail.com" className="email-link">raphael.michel026@gmail.com →</a>
      </section>

      <footer>
        <div className="container">© 2026 Raphaël — Tous droits réservés</div>
      </footer>
    </>
  )
}
