'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useEffect, useState } from 'react'

const data = [
  { model: 'MobileNet', acc: 92 },
  { model: 'VGG', acc: 93 },
  { model: 'ResNet', acc: 94 },
  { model: 'EfficientNet', acc: 95 },
  { model: 'Swin', acc: 96 },
  { model: 'DenseNet169', acc: 97 },
]

export default function Performance() {
  // We need to dynamically get the CSS variables to pass to Recharts
  const [themeColors, setThemeColors] = useState({
    textSecondary: '#7ab3cc',
    accentCyan: '#00d4ff',
    accentTeal: '#00b4a0',
    bgCardHover: '#071e30',
    textPrimary: '#e8f4f8',
    gridLine: 'rgba(255,255,255,0.04)'
  });

  // Updates Recharts colors when theme changes
  useEffect(() => {
    // Small delay to ensure global CSS vars have updated
    const updateColors = () => {
      const root = getComputedStyle(document.body);
      setThemeColors({
        textSecondary: root.getPropertyValue('--text-secondary').trim(),
        accentCyan: root.getPropertyValue('--accent-cyan').trim(),
        accentTeal: root.getPropertyValue('--accent-teal').trim(),
        bgCardHover: root.getPropertyValue('--bg-card-hover').trim(),
        textPrimary: root.getPropertyValue('--text-primary').trim(),
        gridLine: root.getPropertyValue('--grid-line').trim(),
      });
    };
    
    updateColors();
    // Optional: Add a mutation observer if you want it perfectly synced without a page reload
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="performance" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Results</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)' }}>
            Model <span className="gradient-text">Performance Comparison</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {/* Chart */}
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ marginBottom: 24, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Accuracy by Model</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={themeColors.gridLine} />
                <XAxis dataKey="model" tick={{ fill: themeColors.textSecondary, fontSize: 11 }} axisLine={false} />
                <YAxis domain={[88, 100]} tick={{ fill: themeColors.textSecondary, fontSize: 11 }} axisLine={false} />
                <Tooltip
                  contentStyle={{ 
                    background: themeColors.bgCardHover, 
                    border: `1px solid ${themeColors.accentCyan}`, 
                    borderRadius: 8, 
                    color: themeColors.textPrimary 
                  }}
                  formatter={(v) => [`${v}%`, 'Accuracy']}
                />
                <Bar dataKey="acc" radius={[4, 4, 0, 0]}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.model === 'DenseNet169' ? themeColors.accentCyan : themeColors.accentTeal} opacity={d.model === 'DenseNet169' ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ marginBottom: 24, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Accuracy Table</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Model</th>
                  <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().map((d, i) => (
                  <tr key={i}>
                    <td style={{
                      padding: '14px 0', fontSize: 14,
                      fontWeight: d.model === 'DenseNet169' ? 700 : 400,
                      color: d.model === 'DenseNet169' ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      {d.model} {d.model === 'DenseNet169' && '★'}
                    </td>
                    <td style={{
                      padding: '14px 0', textAlign: 'right',
                      fontFamily: "'Space Mono', monospace", fontSize: 14,
                      // Kept emerald green for DenseNet accuracy stat as it signifies success, but let others adapt
                      color: d.model === 'DenseNet169' ? '#10b981' : 'var(--text-secondary)',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      {d.acc}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#performance .container>div>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}