import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../store"
import { CartData, CartProduct } from "../types"

const initialState: CartData = {
  id: 5,
  userId: 3,
  date: "2020-03-01T00:00:00.000Z",
  products: [
    {
      productId: 7,
      quantity: 1,
      selected: false,
    },
    {
      productId: 8,
      quantity: 1,
      selected: false,
    },
  ],
  __v: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      state.products.push(action.payload)
    },
    updateProduct: (
      state,
      action: PayloadAction<{
        productId: number
        quantity?: number
        selected?: boolean
        verb?: "INCREMENT" | "DECREMENT"
      }>,
    ) => {
      const { productId, quantity, selected, verb } = action.payload
      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        if (selected !== undefined) {
          existingProduct.selected = selected!
        }

        if (verb === "INCREMENT") {
          if (quantity) {
            existingProduct.quantity += quantity!
          } else {
            existingProduct.quantity += 1
          }
        } else if (verb === "DECREMENT") {
          existingProduct.quantity -= 1
        }

        if (quantity) {
          existingProduct.quantity = quantity!
        }
      }
    },
    deleteProductById: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const updatedProducts = state.products.filter(
        (product) => product.productId !== productId,
      )
      state.products = updatedProducts
    },
  },
})

export const { addProduct, updateProduct, deleteProductById } =
  cartSlice.actions

export const selectProducts = (state: RootState) => state.cart.products

export const selectProductById = (state: RootState, productId: number) => {
  state.cart.products.find((product) => product.productId === productId)
}

export const addProductToCart =
  (cartProduct: CartProduct): AppThunk =>
  (dispatch, getState) => {
    const currentProducts = selectProducts(getState())
    let existingProduct = currentProducts.find(
      (product) => product.productId === cartProduct.productId,
    )

    if (existingProduct) {
      dispatch(
        updateProduct({
          productId: cartProduct.productId,
          quantity: cartProduct.quantity,
          verb: "INCREMENT",
        }),
      )
    } else {
      dispatch(addProduct(cartProduct))
    }
  }

export default cartSlice.reducer
