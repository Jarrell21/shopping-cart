import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "../types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getCategory: builder.query<Product[], string>({
      query: (categoryName) => `/products/category/${categoryName}`,
    }),
    getProducts: builder.query<Product[], number | void>({
      query: (limit) => `/products?limit=${limit}`,
    }),
    getProduct: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = apiSlice
