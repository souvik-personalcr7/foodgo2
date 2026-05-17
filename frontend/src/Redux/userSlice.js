
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    isAuthResolved: false
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setIsAuthResolved: (state, action) => {
      state.isAuthResolved = action.payload;
    },
  },
});

export const { setUserData, setCurrentCity, setCurrentState, setCurrentAddress, setIsAuthResolved } = userSlice.actions;
export default userSlice.reducer;
