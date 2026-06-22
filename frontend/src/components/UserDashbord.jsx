import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../Redux/cartSlice'

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

function ItemCard({ item, shopName, onAdd }) {
  const isVeg = item.foodType === 'veg'
  const catColor = CATEGORY_COLORS[item.category] || '#6b7280'
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 800)
  }

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
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.13)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '66%', background: '#fef9f0', flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#b45309' }}>₹{item.price}</span>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={handleAdd}
            title="Add to cart"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: added ? '#16a34a' : '#b45309',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 20, fontWeight: 700,
              boxShadow: '0 2px 8px rgba(180,83,9,0.35)',
              transition: 'background 0.2s, transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ShopCard({ shop, search }) {
  const dispatch = useDispatch()
  const q = (search || '').trim().toLowerCase()
  const allItems = shop.item || []

  const isItemSearch = q.length > 0 && !shop.name.toLowerCase().includes(q)
    && !shop.city.toLowerCase().includes(q)
    && !shop.state.toLowerCase().includes(q)

  const visibleItems = isItemSearch
    ? allItems.filter(it => it.name.toLowerCase().includes(q) || (it.category || '').toLowerCase().includes(q))
    : allItems

  const [expanded, setExpanded] = useState(false)
  const hasItems = allItems.length > 0

  useEffect(() => {
    if (isItemSearch && visibleItems.length > 0) setExpanded(true)
    else if (!q) setExpanded(false)
  }, [q])

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, shopName: shop.name }))
  }

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
      {/* Clickable Shop Header */}
      <div
        onClick={() => hasItems && setExpanded(v => !v)}
        style={{ cursor: hasItems ? 'pointer' : 'default' }}
      >
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
              background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 55%)'
            }} />

            {/* TOP-RIGHT: items badge + tap hint */}
            <div style={{
              position: 'absolute', top: 10, right: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5,
            }}>
              <span style={{
                background: hasItems ? '#b45309' : '#9ca3af',
                color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '4px 12px', borderRadius: 20, flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              }}>
                {allItems.length} {allItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* BOTTOM-LEFT: shop name + location */}
            <div style={{
              position: 'absolute', bottom: 14, left: 18, right: 18,
            }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22, margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {shop.name}
              </h2>
              <span style={{ color: '#fde68a', fontSize: 13, fontWeight: 500 }}>
                📍 {shop.city}, {shop.state}
              </span>
            </div>
          </div>
        )}

        {!shop.image && (
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '20px 20px 16px',
            position: 'relative',
          }}>
            {/* TOP-RIGHT badge for no-image card */}
            <div style={{ position: 'absolute', top: 12, right: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <span style={{
                background: hasItems ? '#b45309' : '#9ca3af',
                color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '4px 12px', borderRadius: 20
              }}>
                {allItems.length} {allItems.length === 1 ? 'item' : 'items'}
              </span>
              {hasItems && (
                <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600 }}>
                  {expanded ? '▲ Close' : '▼ Tap to view menu'}
                </span>
              )}
            </div>
            <div style={{ paddingRight: 90 }}>
              <h2 style={{ color: '#92400e', fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>{shop.name}</h2>
              <span style={{ color: '#b45309', fontSize: 13 }}>📍 {shop.city}, {shop.state}</span>
            </div>
          </div>
        )}

        {/* Address row */}
        <div style={{ padding: '10px 18px', background: '#fffbeb', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: '#78716c' }}>🏠 {shop.address}</span>
        </div>
      </div>

      {/* Currently not available banner */}
      {!hasItems && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px',
          background: 'linear-gradient(90deg, #fff7ed, #fef3c7)',
          borderTop: '1px solid #fde68a',
        }}>
          <span style={{ fontSize: 22 }}>🚫</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#b45309' }}>Currently Not Available</div>
            <div style={{ fontSize: 12, color: '#a16207', marginTop: 1 }}>This shop has not added any menu items yet.</div>
          </div>
        </div>
      )}

      {/* Items Grid — shown when expanded */}
      {expanded && hasItems && (
        <div className="items-grid">
          {visibleItems.length > 0
            ? visibleItems.map((item, idx) => (
              <div className="item-card" key={item._id || idx}>
                <ItemCard
                  item={item}
                  shopName={shop.name}
                  onAdd={handleAddToCart}
                />
              </div>
            ))
            : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#a16207', fontSize: 13, width: '100%' }}>
                No matching items in this shop.
              </div>
            )
          }
        </div>
      )}
    </div>
  )
}

