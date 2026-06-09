import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaMotorcycle, FaBoxOpen, FaCheckCircle } from 'react-icons/fa'
import { updateOrderStatus } from '../Redux/ordersSlice'

function DeliveryDashbord() {
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)

  // Orders that have been picked up or are waiting to be picked up
  const activeDeliveries = orders.filter(
    order => order.status === 'Order picked by Delivery Boy' || order.status === 'Order Ready'
  )

  const deliveredOrders = orders.filter(order => order.status === 'order delivery successfull')

  return (
    <div className='min-h-screen bg-gray-50 p-6 mt-5 rounded-xl'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center gap-4'>
          <FaMotorcycle size={40} />
          <div>
            <h1 className='text-3xl font-bold'>Delivery Partner Dashboard</h1>
            <p className='text-blue-100 mt-1'>Manage your active deliveries</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Active Deliveries */}
          <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <FaBoxOpen className='text-blue-600' /> Active Deliveries ({activeDeliveries.length})
            </h2>
            
            {activeDeliveries.length === 0 ? (
              <p className='text-gray-500 text-center py-8'>No active deliveries right now. Take a break! ☕</p>
            ) : (
              <div className='flex flex-col gap-4'>
                {activeDeliveries.map(order => (
                  <div key={order.id} className='p-4 border border-blue-100 bg-blue-50 rounded-xl'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <h3 className='font-bold text-blue-900'>Order #{order.id}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          order.status === 'Order Ready' ? 'bg-orange-100 text-orange-700' : 'bg-blue-200 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className='font-bold text-blue-900'>₹{order.total?.toFixed(0)}</span>
                    </div>
                    
                    <div className='text-sm text-gray-600 mb-3'>
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} items from {
                        [...new Set(order.items.map(i => i.shopName))].join(', ')
                      }
                    </div>

                    {order.status === 'Order Ready' ? (
                      <button 
                        onClick={() => {
                          dispatch(updateOrderStatus({ id: order.id, status: 'Order picked by Delivery Boy' }))
                          import('react-hot-toast').then(({ default: toast }) => {
                            toast.success("Order Picked Up!", { icon: '🛵' })
                          })
                        }}
                        className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2 transition-colors'
                      >
                        <FaMotorcycle /> Pick Up Order
                      </button>
                    ) : order.status === 'Order picked by Delivery Boy' ? (
                      <button 
                        onClick={() => {
                          dispatch(updateOrderStatus({ id: order.id, status: 'order delivery successfull' }))
                          import('react-hot-toast').then(({ default: toast }) => {
                            toast.success("order delivery successfull", {
                              icon: '📬',
                              duration: 5000,
                              style: {
                                border: '1px solid #bbf7d0',
                                padding: '16px',
                                color: '#16a34a',
                                background: '#dcfce7',
                                fontWeight: 'bold'
                              },
                            });
                          })
                        }}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2 transition-colors'
                      >
                        <FaCheckCircle /> Mark as Delivered
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivered History */}
          <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <FaCheckCircle className='text-green-600' /> Completed ({deliveredOrders.length})
            </h2>
            
            {deliveredOrders.length === 0 ? (
              <p className='text-gray-500 text-center py-8'>No completed deliveries yet.</p>
            ) : (
              <div className='flex flex-col gap-3'>
                {deliveredOrders.map(order => (
                  <div key={order.id} className='p-3 border border-gray-100 rounded-lg flex justify-between items-center'>
                    <div>
                      <h3 className='font-bold text-gray-700'>#{order.id}</h3>
                      <p className='text-xs text-gray-500'>Earned: ₹40 (Est)</p>
                    </div>
                    <span className='text-green-600 font-bold'>✅ Done</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDashbord
