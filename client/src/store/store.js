import { configureStore } from "@reduxjs/toolkit"
import logsReducer from "./slices/logsSlice.js"

export const store = configureStore({
    reducer: {
        logs: logsReducer
    }
})