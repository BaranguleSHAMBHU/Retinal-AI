import { Cpu, Wifi, Battery, Clock } from 'lucide-react'

const benefits = [
  { icon: <Clock size={20} />, title: 'Real-time Predictions', desc: 'Inference in milliseconds without round-trip to cloud servers.' },
  { icon: <Wifi size={20} />, title: 'No Network Dependency', desc: 'Fully offline-capable AI inference for remote settings.' },
  { icon: <Battery size={20} />, title: 'Low Power Consumption', desc: 'Energy-efficient edge AI suitable for portable deployments.' },
  { icon: <Cpu size={20} />, title: 'NVIDIA Jetson Nano Orin', desc: 'High-performance CUDA GPU acceleration on compact hardware.' },
]

export default function EdgeDeployment() {
  return (
    <section id="edge" style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, transparent, var(--grid-line), transparent)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Visual */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative', width: 320, height: 320,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Rings */}
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  inset: i * 40,
                  borderRadius: '50%',
                  border: '1px solid var(--accent-cyan)',
                  opacity: 0.15 - i * 0.04, // This keeps the fade effect dynamic for both themes!
                  animation: `pulse-glow ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  transition: 'border-color 0.3s ease'
                }} />
              ))}

              {/* Center device */}
              <div style={{
                width: 140, height: 140, borderRadius: 24,
                background: 'var(--bg-card)', // Removed hardcoded dark blue
                border: '1px solid var(--border-hover)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: 'var(--glow-strong)', // Uses soft shadow in light mode, neon in dark
                transition: 'all 0.3s ease'
              }}>
                <Cpu size={40} color="var(--accent-cyan)" />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono',monospace", color: 'var(--accent-cyan)' }}>Jetson</div>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono',monospace", color: 'var(--text-muted)' }}>Nano Orin</div>
                </div>
              </div>

              {/* Orbiting labels */}
              {['CUDA', 'AI', 'Edge', 'GPU'].map((label, i) => {
                const angle = (i * 90 - 45) * (Math.PI / 180)
                const r = 130
                return (
                  <div key={label} style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    transform: `translate(-50%, -50%) translate(${r * Math.cos(angle)}px, ${r * Math.sin(angle)}px)`,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '6px 12px',
                    fontSize: 11, fontFamily: "'Space Mono',monospace",
                    color: 'var(--accent-teal)', whiteSpace: 'nowrap',
                    transition: 'background 0.3s ease, border 0.3s ease, color 0.3s ease'
                  }}>{label}</div>
                )
              })}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="section-tag">Edge Deployment</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 20, color: 'var(--text-primary)' }}>
              Powered by<br />
              <span className="gradient-text">NVIDIA Jetson Nano Orin</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 36 }}>
              The trained DenseNet169 model is deployed on the Jetson Nano Orin — a powerful
              NVIDIA edge AI device that enables real-time inference without cloud dependency,
              making it ideal for rural healthcare settings.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {benefits.map((b, i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ color: 'var(--accent-cyan)', marginBottom: 10 }}>{b.icon}</div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{b.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#edge .container>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}