import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
    photoURL: "",
  },
  reducers: {
    setLoggedIn: (state, action) => {
      return {
        isLoggedIn: true,
        name: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    },
  },
});

export const { setLoggedIn } = counterSlice.actions;

export default counterSlice.reducer;
