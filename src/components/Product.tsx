import React from "react"
import { useParams } from "react-router-dom"
import { useGetProductQuery } from "../redux/api/apiSlice"

function Product() {
  const { productId } = useParams()
  const { data, error, isLoading } = useGetProductQuery(productId!)
  return (
    <>
      <div>Product: {productId}</div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
      <div>{data?.category}</div>
      <div>{data?.price}</div>
      <div>{data?.rating.count}</div>
      <div>{data?.rating.rate}</div>
      <img src={data?.image} alt="" width={300} />
    </>
  )
}

export default Product
