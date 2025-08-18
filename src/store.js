import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import  chatSlice  from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    userSignin : userSlice,
    chatInfo: chatSlice,
  },
})