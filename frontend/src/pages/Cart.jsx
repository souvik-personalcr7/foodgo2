import React, { useState, useEffect, useRef } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQty, decrementQty, removeFromCart, clearCart } from '../Redux/cartSlice'
import { placeOrder } from '../Redux/ordersSlice'
import { useNavigate } from 'react-router-dom'

const GST_RATE = 0.18
const GST_THRESHOLD = 200

function CongratuationsPopup({ total, onDismiss }) {
  const popupRef = useRef(null)

  // Dismiss on any mouse move, scroll, touch, or click anywhere
  useEffect(() => {
    const dismiss = () => onDismiss()

    // slight delay so the popup renders before we attach listeners
    const timer = setTimeout(() => {
      window.addEventListener('mousemove', dismiss, { once: true })
      window.addEventListener('scroll', dismiss, { once: true, passive: true })
      window.addEventListener('touchstart', dismiss, { once: true })
      window.addEventListener('click', dismiss, { once: true })
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', dismiss)
      window.removeEventListener('scroll', dismiss)
      window.removeEventListener('touchstart', dismiss)
      window.removeEventListener('click', dismiss)
    }
  }, [onDismiss])

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9998,
        animation: 'fadeInBg 0.3s ease',
      }} />

      {/* Popup */}
      <div ref={popupRef} style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)',
        borderRadius: 28,
        padding: '44px 48px 40px',
        maxWidth: 420,
        width: '90vw',
        textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.25), 0 0 0 2px #fde68a',
        animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Confetti emojis */}
        <div style={{ fontSize: 56, marginBottom: 8, animation: 'bounce 0.6s ease infinite alternate' }}>🎉</div>
        <h2 style={{
          margin: '0 0 6px',
          fontSize: 26, fontWeight: 800, color: '#92400e',
          lineHeight: 1.2,
        }}>Congratulations!</h2>
        <p style={{ margin: '0 0 20px', fontSize: 15, color: '#78716c', lineHeight: 1.5 }}>
          Your order has been placed successfully!<br />
          <strong style={{ color: '#b45309' }}>₹{total}</strong> will be collected on delivery.
        </p>

        {/* Animated checkmark */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 4px 16px rgba(22,163,74,0.4)',
          animation: 'checkIn 0.4s 0.2s ease both',
        }}>
          <span style={{ color: '#fff', fontSize: 30, fontWeight: 800 }}>✓</span>
        </div>

        <p style={{ fontSize: 12, color: '#a8a29e', margin: 0 }}>
          Move your cursor or scroll to go to My Orders...
        </p>
      </div>
    </>
  )
}

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(state => state.cart)
  const [showPopup, setShowPopup] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const applyGST = subtotal > GST_THRESHOLD
  const gstAmount = applyGST ? Math.round(subtotal * GST_RATE) : 0
  const grandTotal = subtotal + gstAmount

  // Group items by shop
  const shopGroups = items.reduce((acc, item) => {
    const key = item.shopName || 'Unknown Shop'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const handlePlaceOrder = () => {
    const order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      subtotal,
      gst: gstAmount,
      total: grandTotal,
      placedAt: new Date().toISOString(),
      status: 'Confirmed',
    }
    dispatch(placeOrder(order))
    dispatch(clearCart())
    setOrderTotal(grandTotal)
    setShowPopup(true)
  }

  const handleDismissPopup = () => {
    setShowPopup(false)
    navigate('/my-orders')
  }

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
        @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-8px); }
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .gst-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid #f59e0b;
          borderRadius: 20px;
          padding: 2px 10px;
          fontSize: 11px;
          fontWeight: 700;
          color: #92400e;
        }
      `}</style>

      {showPopup && (
        <CongratuationsPopup
          total={orderTotal.toFixed(0)}
          onDismiss={handleDismissPopup}
        />
      )}

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
        {items.length === 0 && !showPopup && (
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

                {/* Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#78716c' }}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span style={{ fontWeight: 700, color: '#1c1917' }}>₹{subtotal.toFixed(0)}</span>
                </div>

                {/* GST row - only when subtotal > 200 */}
                {applyGST && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, color: '#78716c' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      GST (18%)
                      <span style={{
                        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                        border: '1px solid #f59e0b',
                        borderRadius: 20,
                        padding: '1px 8px',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#92400e',
                      }}>applicable on orders &gt; ₹200</span>
                    </span>
                    <span style={{ fontWeight: 700, color: '#b45309' }}>+ ₹{gstAmount}</span>
                  </div>
                )}

                {/* Delivery */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#78716c' }}>
                  <span>Delivery charge</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>FREE</span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#fde68a', margin: '4px 0' }} />

                {/* Grand Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: '#92400e' }}>
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(0)}</span>
                </div>

                {/* GST note */}
                {applyGST && (
                  <div style={{
                    fontSize: 11, color: '#92400e',
                    background: '#fffbeb',
                    border: '1px dashed #fde68a',
                    borderRadius: 8,
                    padding: '6px 10px',
                    marginTop: 2,
                  }}>
                    ℹ️ 18% GST applied on subtotal of ₹{subtotal.toFixed(0)} (orders above ₹200)
                  </div>
                )}
              </div>
              <div style={{ padding: '14px 20px 20px' }}>
                <button
                  onClick={handlePlaceOrder}
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
                  🚀 Place Order · ₹{grandTotal.toFixed(0)}
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
