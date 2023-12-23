import { Button, Container, Form, Spinner, Stack, Table } from "react-bootstrap"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  deleteProductById,
  selectProducts,
  updateProduct,
} from "../redux/cart/cartSlice"
import ProductQuantityInput from "./ProductQuantityInput"
import { useEffect, useState } from "react"

function Cart() {
  const cartProductsData = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()
  const [isSelectAll, setIsSelectAll] = useState(false)
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery({})

  const cartProducts = cartProductsData
    .map((item) => {
      let product = productsData?.find(
        (product) => product.id === item.productId,
      )
      if (product) {
        return { ...product, quantity: item.quantity, selected: item.selected }
      }

      return null
    })
    .filter(Boolean)

  useEffect(() => {
    if (cartProducts.length < 1) {
      setIsSelectAll(false)
      return
    }

    let hasUnselected = cartProducts.some(
      (product) => product!.selected === false,
    )

    if (hasUnselected) {
      setIsSelectAll(false)
    } else {
      setIsSelectAll(true)
    }
  }, [cartProducts])

  const handleSelectAll = () => {
    if (isSelectAll) {
      setIsSelectAll(false)

      cartProducts.forEach((product) => {
        dispatch(updateProduct({ productId: product!.id, selected: false }))
      })
    } else if (!isSelectAll && cartProducts.length > 0) {
      // select all here
      setIsSelectAll(true)

      cartProducts.forEach((product) => {
        dispatch(updateProduct({ productId: product!.id, selected: true }))
      })
    }
  }

  const handleSelect = (productId: number, selected: boolean) => {
    if (selected) {
      dispatch(updateProduct({ productId: productId, selected: false }))
    } else {
      dispatch(updateProduct({ productId: productId, selected: true }))
    }
  }

  const deleteProduct = (id: number) => {
    dispatch(deleteProductById(id))
  }

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        Failed to load products. A network error has occured.
        {error.toString()}
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className=" justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (cartProducts.length < 1) {
    content = (
      <Stack className=" justify-content-center align-items-center h-100">
        Your cart is empty at the moment
      </Stack>
    )
  } else if (isSuccess) {
    content = (
      <Table className="text-center">
        <thead>
          <tr>
            <th>
              <Form.Check
                aria-label="option 1"
                checked={isSelectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts?.map((product, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  aria-label="option 1"
                  checked={product?.selected}
                  onChange={() => handleSelect(product!.id, product!.selected)}
                />
              </td>
              <td>
                <Stack className="flex-row gap-2 align-items-center">
                  <img src={product?.image} alt="" width={50} />
                  <p>{product?.title}</p>
                </Stack>
              </td>
              <td>${product?.price}</td>
              <td>
                <ProductQuantityInput
                  quantityValue={product!.quantity}
                  productId={product!.id}
                />
              </td>
              <td>${product!.quantity * product!.price}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product!.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  return (
    <Container fluid="md" className="h-100">
      {content}
    </Container>
  )
}

export default Cart
