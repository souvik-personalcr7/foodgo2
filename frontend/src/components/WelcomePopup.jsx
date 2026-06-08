import React, { useEffect, useState, useRef } from 'react'

const roleConfig = {
  user: {
    emoji: '🍽️',
    title: 'Welcome, Foodie!',
    subtitle: 'Discover amazing restaurants & menus near you.',
    headerBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    accent: '#b45309',
    badge: 'Customer',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    tips: ['Browse menus from top restaurants', 'Filter by Veg or Non-Veg', 'Search by city or shop name'],
  },
  owner: {
    emoji: '🏪',
    title: 'Welcome Back, Owner!',
    subtitle: 'Manage your shop, menu items, and track performance.',
    headerBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    accent: '#15803d',
    badge: 'Shop Owner',
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    tips: ['Add or edit your menu items', 'Update shop details anytime', 'Monitor your shop visibility'],
  },
}

function WelcomePopup({ userName, role }) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const config = roleConfig[role] || roleConfig['user']

  const dismiss = () => {
    setLeaving(true)
    setTimeout(() => setVisible(false), 400)
  }

  useEffect(() => {
    const handleScroll = () => dismiss()
    const handleTouch = () => dismiss()
    const handleKey = (e) => { if (e.key === 'Escape') dismiss() }

    window.addEventListener('scroll', handleScroll, { passive: true, once: true })
    window.addEventListener('touchstart', handleTouch, { passive: true, once: true })
    window.addEventListener('keydown', handleKey, { once: true })

    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => dismiss(), 8000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('keydown', handleKey)
      clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes popupIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
          60% { transform: translate(-50%, -50%) scale(1.03); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes popupOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9) translateY(-20px); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes tipSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
        .tip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          animation: tipSlide 0.4s ease both;
        }
        .tip-item:last-child { border-bottom: none; }
      `}</style>

      {/* Overlay — blurs the page behind, z-index below card */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Card — sits above the blur overlay, fully solid */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: 'min(92vw, 440px)',
          background: '#ffffff',
          borderRadius: 28,
          boxShadow: '0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.07)',
          overflow: 'hidden',
          animation: leaving ? 'popupOut 0.4s ease forwards' : 'popupIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}
      >

        {/* Progress bar (auto-dismiss timer) */}
        <div style={{
          height: 4, background: `rgba(0,0,0,0.08)`, width: '100%',
        }}>
          <div style={{
            height: '100%',
            background: config.accent,
            animation: 'progressBar 8s linear forwards',
            borderRadius: '0 4px 4px 0',
          }} />
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          title="Close (Esc)"
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32,
            background: '#ffffff',
            border: 'none', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, color: config.accent,
            boxShadow: '0 1px 6px rgba(0,0,0,0.18)',
            transition: 'transform 0.15s',
            zIndex: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >✕</button>

        {/* Coloured Header Banner */}
        <div style={{
          background: config.headerBg,
          padding: '24px 28px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            fontSize: 52, lineHeight: 1,
            animation: 'floatDot 2.5s ease-in-out infinite',
            display: 'inline-block',
          }}>
            {config.emoji}
          </div>
          <div>
            <span style={{
              background: `${config.accent}22`, color: config.accent,
              fontSize: 11, fontWeight: 700, padding: '3px 10px',
              borderRadius: 20, letterSpacing: '0.6px', textTransform: 'uppercase',
              border: `1px solid ${config.accent}40`,
              display: 'inline-block', marginBottom: 6,
            }}>
              {config.badge}
            </span>
            <h2 style={{
              margin: 0, fontWeight: 800,
              fontSize: 'clamp(18px, 5vw, 24px)',
              color: config.accent, lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}>
              {config.title.replace('Foodie', userName || 'Foodie').replace('Owner!', `${userName || 'Owner'}!`)}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 28px 24px' }}>

          {/* Subtitle */}
          <p style={{
            margin: '0 0 16px', color: '#57534e', fontSize: 14,
            lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
          }}>
            {config.subtitle}
          </p>

          {/* Tips */}
          <div style={{
            background: '#f9fafb', borderRadius: 16,
            padding: '12px 16px', marginBottom: 4,
            border: '1px solid #e5e7eb',
          }}>
            {config.tips.map((tip, i) => (
              <div key={i} className="tip-item" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: config.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: '#3c3a38', fontWeight: 500 }}>{tip}</span>
              </div>
            ))}
          </div>

          {/* Dismiss hints */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, color: config.accent, opacity: 0.65,
            justifyContent: 'center', marginTop: 12, fontWeight: 500,
            letterSpacing: '0.3px',
          }}>
            <span>↕ Scroll</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>👆 Touch</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Esc</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>to dismiss</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePopup
