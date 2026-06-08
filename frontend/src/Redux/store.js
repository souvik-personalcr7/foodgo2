import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import ownerSlice from "./ownerSlice"
import cartSlice from "./cartSlice"

export const store = configureStore({
    reducer:{
         user: userSlice,
         owner: ownerSlice,
         cart: cartSlice,
    }
})