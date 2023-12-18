import React from "react"
import { useParams } from "react-router-dom"
import { useGetCategoryQuery } from "../redux/api/apiSlice"

function Category() {
  const { categoryName } = useParams()
  const { data, error, isLoading } = useGetCategoryQuery(categoryName!)

  return (
    <div>
      Category: {categoryName?.toUpperCase()}
      {data?.map((product, index) => (
        <p key={index}>{product.title}</p>
      ))}
    </div>
  )
}

export default Category
