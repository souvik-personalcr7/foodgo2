import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

const STATUS_COLORS = {
  Pending: { bg: '#f3f4f6', color: '#4b5563', border: '#e5e7eb', icon: '⏳' },
  "Order Accepted": { bg: '#fef9c3', color: '#ca8a04', border: '#fde68a', icon: '👍' },
  "Order Ready": { bg: '#fef08a', color: '#854d0e', border: '#fde047', icon: '🛍️' },
  "Order picked by Delivery Boy": { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe', icon: '🛵' },
  Confirmed: { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', icon: '✅' },
  "order delivery successfull": { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0', icon: '📬' },
  Cancelled: { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', icon: '❌' },
}

function OrderCard({ order, index }) {
  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.Confirmed
  const date = new Date(order.placedAt)
  const formattedDate = date.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })

  // Group items by shop
  const shopGroups = order.items.reduce((acc, item) => {
    const key = item.shopName || 'Unknown Shop'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #fde68a',
      overflow: 'hidden',
      animation: 'fadeIn 0.3s ease',
    }}>
      {/* Order header */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        borderBottom: '1px solid #fde68a',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#92400e' }}>
            📦 {order.id}
          </div>
          <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>
            🕐 {formattedDate}
          </div>
        </div>
        <span style={{
          background: statusStyle.bg,
          color: statusStyle.color,
          border: `1px solid ${statusStyle.border}`,
          borderRadius: 20,
          padding: '4px 14px',
          fontSize: 12, fontWeight: 700,
          flexShrink: 0,
        }}>
          {statusStyle.icon} {order.status}
        </span>
      </div>

      {/* Items grouped by shop */}
      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(shopGroups).map(([shopName, shopItems]) => (
          <div key={shopName}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 8,
            }}>
              <span style={{ fontSize: 14 }}>🏪</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#b45309' }}>{shopName}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 20 }}>
              {shopItems.map((item, idx) => (
                <div key={item._id || idx} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 44, height: 44, borderRadius: 8,
                      objectFit: 'cover', flexShrink: 0,
                      border: '1.5px solid #fef3c7',
                    }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1c1917' }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: '#78716c' }}>
                      {item.quantity} × ₹{item.price}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#b45309' }}>
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div style={{
        borderTop: '1px solid #fef3c7',
        padding: '12px 20px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#78716c' }}>
          <span>Subtotal</span>
          <span>₹{order.subtotal?.toFixed(0) || 0}</span>
        </div>
        {order.gst > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#78716c' }}>
            <span>GST (18%)</span>
            <span style={{ color: '#b45309' }}>+ ₹{order.gst}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#92400e', paddingTop: 4, borderTop: '1px dashed #fde68a' }}>
          <span>Total Paid</span>
          <span>₹{order.total?.toFixed(0) || 0}</span>
        </div>
      </div>
    </div>
  )
}

function MyOrders() {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.orders)

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
              📋 My Orders
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: '#78716c' }}>
              {orders.length > 0
                ? `${orders.length} order${orders.length !== 1 ? 's' : ''} placed`
                : 'No orders yet'}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 24,
            border: '2px dashed #fde68a', color: '#a8a29e',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
            <h2 style={{ color: '#92400e', fontWeight: 700, margin: '0 0 8px', fontSize: 22 }}>
              No orders yet
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 14 }}>
              Browse restaurants and place your first order!
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

        {/* Orders list */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
