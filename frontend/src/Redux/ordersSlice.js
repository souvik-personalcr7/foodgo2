import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

// Load initial state from local storage so orders aren't lost on page refresh or logout
const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem('foodgo_orders');
    if (!saved) return [];
    
    const parsedOrders = JSON.parse(saved);
    
    // Migrate legacy "Delivered" status to the new requested string so old orders don't break
    return parsedOrders.map(order => {
      if (order.status === 'Delivered') {
        return { ...order, status: 'order delivery successfull' };
      }
      return order;
    });
  } catch (e) {
    return [];
  }
};

const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem('foodgo_orders', JSON.stringify(orders));
  } catch (e) {}
};


const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: loadOrdersFromStorage(), // { id, items, subtotal, gst, total, placedAt, status }
  },
  reducers: {
    placeOrder: (state, action) => {
      const order = { ...action.payload, status: "Pending" }; // Default status
      state.orders.unshift(order); // newest first
      saveOrdersToStorage(state.orders);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
        saveOrdersToStorage(state.orders);
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
