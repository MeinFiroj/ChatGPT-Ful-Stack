import { configureStore } from "@reduxjs/toolkit"
import userReducer from './reducers/userSlice'
import chatReducer from './reducers/chatSlice'
import messageReducer from './reducers/messageSlice'

export const store = configureStore({
    reducer : {
        user : userReducer,
        chat : chatReducer, 
        message : messageReducer
    }
})