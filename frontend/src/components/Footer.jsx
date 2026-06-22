import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import foodgoLogo from '../assets/image.png'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6'

function Footer() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const isOwner = userData?.role === 'owner'

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
      color: '#fef3c7',
      fontFamily: "'Inter', sans-serif",
      marginTop: 'auto',
    }}>

      {/* Top wave divider */}
      <div style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,40 C200,0 400,60 600,30 C800,0 1000,50 1200,20 L1200,0 L0,0 Z"
            fill="#fef3c7" />
        </svg>
      </div>

      {/* Main footer content */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '32px 24px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 36,
      }}>

        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <img
            src={foodgoLogo}
            alt="FoodGo"
            onClick={() => navigate('/')}
            style={{
              width: 110, height: 'auto', borderRadius: '18%',
              cursor: 'pointer', filter: 'brightness(1.1)',
            }}
          />
          <p style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.7, margin: 0 }}>
            Connecting food lovers with the best local restaurants. Fresh, fast and delicious — delivered to your door.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {[
              { Icon: FaFacebookF, label: 'Facebook' },
              { Icon: FaInstagram, label: 'Instagram' },
              { Icon: FaTwitter, label: 'Twitter' },
              { Icon: FaYoutube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <button key={label} title={label} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fef3c7', fontSize: 15,
                transition: 'background 0.2s, transform 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: '#fbbf24', margin: '0 0 16px', letterSpacing: '0.3px' }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: '🏠 Home', path: '/' },
              ...(isOwner ? [
                { label: '🏪 My Dashboard', path: '/owner/dashboard' },
                { label: '➕ Add Food Item', path: '/add-items' },
                { label: '🛠️ Manage Shop', path: '/create-edit-shop' },
              ] : [
                { label: '🍽️ Browse Restaurants', path: '/' },
                { label: '🛒 My Cart', path: '/' },
                { label: '📦 My Orders', path: '/' },
              ]),
            ].map(({ label, path }) => (
              <li key={label}>
                <span
                  onClick={() => navigate(path)}
                  style={{
                    fontSize: 14, color: '#fde68a', cursor: 'pointer',
                    transition: 'color 0.15s, padding-left 0.15s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '6px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#fde68a'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: '#fbbf24', margin: '0 0 16px', letterSpacing: '0.3px' }}>
            Contact Us
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { Icon: FaLocationDot, text: '123 Food Street, Mumbai, India' },
              { Icon: FaPhone, text: '+91 98765 43210' },
              { Icon: FaEnvelope, text: 'hello@foodgo.in' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Icon style={{ color: '#fbbf24', marginTop: 2, flexShrink: 0, fontSize: 15 }} />
                <span style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* App badges placeholder */}
          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            {['📱 App Store', '🤖 Play Store'].map(store => (
              <div key={store} style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10, padding: '6px 12px',
                fontSize: 12, color: '#fef3c7', cursor: 'pointer',
                fontWeight: 600,
              }}>
                {store}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', margin: '0 24px' }} />

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '16px 24px',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: 10,
      }}>
        <span style={{ fontSize: 13, color: '#fde68a', opacity: 0.8 }}>
          © {new Date().getFullYear()} FoodGo. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { name: 'Privacy Policy', path: '/privacy-policy' },
            { name: 'Terms of Service', path: '/terms-of-service' },
            { name: 'Refund Policy', path: '#' }
          ].map(link => (
            <span key={link.name} 
              onClick={() => link.path !== '#' && navigate(link.path)}
              style={{
                fontSize: 12, color: '#fde68a', cursor: 'pointer', opacity: 0.75,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.75'}
            >
              {link.name}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
