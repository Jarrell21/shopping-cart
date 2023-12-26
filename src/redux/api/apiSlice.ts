import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "../types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
    }),
    getProducts: builder.query<Product[], { category?: string }>({
      query: ({ category }) => {
        if (category) {
          return `/products/category/${category}`
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
