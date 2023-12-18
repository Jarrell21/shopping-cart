import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "../types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getProducts: builder.query<Product[], number>({
      query: (limit) => `/products?limit=${limit}`,
    }),
  }),
})

export const { useGetCategoriesQuery, useGetProductsQuery } = apiSlice
