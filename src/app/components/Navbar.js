'use client'
import { useState, useEffect } from 'react'
import { Eye, Menu, X, Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Defaulting to false (light mode) to match your reference image
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load the saved theme when the page loads
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [])

  // Function to run when the button is clicked
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Saves preference!
  }
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Dataset', 'Models', 'Prediction', 'Performance']

  // Theme configuration based on your UI image
  const theme = isDarkMode ? {
    navBg: scrolled ? 'rgba(2,13,24,0.95)' : 'transparent',
    border: scrolled ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.7)',
    accent: '#00d4ff',
    logoBg: 'linear-gradient(135deg, #00d4ff, #00b4a0)',
    mobileMenuBg: 'rgba(4,20,36,0.98)',
    mobileBorder: 'rgba(255,255,255,0.1)',
    btnText: '#020d18'
  } : {
    navBg: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    accent: '#42a8b3', // Teal color extracted from your image
    logoBg: 'linear-gradient(135deg, #42a8b3, #368f98)',
    mobileMenuBg: 'rgba(255,255,255,0.98)',
    mobileBorder: 'rgba(0,0,0,0.05)',
    btnText: '#ffffff'
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '16px 0',
      background: theme.navBg,
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: theme.border,
      transition: 'all 0.4s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: theme.logoBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s ease'
          }}>
            <Eye size={20} color={isDarkMode ? "#020d18" : "#ffffff"} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: theme.textPrimary, letterSpacing: '-0.3px', transition: 'color 0.3s ease' }}>
            Retinal<span style={{ color: theme.accent, transition: 'color 0.3s ease' }}>AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center', margin: 0 }}
          className="desktop-nav">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={{
                color: theme.textSecondary, textDecoration: 'none',
                fontSize: 14, fontWeight: 500, letterSpacing: '0.3px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = theme.accent}
                onMouseLeave={e => e.target.style.color = theme.textSecondary}
              >{l}</a>
            </li>
          ))}
          
          {/* Unique Theme Toggle Button - FIXED ONCLICK */}
          <li>
            <button
              onClick={toggleTheme}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '56px',
                height: '28px',
                borderRadius: '50px',
                background: isDarkMode ? '#1a2b3c' : '#e2e8f0',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                padding: '4px',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              aria-label="Toggle Theme"
            >
              <Sun size={14} color={isDarkMode ? '#475569' : '#f59e0b'} style={{ zIndex: 1, marginLeft: '2px' }} />
              <Moon size={14} color={isDarkMode ? '#00d4ff' : '#94a3b8'} style={{ zIndex: 1, marginRight: '2px' }} />
              <div style={{
                position: 'absolute',
                top: '2px',
                left: isDarkMode ? '30px' : '2px',
                width: '22px',
                height: '22px',
                backgroundColor: isDarkMode ? '#020d18' : '#ffffff',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                transition: 'left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              }} />
            </button>
          </li>

          <li>
            <a href="#prediction" style={{ 
              padding: '10px 22px', 
              fontSize: 14, 
              fontWeight: 600,
              background: theme.accent,
              color: theme.btnText,
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Try Demo
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: theme.textPrimary, cursor: 'pointer', display: 'none' }}
          className="mobile-menu-btn">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: theme.mobileMenuBg, backdropFilter: 'blur(20px)',
          padding: '24px', borderTop: `1px solid ${theme.mobileBorder}`,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 0',
                color: theme.textSecondary, textDecoration: 'none',
                fontSize: 15, borderBottom: `1px solid ${theme.mobileBorder}`,
              }}>
              {l}
            </a>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${theme.mobileBorder}` }}>
            <span style={{ color: theme.textSecondary, fontSize: 15 }}>Theme</span>
            {/* Mobile Theme Toggle Button - FIXED ONCLICK */}
            <button
              onClick={toggleTheme}
              style={{
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '56px', height: '28px', borderRadius: '50px',
                background: isDarkMode ? '#1a2b3c' : '#e2e8f0',
                border: 'none', cursor: 'pointer',
              }}
            >
              <div style={{
                position: 'absolute', top: '2px', left: isDarkMode ? '30px' : '2px',
                width: '24px', height: '24px', backgroundColor: isDarkMode ? '#020d18' : '#ffffff',
                borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'left 0.3s ease'
              }} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}