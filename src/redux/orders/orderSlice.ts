import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Order } from "../types"
import { RootState } from "../store"

const initialState: Order[] = [
  {
    productId: 2,
    quantity: 3,
    selected: false,
    orderNumber: "#a2b1de67",
  },
]

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload)
    },
  },
})

export const { addOrder } = orderSlice.actions

export const selectOrders = (state: RootState) => state.orders

export default orderSlice.reducer
