import { Database, Zap, Activity, Globe } from 'lucide-react'

const features = [
  { icon: <Database size={20} />, title: 'Dataset from Kaggle', desc: 'Trained on retinal fundus images to identify multiple ocular diseases across 4 classes.' },
  { icon: <Activity size={20} />, title: 'Top Model Accuracy 97%', desc: 'DenseNet169 achieved the highest accuracy in disease classification among all tested models.' },
  { icon: <Zap size={20} />, title: 'Edge Inference', desc: 'Fast real-time predictions using Jetson Nano Orin — no cloud dependency.' },
  { icon: <Globe size={20} />, title: 'Accessible Healthcare', desc: 'Low-cost, portable, real-time detection suitable for rural and remote areas.' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="section-tag">About the Project</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 20 }}>
              Automated Retinal<br />
              <span className="gradient-text">Disease Detection</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 16 }}>
              This project focuses on automatic detection of retinal diseases using deep learning.
              Retinal conditions like <strong style={{ color: 'var(--text-primary)' }}>diabetic retinopathy, glaucoma, and cataract</strong> can
              cause severe vision loss if undetected.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 36 }}>
              Multiple transfer learning models were trained on Kaggle fundus image datasets. The best
              performer — <strong style={{ color: 'var(--accent-cyan)' }}>DenseNet169 at ~97% accuracy</strong> — was
              deployed on a Jetson Nano Orin for edge inference.
            </p>
            <a href="#models" className="btn-outline">View Models →</a>
          </div>

          {/* Right — feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{
                padding: 24,
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'var(--bg-card-hover)', 
                  border: '1px solid var(--border-hover)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)', marginBottom: 14,
                  transition: 'background 0.3s ease, border 0.3s ease'
                }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{f.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about>div>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}