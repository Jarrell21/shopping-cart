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
    incrementProductQuantity: (
      state,
      action: PayloadAction<{ productId: number }>,
    ) => {
      const { productId } = action.payload

      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        existingProduct.quantity += 1
      }
    },
    decrementProductQuantity: (
      state,
      action: PayloadAction<{ productId: number }>,
    ) => {
      const { productId } = action.payload

      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        if (existingProduct.quantity > 0) {
          existingProduct.quantity -= 1
        }
      }
    },
    incrementProductQuantityByAmount: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload

      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        existingProduct.quantity += quantity
      }
    },
    setProductQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload
      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        existingProduct.quantity = quantity
      }
    },
    setProductSelectedById: (
      state,
      action: PayloadAction<{ productId: number; selected: boolean }>,
    ) => {
      const { productId, selected } = action.payload
      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      )

      if (existingProduct) {
        existingProduct.selected = selected
      }
    },
    setProductsSelected: (
      state,
      action: PayloadAction<{ selected: boolean }>,
    ) => {
      const { selected } = action.payload
      state.products.forEach((product) => {
        product.selected = selected
      })
    },
    deleteProductById: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const updatedProducts = state.products.filter(
        (product) => product.productId !== productId,
      )
      state.products = updatedProducts
    },
    deleteProducts: (state, action: PayloadAction<any[]>) => {
      const products = action.payload
      const productIds = products.map((product) => product.id)
      const updatedProducts = state.products.filter(
        (product) => !productIds.includes(product.productId),
      )
      state.products = updatedProducts
    },
  },
})

export const {
  addProduct,
  incrementProductQuantity,
  decrementProductQuantity,
  incrementProductQuantityByAmount,
  setProductQuantity,
  setProductSelectedById,
  setProductsSelected,
  deleteProductById,
  deleteProducts,
} = cartSlice.actions

export const selectCartProducts = (state: RootState) => state.cart.products

export const addProductToCart =
  (cartProduct: CartProduct): AppThunk =>
  (dispatch, getState) => {
    const currentProducts = selectCartProducts(getState())
    let existingProduct = currentProducts.find(
      (product) => product.productId === cartProduct.productId,
    )

    if (existingProduct) {
      dispatch(
        incrementProductQuantityByAmount({
          productId: existingProduct.productId,
          quantity: cartProduct.quantity,
        }),
      )
    } else {
      dispatch(addProduct(cartProduct))
    }
  }

export default cartSlice.reducer
