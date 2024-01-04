import React, { useMemo } from "react"
import { useAppSelector } from "../redux/hooks"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { Container, Row, Spinner, Stack, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { selectOrders } from "../redux/orders/orderSlice"

function Orders() {
  const orderedProducts = useAppSelector(selectOrders)
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})
  let combinedProducts = useMemo(() => {
    return orderedProducts
      .map((item) => {
        let product = productsData.find(
          (product) => product.id === item.productId,
        )
        if (product) {
          return {
            ...product,
            ...item,
          }
        }

        return null
      })
      .filter(Boolean)
  }, [orderedProducts, productsData])

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <p className="fw-bold">
          Failed to load products. A network error has occured.
        </p>
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (orderedProducts.length < 1) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <p className="fw-bold">
          Checked out products from your cart will show here :)
        </p>
      </Stack>
    )
  } else if (isSuccess) {
    content = (
      <>
        <Row className="g-4">
          <Table
            responsive
            className="text-center shadow"
            style={{
              minWidth: "700px",
            }}
          >
            <thead>
              <tr>
                <th className="align-middle">Order number</th>
                <th className="align-middle">Product</th>
                <th className="align-middle">Unit Price</th>
                <th className="align-middle">Quantity</th>
                <th className="align-middle">Total Price</th>
                <th className="align-middle">Order Status</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {combinedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="align-middle">{product?.orderNumber}</td>
                  <td>
                    <Link
                      className="text-decoration-none text-reset"
                      to={`/products/${product?.id}`}
                    >
                      <Stack className="flex-row gap-2 align-items-center">
                        <img src={product?.image} alt="" width={100} />
                        <span className="fw-bold ">{product?.title}</span>
                      </Stack>
                    </Link>
                  </td>
                  <td className="align-middle">${product?.price}</td>
                  <td className="align-middle">{product!.quantity}</td>
                  <td className="align-middle">
                    ${(product!.quantity * product!.price).toFixed(2)}
                  </td>
                  <td className="align-middle">On the way</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </>
    )
  }

  return (
    <Container fluid="md" className="h-100">
      {content}
    </Container>
  )
}

export default Orders
