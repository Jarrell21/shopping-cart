import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Order } from "../types"
import { RootState } from "../store"

const initialState: Order[] = [
  {
    productId: 2,
    quantity: 3,
    selected: false,
    orderNumber: "#a2b1de67",
    status: "Completed",
  },
]

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload)
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderNumber: string
        status: "To Ship" | "To Receive" | "Completed"
      }>,
    ) => {
      const { orderNumber, status } = action.payload
      const existingOrder = state.find(
        (order) => order.orderNumber === orderNumber,
      )

      if (existingOrder) {
        existingOrder.status = status
      }
    },
  },
})

export const { addOrder, updateOrderStatus } = orderSlice.actions

export const selectOrders = (state: RootState) => state.orders

export default orderSlice.reducer
