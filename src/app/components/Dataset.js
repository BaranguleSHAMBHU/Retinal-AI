const classes = [
  // Added the exact file paths based on your screenshot
  { name: 'Cataract', color: '#f59e0b', desc: 'Clouding of the eye lens causing blurred vision.', image: '/cataract.jpg' },
  { name: 'Diabetic Retinopathy', color: '#ef4444', desc: 'Damage to retinal blood vessels from high blood sugar.', image: '/Diabetic Retinopathy.png' },
  { name: 'Glaucoma', color: '#8b5cf6', desc: 'Optic nerve damage often linked to elevated eye pressure.', image: '/Glaucoma.jpg' },
  { name: 'Normal', color: '#10b981', desc: 'Healthy retina with no signs of disease.', image: '/normal.jpg' },
]

export default function Dataset() {
  return (
    <section id="dataset" style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, transparent, var(--grid-line), transparent)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Dataset</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>
            Retinal Fundus <span className="gradient-text">Image Dataset</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Kaggle-sourced retinal fundus images preprocessed with augmentation techniques.
            Images resized, normalized, and augmented with rotation & flipping.
          </p>
        </div>

        {/* Dataset info pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 60 }}>
          {[
            { label: 'Image Type', value: 'Retinal Fundus' },
            { label: 'Format', value: 'JPG / PNG' },
            { label: 'Source', value: 'Kaggle' },
            { label: 'Augmentation', value: 'Rotation & Flip' },
          ].map(p => (
            <div key={p.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 50, padding: '10px 24px', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{p.label}:</span>
              <span style={{ color: 'var(--accent-cyan)', fontFamily: "'Space Mono',monospace", fontSize: 12 }}>{p.value}</span>
            </div>
          ))}
        </div>

        {/* Disease class cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {classes.map((c, i) => (
            <div key={i} className="card" style={{ padding: 28, textAlign: 'center' }}>
              
              {/* Replaced CSS circles with actual images */}
              <img 
                src={c.image} 
                alt={c.name}
                style={{
                  width: 90, height: 90, 
                  borderRadius: '50%', 
                  margin: '0 auto 20px',
                  objectFit: 'cover', // Ensures the image fills the circle without squishing
                  border: `2px solid ${c.color}88`,
                  boxShadow: `0 0 20px ${c.color}22`, // Keeps a subtle glow matching the disease color
                  display: 'block'
                }} 
              />
              
              <div style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: 50,
                background: `${c.color}18`, border: `1px solid ${c.color}44`,
                color: c.color, fontSize: 12, fontWeight: 600, marginBottom: 12,
              }}>{c.name}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#dataset .container>div:last-child{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  )
}