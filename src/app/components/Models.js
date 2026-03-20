'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const models = [
  { name: 'MobileNet', acc: 92, best: false },
  { name: 'EfficientNet', acc: 95, best: false },
  { name: 'ResNet', acc: 94, best: false },
  { name: 'VGG', acc: 93, best: false },
  { name: 'DenseNet169', acc: 97, best: true },
  { name: 'Inception', acc: 91, best: false },
  { name: 'Swin Transformer', acc: 96, best: false },
]

export default function Models() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="models" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Transfer Learning</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16 }}>
            Deep Learning <span className="gradient-text">Models Evaluated</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
            Seven state-of-the-art transfer learning architectures were tested.
            DenseNet169 emerged as the top performer.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {models.map((m, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: m.best ? 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,180,160,0.08))' : 'var(--bg-card)',
                border: `1px solid ${m.best ? 'rgba(0,212,255,0.4)' : hovered === i ? 'rgba(0,212,255,0.2)' : 'var(--border)'}`,
                borderRadius: 12, padding: '24px 28px',
                transition: 'all 0.3s ease',
                transform: hovered === i ? 'translateY(-4px)' : 'none',
                boxShadow: m.best ? '0 0 30px rgba(0,212,255,0.1)' : 'none',
                display: 'flex', alignItems: 'center', gap: 20,
              }}>
              {/* Accuracy ring */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="32" cy="32" r="26" fill="none"
                    stroke={m.best ? '#00d4ff' : '#00b4a0'}
                    strokeWidth="4"
                    strokeDasharray={`${(m.acc / 100) * 163.4} 163.4`}
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700,
                  color: m.best ? 'var(--accent-cyan)' : 'var(--text-primary)',
                }}>{m.acc}%</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: m.best ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {m.name}
                  </h4>
                  {m.best && <CheckCircle size={16} color="#00d4ff" />}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {m.best ? '★ Best Performing Model' : 'Transfer Learning'}
                </div>

                {/* Bar */}
                <div style={{
                  marginTop: 10, height: 4, borderRadius: 2,
                  background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: m.best ? 'linear-gradient(90deg, #00d4ff, #00b4a0)' : 'rgba(0,180,160,0.5)',
                    width: `${m.acc}%`, transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}