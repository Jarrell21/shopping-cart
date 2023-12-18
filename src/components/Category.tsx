import React from "react"
import { useParams } from "react-router-dom"

function Category() {
  const { categoryName } = useParams()
  return <div>Category: {categoryName?.toUpperCase()}</div>
}

export default Category
