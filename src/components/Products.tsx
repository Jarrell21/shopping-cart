import { useEffect } from "react"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { Card, Col, Container, Row, Spinner, Stack } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

function Products() {
  const { categoryName } = useParams()
  const navigate = useNavigate()
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery({ category: categoryName })

  useEffect(() => {
    if (isSuccess && !products.length) {
      navigate("/error")
    }
  }, [isSuccess, navigate, products])

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
  } else if (isSuccess) {
    content = (
      <StyledRow s={1} md={2} lg={3} xl={4} className="g-4">
        {products?.map((product, index) => (
          <Link to={`/products/${product.id}`} key={index}>
            <Col>
              <Card className="p-4">
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="w-50 h-auto"
                />
                <Card.Body>
                  <Card.Title>{product.title.substring(0, 46)}...</Card.Title>
                  <Card.Text>
                    <p>${product.price}</p>
                    <Stack direction="horizontal" className="gap-3">
                      <p>{product.rating.rate} Stars</p>
                      <p>{product.rating.count}+ Sold</p>
                    </Stack>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ))}
      </StyledRow>
    )
  }

  return <Container className="border p-5 h-100">{content}</Container>
}

export default Products

const StyledRow = styled(Row)`
  a {
    text-decoration: none;
  }
`
