import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";



const initialState = {
  value: auth.currentUser,
  // value: localStorage.getItem("signin")
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      state.value = action.payload;
    },
    userdata: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
