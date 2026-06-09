import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaClock, FaCheckCircle, FaArrowLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { updateOrderStatus } from '../Redux/ordersSlice'

function OwnerOrdersPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.orders)
  const { myShopData } = useSelector(state => state.owner)

  // For demo purposes, we will show ALL pending and accepted orders so they don't get hidden if placed for a different shop
  const pendingOrders = orders.filter(order => order.status === "Pending" || order.status === "Order Accepted")

  const handleAcceptAll = () => {
    pendingOrders.forEach(order => {
      if (order.status === "Pending") {
        dispatch(updateOrderStatus({ id: order.id, status: 'Order Accepted' }))
      }
    })
    import('react-hot-toast').then(({ default: toast }) => toast.success('All Pending Orders Accepted!'))
  }

  return (
    <div className='min-h-screen bg-amber-50 p-6 font-sans'>
      <div className='max-w-4xl mx-auto'>
        
        {/* Header */}
        <div className='flex items-center justify-between mb-8 flex-wrap gap-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/owner/dashboard')}
              className='bg-white border-2 border-amber-200 text-amber-700 p-3 rounded-full hover:bg-amber-100 transition-colors shadow-sm'
              title='Back to Dashboard'
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h1 className='text-3xl font-bold text-amber-900'>Incoming Orders</h1>
              <p className='text-amber-700 font-medium'>
                {pendingOrders.length} {pendingOrders.length === 1 ? 'order' : 'orders'} waiting for acceptance
              </p>
            </div>
          </div>
          
          {pendingOrders.length > 1 && (
            <button 
              onClick={handleAcceptAll}
              className='bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-2'
            >
              <FaCheckCircle /> Accept All {pendingOrders.length} Orders
            </button>
          )}
        </div>

        {/* Warning if shop data isn't loaded */}
        {!myShopData?.name && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6'>
            <strong>Warning:</strong> Your shop data could not be found. Please ensure you have created a shop in the Owner Dashboard first.
          </div>
        )}

        {/* Orders List */}
        {pendingOrders.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-sm border-2 border-dashed border-amber-300 p-12 text-center'>
            <div className='text-6xl mb-4'>😴</div>
            <h2 className='text-2xl font-bold text-amber-900 mb-2'>No pending orders</h2>
            <p className='text-amber-700'>When customers place an order for your shop, it will appear here.</p>
          </div>
        ) : (
          <div className='grid gap-6'>
            {pendingOrders.map(order => (
              <div key={order.id} className='bg-white rounded-2xl shadow-md border border-amber-200 overflow-hidden'>
                <div className='bg-amber-100 px-6 py-4 flex justify-between items-center border-b border-amber-200'>
                  <div>
                    <span className='font-bold text-amber-900 text-lg'>Order #{order.id}</span>
                    <span className='ml-4 text-sm font-medium text-amber-700 bg-amber-200 px-3 py-1 rounded-full'>
                      <FaClock className='inline mr-1' />
                      {new Date(order.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                <div className='p-6 flex flex-col md:flex-row justify-between items-center gap-6'>
                  <div className='flex-1 w-full'>
                    <h3 className='font-bold text-gray-800 mb-3 border-b pb-2'>Order Items:</h3>
                    <div className='flex flex-col gap-3'>
                      {order.items.map((item, idx) => (
                        <div key={item._id || idx} className='flex items-center gap-4 bg-amber-50 p-2 rounded-xl border border-amber-100'>
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className='w-14 h-14 object-cover rounded-lg border-2 border-white shadow-sm'
                              onError={e => e.target.style.display = 'none'}
                            />
                          )}
                          <div className='flex-1 flex items-center gap-3'>
                            <span className='bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded-lg min-w-[40px] text-center shadow-sm'>
                              {item.quantity}x
                            </span>
                            <span className='font-bold text-gray-800 text-lg'>{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className='w-full md:w-auto flex-shrink-0'>
                    {order.status === 'Pending' ? (
                      <button 
                        onClick={() => {
                          dispatch(updateOrderStatus({ id: order.id, status: 'Order Accepted' }))
                          import('react-hot-toast').then(({ default: toast }) => toast.success('Order Accepted!', { icon: '👍' }))
                        }}
                        className='w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 text-lg'
                      >
                        <FaCheckCircle /> Accept Order
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          dispatch(updateOrderStatus({ id: order.id, status: 'Order Ready' }))
                          import('react-hot-toast').then(({ default: toast }) => toast.success('Order Marked as Ready!', { icon: '🛍️' }))
                        }}
                        className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 text-lg'
                      >
                        <FaCheckCircle /> Mark Order Ready
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default OwnerOrdersPage
