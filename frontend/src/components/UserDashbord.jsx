import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const VEG_ICON = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 18, height: 18, border: '2px solid #16a34a', borderRadius: 3, flexShrink: 0
  }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', display: 'block' }} />
  </span>
)

const NONVEG_ICON = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 18, height: 18, border: '2px solid #dc2626', borderRadius: 3, flexShrink: 0
  }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', display: 'block' }} />
  </span>
)

const CATEGORY_COLORS = {
  'Snacks': '#f59e0b',
  'Main Course': '#10b981',
  'Desserts': '#ec4899',
  'Pizza': '#f97316',
  'Burgers': '#84cc16',
  'Sandwiches': '#06b6d4',
  'South Indian': '#8b5cf6',
  'North Indian': '#ef4444',
  'Chinese': '#f43f5e',
  'Fast Food': '#eab308',
  'Others': '#6b7280',
}

function ItemCard({ item }) {
  const isVeg = item.foodType === 'veg'
  const catColor = CATEGORY_COLORS[item.category] || '#6b7280'
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      border: '1px solid #fef3c7',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.13)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '66%', background: '#fef9f0', flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover'
          }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <span style={{
          position: 'absolute', top: 8, left: 8,
          background: catColor, color: '#fff',
          fontSize: 10, fontWeight: 700, padding: '2px 8px',
          borderRadius: 20, letterSpacing: '0.5px', textTransform: 'uppercase'
        }}>
          {item.category}
        </span>
      </div>
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isVeg ? <VEG_ICON /> : <NONVEG_ICON />}
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1c1917', lineHeight: 1.2 }}>{item.name}</span>
        </div>
        <div style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#b45309' }}>₹{item.price}</span>
          <span style={{
            fontSize: 11, color: isVeg ? '#16a34a' : '#dc2626',
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px'
          }}>
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
      </div>
    </div>
  )
}

function ShopCard({ shop }) {
  const [expanded, setExpanded] = useState(false)
  const items = shop.item || []

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
      overflow: 'hidden',
      border: '1px solid #fde68a',
      transition: 'box-shadow 0.2s',
      width: '100%',
    }}>
      {/* Shop Header */}
      <div style={{ display: 'flex', gap: 0, flexDirection: 'column' }}>
        {shop.image && (
          <div style={{ position: 'relative', width: '100%', paddingTop: '42%', background: '#fef9f0' }}>
            <img
              src={shop.image}
              alt={shop.name}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)'
            }} />
            <div style={{
              position: 'absolute', bottom: 14, left: 18, right: 18,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8
            }}>
              <div>
                <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22, margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  {shop.name}
                </h2>
                <span style={{ color: '#fde68a', fontSize: 13, fontWeight: 500 }}>
                  📍 {shop.city}, {shop.state}
                </span>
              </div>
              <span style={{
                background: items.length > 0 ? '#b45309' : '#9ca3af',
                color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '4px 12px', borderRadius: 20, flexShrink: 0
              }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        )}

        {!shop.image && (
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ color: '#92400e', fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>{shop.name}</h2>
              <span style={{ color: '#b45309', fontSize: 13 }}>📍 {shop.city}, {shop.state}</span>
            </div>
            <span style={{
              background: '#b45309', color: '#fff', fontSize: 12, fontWeight: 700,
              padding: '4px 12px', borderRadius: 20
            }}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        )}

        {/* Address row */}
        <div style={{ padding: '10px 18px', background: '#fffbeb', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: '#78716c' }}>🏠 {shop.address}</span>
        </div>
      </div>

      {/* Toggle Items Button */}
      {items.length > 0 && (
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            width: '100%', background: expanded ? '#fef3c7' : '#fff7ed',
            border: 'none', borderTop: '1px solid #fde68a',
            padding: '12px 18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: '#b45309', fontWeight: 700, fontSize: 14, transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fde68a'}
          onMouseLeave={e => e.currentTarget.style.background = expanded ? '#fef3c7' : '#fff7ed'}
        >
          <span>🍽️ View Menu ({items.length} items)</span>
          <span style={{
            display: 'inline-block',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s', fontSize: 18, lineHeight: 1
          }}>▾</span>
        </button>
      )}

      {items.length === 0 && (
        <div style={{ padding: '14px 18px', color: '#a8a29e', fontSize: 13, fontStyle: 'italic' }}>
          No food items added yet.
        </div>
      )}

      {/* Items Grid */}
      {expanded && items.length > 0 && (
        <div style={{
          padding: '16px 18px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 14,
          background: '#fffbeb',
          borderTop: '1px solid #fde68a',
          animation: 'fadeIn 0.2s ease'
        }}>
          {items.map((item, idx) => (
            <ItemCard key={item._id || idx} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function UserDashbord() {
  const { allShops, userData } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all' | 'veg' | 'non-veg'

  const filteredShops = allShops.filter(shop => {
    const matchesSearch =
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.city.toLowerCase().includes(search.toLowerCase()) ||
      shop.state.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    if (filterType === 'all') return true
    // filter shops that have at least one item of that type
    return (shop.item || []).some(item => item.foodType === filterType)
  })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', padding: '28px 16px 48px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
      `}</style>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800,
          color: '#92400e', margin: '0 0 8px', lineHeight: 1.2
        }}>
          🍽️ Welcome, {userData?.name || 'Food Lover'}!
        </h1>
        <p style={{ color: '#78716c', fontSize: 15, margin: 0 }}>
          Browse restaurants and their menus near you
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div style={{
        maxWidth: 640, margin: '0 auto 32px',
        display: 'flex', flexDirection: 'column', gap: 12
      }}>
        <input
          type="text"
          placeholder="🔍 Search by shop name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 18px',
            border: '2px solid #fde68a', borderRadius: 50,
            fontSize: 15, outline: 'none', background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            color: '#1c1917', transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#b45309'}
          onBlur={e => e.target.style.borderColor = '#fde68a'}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: '🍽️ All', value: 'all' },
            { label: '🥦 Veg Only', value: 'veg' },
            { label: '🍗 Non-Veg', value: 'non-veg' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value)}
              style={{
                padding: '8px 20px', borderRadius: 50, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: 13, transition: 'all 0.15s',
                background: filterType === opt.value ? '#b45309' : '#fff',
                color: filterType === opt.value ? '#fff' : '#b45309',
                boxShadow: filterType === opt.value ? '0 2px 8px rgba(180,83,9,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                border: `2px solid ${filterType === opt.value ? '#b45309' : '#fde68a'}`,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shops List */}
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {allShops.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 24,
            border: '2px dashed #fde68a', color: '#a8a29e'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
            <h3 style={{ color: '#92400e', fontWeight: 700, margin: '0 0 8px' }}>No shops available yet</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Shops will appear here once owners register them.</p>
          </div>
        )}

        {allShops.length > 0 && filteredShops.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '48px 20px',
            background: '#fff', borderRadius: 24,
            border: '2px dashed #fde68a', color: '#a8a29e'
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
            <h3 style={{ color: '#92400e', fontWeight: 700, margin: '0 0 6px' }}>No results found</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Try a different search or filter.</p>
          </div>
        )}

        {filteredShops.map((shop, idx) => (
          <ShopCard key={shop._id || idx} shop={shop} />
        ))}
      </div>

      {/* Stats Footer */}
      {allShops.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 36, color: '#a8a29e', fontSize: 13 }}>
          Showing {filteredShops.length} of {allShops.length} restaurant{allShops.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

export default UserDashbord
