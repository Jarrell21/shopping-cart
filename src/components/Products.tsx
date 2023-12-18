import React from "react"
import { useGetProductsQuery } from "../redux/api/apiSlice"

function Products() {
  const { data, error, isLoading } = useGetProductsQuery()
  return (
    <div>
      Products
      {data?.map((product, index) => (
        <p key={index}>{product.title}</p>
      ))}
    </div>
  )
}

export default Products
