import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import cartReducer from "./cart/cartSlice"
import orderReducer from "./orders/orderSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
