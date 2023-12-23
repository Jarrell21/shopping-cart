import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CartData, Product } from "../types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
    }),
    getProducts: builder.query<
      Product[],
      { limit?: number; category?: string }
    >({
      query: ({ limit, category }) => {
        if (category) {
          return `/products/category/${category}`
        } else if (limit) {
          return `/products?limit=${limit}`
        } else {
          return "/products"
        }
      },
    }),
    getProduct: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = apiSlice
