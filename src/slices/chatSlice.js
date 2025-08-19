import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";



const initialState = {
  value: null,
};

export const chatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    chattinguser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chattinguser } = chatSlice.actions;

export default chatSlice.reducer;