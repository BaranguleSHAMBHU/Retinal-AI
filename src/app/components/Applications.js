'use client'
import { Stethoscope, MapPin, Smartphone, Building } from 'lucide-react'

const apps = [
  { icon: <Stethoscope size={24} />, title: 'Early Disease Detection', desc: 'Identify retinal conditions before symptoms worsen, enabling timely treatment.' },
  { icon: <Building size={24} />, title: 'Clinical Decision Support', desc: 'Assist ophthalmologists by flagging potential diseases in fundus images.' },
  { icon: <MapPin size={24} />, title: 'Rural Healthcare Screening', desc: 'Portable AI diagnosis for under-served communities without specialist access.' },
  { icon: <Smartphone size={24} />, title: 'Telemedicine Integration', desc: 'Remote diagnosis platform compatible with mobile and low-bandwidth environments.' },
]

export default function Applications() {
  return (
    <section id="applications" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Use Cases</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>
            Real-World <span className="gradient-text">Applications</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {apps.map((a, i) => (
            <div key={i} className="card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                width: 60, height: 60, borderRadius: 16, margin: '0 auto 20px',
                background: 'var(--bg-card-hover)', 
                border: '1px solid var(--border-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-cyan)',
                transition: 'background 0.3s ease, border 0.3s ease'
              }}>
                {a.icon}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{a.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Future improvements */}
        <div className="card" style={{ marginTop: 40, padding: '40px 48px' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>
            🚀 Future <span className="gradient-text">Improvements</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              'Increase dataset size',
              'Hybrid model architectures',
              'Mobile device deployment',
              'Hospital system integration',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--bg-card-hover)', 
                  border: '1px solid var(--border-hover)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'var(--accent-cyan)', fontWeight: 700,
                  transition: 'background 0.3s ease, border 0.3s ease'
                }}>{i + 1}</span>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px) {
          #applications .container>div:first-child+div { grid-template-columns: 1fr 1fr !important; }
          #applications .card div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}