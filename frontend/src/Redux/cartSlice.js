import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { _id, name, price, image, category, foodType, shopName, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, shopName } = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, shopName, quantity: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
