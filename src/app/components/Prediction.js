'use client'
import { useState, useRef } from 'react'
import { Upload, Loader, AlertCircle, CheckCircle, Eye } from 'lucide-react'

export default function Prediction() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setResult(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) handleFile(f)
  }

  // --- THIS IS THE MAGIC CONNECTION ---
  const predict = async () => {
    if (!file) return
    setLoading(true)
    
    try {
      // 1. Prepare the image file to be sent
      const formData = new FormData()
      formData.append('file', file)

      // 2. Send it to your FastAPI backend
      const response = await fetch('https://shambhu7171-retinal-ai-api.hf.space/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status} error.`)
      }

      // 3. Get the real prediction back!
      const data = await response.json()
      setResult(data)
      
    } catch (error) {
      console.error("Prediction error:", error)
      alert("Failed to connect to the AI model. Make sure your Python backend is running!")
    } finally {
      setLoading(false)
    }
  }

  const diseaseColors = {
    'Diabetic Retinopathy': '#ef4444',
    'Glaucoma': '#8b5cf6',
    'Cataract': '#f59e0b',
    'Normal': '#10b981',
  }

  return (
    <section id="prediction" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>AI Prediction</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>
            Retinal Image <span className="gradient-text">Disease Classifier</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
            Upload a retinal fundus image. DenseNet169 will classify it into one of four disease categories.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {/* Upload */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              style={{
                border: `2px dashed ${dragging ? 'var(--accent-cyan)' : 'var(--border-hover)'}`,
                borderRadius: 16, padding: '40px 24px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
                background: dragging ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                minHeight: 260,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
              {preview ? (
                <img src={preview} alt="preview" style={{
                  maxHeight: 200, maxWidth: '100%', borderRadius: 8, objectFit: 'contain',
                }} />
              ) : (
                <>
                  <div style={{
                    width: 60, height: 60, borderRadius: 14,
                    background: 'var(--bg-primary)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, color: 'var(--accent-cyan)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Upload size={24} />
                  </div>
                  <p style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>Drag & drop retinal image</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>JPG, PNG · Max 10MB</p>
                </>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />

            <button onClick={predict} disabled={!file || loading}
              className="btn-primary"
              style={{
                width: '100%', marginTop: 16, justifyContent: 'center',
                opacity: (!file || loading) ? 0.5 : 1,
                cursor: (!file || loading) ? 'not-allowed' : 'pointer',
              }}>
              {loading ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <><Eye size={16} /> Predict Disease</>}
            </button>
          </div>

          {/* Result */}
          <div className="card" style={{ padding: 32 }}>
            {!result ? (
              <div style={{
                height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, opacity: 0.6,
              }}>
                <AlertCircle size={40} color="var(--accent-cyan)" />
                <p style={{ color: 'var(--text-secondary)' }}>Upload an image and run prediction to see results</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <CheckCircle size={20} color="#10b981" />
                  <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Analysis Complete</span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>PREDICTED DISEASE</p>
                <h3 style={{ fontSize: 26, fontWeight: 800, color: diseaseColors[result.disease] || 'var(--accent-cyan)', marginBottom: 4 }}>
                  {result.disease}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28 }}>
                  Confidence: <strong style={{ color: 'var(--text-primary)' }}>{(result.confidence * 100).toFixed(1)}%</strong>
                </p>

                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Class Probabilities
                </p>
                {result.breakdown.map(([disease, prob]) => (
                  <div key={disease} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{disease}</span>
                      <span style={{ fontSize: 13, fontFamily: "'Space Mono',monospace", color: diseaseColors[disease] }}>
                        {(prob * 100).toFixed(1)}%
                      </span>
                    </div>
                    {/* Progress bar track adapts to theme */}
                    <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', transition: 'background 0.3s ease' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: diseaseColors[disease] || 'var(--accent-cyan)',
                        width: `${prob * 100}%`, transition: 'width 0.8s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:768px) { #prediction .container>div>div { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}