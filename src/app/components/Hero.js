'use client'
import { ArrowRight, Cpu, Brain, Activity } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '120px 0 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG orbs - Adapted to use theme accents with opacity */}
      <div style={{
        position: 'absolute', top: '15%', right: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)',
        opacity: 0.08,
        pointerEvents: 'none',
        transition: 'background 0.3s ease'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)',
        opacity: 0.06,
        pointerEvents: 'none',
        transition: 'background 0.3s ease'
      }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        {/* Left */}
        <div style={{ animation: 'fadeInUp 0.8s ease both' }}>
          <div className="section-tag">EDGE AI · HEALTHCARE · DEEP LEARNING</div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: 'var(--text-primary)' }}>
            Edge Intelligent<br />
            <span className="gradient-text">Multi-Class Ocular</span><br />
            Disease Detection
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 480 }}>
            An AI-powered system using transfer learning models trained on Kaggle datasets,
            deployed on <strong style={{ color: 'var(--accent-cyan)' }}>Jetson Nano Orin</strong> for
            real-time retinal disease diagnosis — accessible anywhere.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <a href="#prediction" className="btn-primary">
              Try Prediction <ArrowRight size={16} />
            </a>
            <a href="#about" className="btn-outline">
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { val: '97%', label: 'Best Accuracy', icon: <Brain size={16} /> },
              { val: '4', label: 'Disease Classes', icon: <Activity size={16} /> },
              { val: 'Edge', label: 'Deployment', icon: <Cpu size={16} /> },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)', marginBottom: 4 }}>
                  {s.icon}
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700 }}>{s.val}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Eye visual */}
        <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeInUp 0.8s ease 0.2s both' }}>
          <EyeVisual />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #home > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function EyeVisual() {
  return (
    <div style={{ position: 'relative', width: 360, height: 360 }} className="animate-float">
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1px solid var(--accent-cyan)',
        opacity: 0.2,
        animation: 'pulse-glow 3s ease-in-out infinite',
      }} />
      {/* Middle ring */}
      <div style={{
        position: 'absolute', inset: 30, borderRadius: '50%',
        border: '1px dashed var(--accent-teal)',
        opacity: 0.3,
      }} />

      {/* SVG Eye */}
      <div style={{
        position: 'absolute', inset: 60,
        borderRadius: '50%',
        background: 'var(--bg-card-hover)', // Adapts to light/dark
        overflow: 'hidden',
        boxShadow: 'var(--glow-strong)', // Adapts to light/dark
        transition: 'background 0.3s ease, box-shadow 0.3s ease'
      }}>
        {/* Iris */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 120, height: 120, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, var(--accent-cyan), var(--accent-teal), var(--accent-blue), var(--accent-cyan))',
          opacity: 0.8,
        }} />
        {/* Pupil */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: '#020d18', // Keeps it dark for contrast in both modes
          boxShadow: 'var(--glow)',
        }} />
        {/* Scanline */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
          opacity: 0.6,
          animation: 'scanline 2.5s linear infinite',
        }} />
      </div>

      {/* Corner labels */}
      {['DenseNet169', '97% Acc', 'Jetson Orin', 'Real-time'].map((label, i) => {
        const positions = [
          { top: 10, left: -10 }, { top: 10, right: -10 },
          { bottom: 10, left: -10 }, { bottom: 10, right: -10 },
        ]
        return (
          <div key={label} style={{
            position: 'absolute', ...positions[i],
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '6px 12px',
            fontSize: 11, fontFamily: "'Space Mono', monospace",
            color: 'var(--accent-cyan)', whiteSpace: 'nowrap',
            transition: 'background 0.3s ease, border 0.3s ease, color 0.3s ease'
          }}>{label}</div>
        )
      })}
    </div>
  )
}