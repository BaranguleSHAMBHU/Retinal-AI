'use client'
import { Eye, Github, Mail } from 'lucide-react'
// ... rest stays the same

export default function Footer() {
  return (
    <footer style={{
      padding: '60px 0 40px',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: 'linear-gradient(135deg, #00d4ff, #00b4a0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Eye size={18} color="#020d18" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Retinal<span style={{ color: 'var(--accent-cyan)' }}>AI</span></div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>DenseNet169 · Jetson Nano Orin</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {['About', 'Dataset', 'Models', 'Prediction', 'Performance'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            {[Github, Mail].map((Icon, i) => (
              <a key={i} href="#" style={{
                width: 38, height: 38, borderRadius: 9,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              ><Icon size={16} /></a>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Retinal Disease Diagnostic Portal · Deep Learning / Transfer Learning
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'Space Mono',monospace" }}>
            Best Model: DenseNet169 (~97% Accuracy)
          </p>
        </div>
      </div>
    </footer>
  )
}