function UserDashbord() {
  const { allShops, userData } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [
    '/food-banner(1).jpg',
    '/food-banner2.png',
    '/food-banner3.1.avif'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const q = search.trim().toLowerCase()

  const filteredShops = allShops
    .filter(shop => {
      const matchesShop =
        shop.name.toLowerCase().includes(q) ||
        (shop.city || '').toLowerCase().includes(q) ||
        (shop.state || '').toLowerCase().includes(q)

      const matchesItem = (shop.item || []).some(
        it =>
          it.name.toLowerCase().includes(q) ||
          (it.category || '').toLowerCase().includes(q)
      )

      if (!matchesShop && !matchesItem) return false
      if (filterType === 'all') return true
      return (shop.item || []).some(item => item.foodType === filterType)
    })
    .sort((a, b) => {
      const aHasItems = (a.item || []).length > 0
      const bHasItems = (b.item || []).length > 0

      // Always push empty shops to the bottom
      if (aHasItems && !bHasItems) return -1
      if (!aHasItems && bHasItems) return 1

      if (!q) return 0

      const countMatches = shop =>
        (shop.item || []).filter(
          it =>
            it.name.toLowerCase().includes(q) ||
            (it.category || '').toLowerCase().includes(q)
        ).length

      const aMatches = countMatches(a)
      const bMatches = countMatches(b)

      if (bMatches !== aMatches) return bMatches - aMatches

      const aNameMatch = a.name.toLowerCase().includes(q) ? 1 : 0
      const bNameMatch = b.name.toLowerCase().includes(q) ? 1 : 0
      return bNameMatch - aNameMatch
    })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', padding: '28px 16px 48px', marginTop: '30px', borderRadius: '20px', width: '100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .items-grid {
          padding: 16px 18px 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 14px;
          background: #fffbeb;
          border-top: 1px solid #fde68a;
          animation: fadeIn 0.25s ease;
        }
        @media (max-width: 640px) {
          .items-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 12px;
            padding: 14px 14px 18px;
          }
          .items-grid::-webkit-scrollbar { display: none; }
          .item-card {
            min-width: 150px !important;
            width: 150px !important;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
        }
        /* Popular Categories bar */
        .cat-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .cat-chip {
          flex-shrink: 0;
          background: #fff;
          border: 2px solid #fde68a;
          border-radius: 30px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 700;
          color: #b45309;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .cat-chip:hover {
          background: #b45309;
          color: #fff;
          border-color: #b45309;
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .cat-bar {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            justify-content: flex-start;
            padding-bottom: 4px;
          }
          .cat-bar::-webkit-scrollbar { display: none; }
          .cat-chip {
            scroll-snap-align: start;
          }
        }
        /* Banners */
        .banner-carousel-wrapper {
          width: 100%;
          margin-bottom: 32px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .banner-container {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          width: 100%;
          height: 500px;
        }
        .banner-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
        }
        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .banner-container {
            height: 280px;
          }
        }
      `}</style>


      {/* Banners */}
      <div className="banner-carousel-wrapper">
        <div className="banner-container" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
          {banners.map((src, i) => (
            <div key={i} className="banner-slide">
              <img src={src} alt={`Banner ${i+1}`} className="banner-image" />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {banners.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: currentBanner === i ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'background 0.3s' }} />
          ))}
        </div>
       </div>

      {/* Popular Categories Bar */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        padding: '14px 20px',
        marginBottom: 28,
        border: '1px solid #fde68a',
      }}>
        <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: '#a16207', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          🔥 Popular Categories
        </p>
        <div className="cat-bar">
          {['🍕 Pizza', '🍔 Burgers', '🥗 Salads', '🍜 Chinese', '🍛 Indian', '🥪 Sandwiches', '🍰 Desserts', '🥤 Drinks', '🌮 Snacks', '🍳 Fast Food'].map(cat => (
            <span
              key={cat}
              className="cat-chip"
              onClick={() => setSearch(cat.replace(/^\S+\s/, ''))}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800,
          color: '#92400e', margin: '0 0 8px', lineHeight: 1.2,
          marginTop: '20px'
        }}>
          🍽️ Welcome, {userData?.name || 'Food Lover'}!
        </h1>
        <p style={{ color: '#78716c', fontSize: 15, margin: 0 }}>
          Click any restaurant to browse its menu and add items to your cart
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div style={{ maxWidth: 640, margin: '0 auto 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <span style={{
            position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, pointerEvents: 'none', opacity: 0.5
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search shop name, food item, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 44px 12px 44px',
              border: '2px solid #fde68a', borderRadius: 50,
              fontSize: 15, outline: 'none', background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              color: '#1c1917', transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = '#b45309'}
            onBlur={e => e.target.style.borderColor = '#fde68a'}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: '#fde68a', border: 'none', borderRadius: '50%',
                width: 24, height: 24, cursor: 'pointer', fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#92400e', fontWeight: 700, lineHeight: 1
              }}
              title="Clear search"
            >✕</button>
          )}
        </div>
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
                padding: '8px 20px', borderRadius: 50, cursor: 'pointer',
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
          <ShopCard key={shop._id || idx} shop={shop} search={search} />
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
