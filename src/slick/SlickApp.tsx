import { useState } from 'react'
import { SlickCanvas } from './SlickCanvas'

interface LiveFileState {
  fontFamily: 'grotesk' | 'serif' | 'mono'
  weight: number
  size: number
  tracking: number
  accentColor: string
}

const FONTS: Record<string, string> = {
  grotesk: "'Archivo Black', sans-serif",
  serif: "'Instrument Serif', serif",
  mono: "'JetBrains Mono', monospace",
}

const ACCENT_COLORS = ['#E03A2A', '#12100E', '#06b6d4', '#f59e0b', '#8b5cf6']

function LiveFilePanel({
  state,
  setState,
}: {
  state: LiveFileState
  setState: React.Dispatch<React.SetStateAction<LiveFileState>>
}) {
  return (
    <aside className="live-file">
      <div className="lf-header">
        <span className="red-dot" />
        <span>Live File</span>
        <span>3 HEX</span>
      </div>

      <div className="lf-section">
        <span className="lf-label">Font</span>
        <div className="font-buttons">
          {(['grotesk', 'serif', 'mono'] as const).map((f) => (
            <button
              key={f}
              className={`font-btn${state.fontFamily === f ? ' active' : ''}`}
              onClick={() => setState((s) => ({ ...s, fontFamily: f }))}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="lf-section">
        <div className="lf-range-row">
          <span className="lf-label">Weight</span>
          <span className="lf-range-val">{state.weight}</span>
        </div>
        <input
          type="range"
          min={100}
          max={900}
          step={100}
          value={state.weight}
          onChange={(e) => setState((s) => ({ ...s, weight: Number(e.target.value) }))}
          className="lf-range"
        />
      </div>

      <div className="lf-section">
        <div className="lf-range-row">
          <span className="lf-label">Size</span>
          <span className="lf-range-val">{state.size.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={2}
          max={7}
          step={0.1}
          value={state.size}
          onChange={(e) => setState((s) => ({ ...s, size: Number(e.target.value) }))}
          className="lf-range"
        />
      </div>

      <div className="lf-section">
        <div className="lf-range-row">
          <span className="lf-label">Tracking</span>
          <span className="lf-range-val">{state.tracking.toFixed(3)}</span>
        </div>
        <input
          type="range"
          min={-0.08}
          max={0.02}
          step={0.005}
          value={state.tracking}
          onChange={(e) => setState((s) => ({ ...s, tracking: Number(e.target.value) }))}
          className="lf-range"
        />
      </div>

      <div className="lf-section">
        <span className="lf-label">Accent</span>
        <div className="swatch-row">
          {ACCENT_COLORS.map((c) => (
            <div
              key={c}
              className={`swatch${state.accentColor === c ? ' active' : ''}`}
              style={{ background: c, color: c }}
              onClick={() => setState((s) => ({ ...s, accentColor: c }))}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  const [liveState, setLiveState] = useState<LiveFileState>({
    fontFamily: 'grotesk',
    weight: 900,
    size: 4.4,
    tracking: -0.05,
    accentColor: '#E03A2A',
  })

  const dynamicStyle = {
    fontFamily: FONTS[liveState.fontFamily],
    fontWeight: liveState.weight,
    fontSize: `clamp(2rem, ${liveState.size}vw, ${liveState.size * 1.1}rem)`,
    letterSpacing: `${liveState.tracking}em`,
  }

  return (
    <>
      <SlickCanvas />
      <div className="content-layer">
        {/* ═══ HERO ═══ */}
        <section className="hero">
          <header className="hero-topbar">
            <a href="#" className="wordmark">RAOKIMBO</a>
            <nav className="nav-center">
              <a href="#work">•Projects</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </nav>
            <a href="#contact" className="btn-talk">Let's talk ↗</a>
          </header>

          <div className="hero-body">
            <div>
              <p className="hero-label">Web Design & Development</p>
              <h1 className="hero-title display">RAOKIMBO</h1>
            </div>
          </div>

          <footer className="hero-footer">
            <div>
              <p className="hero-tagline display">
                Made to look good.<br />
                <span className="serif-italic" style={{ color: liveState.accentColor }}>
                  Built to feel different.
                </span>
              </p>
            </div>
            <div className="hero-right">
              <p>
                I craft digital experiences that merge bold aesthetics with seamless interaction.
                Every pixel is intentional. Every motion has purpose. Your project deserves nothing less.
              </p>
              <div className="hero-btn-group">
                <a href="#contact" className="btn-cream">Start a project ↗</a>
                <a href="#work" className="link-work">View my work ↗</a>
              </div>
            </div>
          </footer>

          <div className="hero-row-bottom">
            <span className="mono-label">Design / Development / Interaction</span>
            <span className="mono-label">Scroll Down ↓</span>
          </div>
        </section>

        {/* ═══ WORK (PORTFOLIO) ═══ */}
        <section className="work" id="work">
          <div className="work-header">
            <span className="mono-label">01 / Projects</span>
            <span className="mono-label">02 Projects</span>
          </div>
          <div className="work-list">
             <div className="work-row">
                <span className="work-index">01</span>
                <a href="https://raphagoat944.github.io/roxwood-netword/home.html" target="_blank" rel="noopener noreferrer" className="work-title display">Roxwood Network</a>
                <span className="work-desc">Roxwood Network Website</span>
                <span className="work-arrow">↗</span>
             </div>
             <div className="work-row">
                <span className="work-index">02</span>
                <a href="https://bling-bling.lovable.app/" target="_blank" rel="noopener noreferrer" className="work-title display">Bling Bling</a>
                <span className="work-desc">Bling Bling Website</span>
                <span className="work-arrow">↗</span>
             </div>
          </div>
        </section>

        {/* ═══ STUDIO ═══ */}
        <section className="studio" id="about">
          <div className="studio-left">
            <span className="mono-label">02 / About</span>
            <p className="studio-statement display" style={dynamicStyle}>
              Most sites get looked at.<br />
              Ours get{' '}
              <span className="serif-italic" style={{ color: liveState.accentColor }}>
                played with.
              </span>
            </p>
            <p className="studio-body">
              I am a developer passionate about creating unique digital experiences. No templates.
              No shortcuts. Just intentional design and clean code that performs.
            </p>
            <a href="#contact" className="btn-black">Start a project ↗</a>
          </div>
          <div className="studio-right">
            <LiveFilePanel state={liveState} setState={setLiveState} />
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="services" id="services">
          <div className="services-header">
            <span className="mono-label">02 / Services</span>
            <span className="mono-label">04 Disciplines</span>
          </div>
          <h2 className="services-headline display">What I do</h2>
          <div className="services-list">
            {[
              { idx: '01', title: 'Design', desc: 'Visual systems, identity, UI/UX' },
              { idx: '02', title: 'Development', desc: 'Frontend, backend, APIs' },
              { idx: '03', title: 'Mobile', desc: 'iOS, Android, cross-platform' },
              { idx: '04', title: 'Launch', desc: 'Strategy, deployment, growth' },
            ].map((s) => (
              <div key={s.idx} className="service-row">
                <span className="service-index">{s.idx}</span>
                <span className="service-title display">{s.title}</span>
                <span className="service-desc">{s.desc}</span>
                <span className="service-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PROCESS ═══ */}
        <section className="process" id="process">
          <div className="process-header">
            <span className="mono-label">03 / Process</span>
            <span className="mono-label">Six weeks, on average</span>
          </div>
          <div className="process-columns">
            {[
              { num: '01', title: 'Design', body: 'We explore, iterate, and refine until the visual language feels unmistakably yours.' },
              { num: '02', title: 'Development', body: 'Clean architecture, performant builds, and attention to every interaction detail.' },
              { num: '03', title: 'Mobile', body: 'Responsive by default. Touch-optimized. Tested on real devices before handoff.' },
            ].map((p) => (
              <div key={p.num} className="process-col">
                <span className="process-num display">{p.num}</span>
                <h3 className="process-title display">{p.title}</h3>
                <p className="process-body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section className="contact" id="contact">
          <span className="mono-label">04 / Contact</span>
          <h2 className="contact-headline display">
            Let's make something{' '}
            <span className="serif-italic" style={{ color: liveState.accentColor }}>
              slick.
            </span>
          </h2>
          <a href="mailto:raphael.michel026@gmail.com" className="contact-link">
            raphael.michel026@gmail.com
          </a>
          <div className="contact-footer">
            <span>Raokimbo — 2026</span>
            <span>Paris / Remote</span>
          </div>
        </section>
      </div>
    </>
  )
}
