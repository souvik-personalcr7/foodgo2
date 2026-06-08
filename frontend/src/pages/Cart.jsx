import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQty, decrementQty, removeFromCart, clearCart } from '../Redux/cartSlice'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(state => state.cart)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Group items by shop
  const shopGroups = items.reduce((acc, item) => {
    const key = item.shopName || 'Unknown Shop'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      padding: '28px 16px 60px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, marginTop: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#fde68a', border: 'none', borderRadius: '50%',
              width: 40, height: 40, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#92400e',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            title="Back to home"
          ><IoMdArrowRoundBack size={22} /></button>
          <div>
            <h1 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(22px, 4vw, 30px)', color: '#92400e' }}>
              🛒 My Cart
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: '#78716c' }}>
              {totalItems > 0
                ? `${totalItems} item${totalItems !== 1 ? 's' : ''} from ${Object.keys(shopGroups).length} restaurant${Object.keys(shopGroups).length !== 1 ? 's' : ''}`
                : 'Your cart is empty'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                marginLeft: 'auto',
                background: '#fee2e2', border: '1px solid #fca5a5',
                color: '#dc2626', borderRadius: 20, padding: '6px 16px',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
              onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 24,
            border: '2px dashed #fde68a', color: '#a8a29e',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <h2 style={{ color: '#92400e', fontWeight: 700, margin: '0 0 8px', fontSize: 22 }}>
              Your cart is empty
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 14 }}>
              Browse restaurants and tap <strong style={{ color: '#b45309' }}>+</strong> on any dish to add it here.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#b45309', color: '#fff',
                border: 'none', borderRadius: 30,
                padding: '12px 28px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 12px rgba(180,83,9,0.3)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🍽️ Browse Restaurants
            </button>
          </div>
        )}

        {/* Cart items grouped by shop */}
        {items.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeIn 0.3s ease' }}>
            {Object.entries(shopGroups).map(([shopName, shopItems]) => (
              <div key={shopName} style={{
                background: '#fff',
                borderRadius: 20,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                border: '1px solid #fde68a',
              }}>
                {/* Shop name header */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  padding: '12px 18px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderBottom: '1px solid #fde68a',
                }}>
                  <span style={{ fontSize: 18 }}>🏪</span>
                  <span style={{ fontWeight: 800, fontSize: 15, color: '#92400e' }}>{shopName}</span>
                  <span style={{
                    marginLeft: 'auto',
                    background: '#b45309', color: '#fff',
                    fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20
                  }}>
                    {shopItems.length} {shopItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Items */}
                {shopItems.map((item, idx) => (
                  <div key={item._id || idx} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px',
                    borderBottom: idx < shopItems.length - 1 ? '1px solid #fef3c7' : 'none',
                  }}>
                    {/* Food image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 70, height: 70, borderRadius: 12,
                        objectFit: 'cover', flexShrink: 0,
                        border: '2px solid #fef3c7',
                      }}
                      onError={e => { e.target.style.display = 'none' }}
                    />

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#1c1917', marginBottom: 4 }}>
                        {item.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px',
                          borderRadius: 20, background: '#fde68a', color: '#92400e',
                          textTransform: 'uppercase',
                        }}>{item.category}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 600,
                          color: item.foodType === 'veg' ? '#16a34a' : '#dc2626',
                          textTransform: 'uppercase',
                        }}>
                          {item.foodType === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                      </div>
                      <div style={{ marginTop: 6, fontWeight: 800, fontSize: 15, color: '#b45309' }}>
                        ₹{(item.price * item.quantity).toFixed(0)}
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginLeft: 4 }}>
                          (₹{item.price} × {item.quantity})
                        </span>
                      </div>
                    </div>

                    {/* Qty controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          onClick={() => dispatch(decrementQty(item._id))}
                          style={{
                            width: 30, height: 30, borderRadius: '50%',
                            background: '#fef3c7', border: '2px solid #fde68a',
                            cursor: 'pointer', fontSize: 18, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#b45309', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fde68a'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fef3c7'}
                        >−</button>
                        <span style={{ fontWeight: 800, fontSize: 16, color: '#1c1917', minWidth: 20, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQty(item._id))}
                          style={{
                            width: 30, height: 30, borderRadius: '50%',
                            background: '#b45309', border: 'none',
                            cursor: 'pointer', fontSize: 18, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', boxShadow: '0 2px 6px rgba(180,83,9,0.3)',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#92400e'}
                          onMouseLeave={e => e.currentTarget.style.background = '#b45309'}
                        >+</button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: 11, color: '#dc2626', fontWeight: 600,
                          padding: '2px 0', opacity: 0.7, transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                      >🗑 Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Order Summary */}
            <div style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #fde68a',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #fef3c7' }}>
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: 16, color: '#92400e' }}>🧾 Order Summary</h3>
              </div>
              <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#78716c' }}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span style={{ fontWeight: 700, color: '#1c1917' }}>₹{total.toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#78716c' }}>
                  <span>Delivery charge</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>FREE</span>
                </div>
                <div style={{
                  height: 1, background: '#fde68a', margin: '4px 0'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: '#92400e' }}>
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>
              <div style={{ padding: '14px 20px 20px' }}>
                <button
                  style={{
                    width: '100%', background: 'linear-gradient(135deg, #b45309, #92400e)',
                    color: '#fff', border: 'none', borderRadius: 14,
                    padding: '14px', fontSize: 16, fontWeight: 800,
                    cursor: 'pointer', boxShadow: '0 4px 14px rgba(180,83,9,0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(180,83,9,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(180,83,9,0.35)' }}
                >
                  🚀 Place Order · ₹{total.toFixed(0)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
