import { useEffect } from "react"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { Card, Col, Container, Row, Spinner, Stack } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
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
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (isSuccess) {
    content = (
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products?.map((product, index) => (
          <Col key={index}>
            <Link
              className="text-decoration-none"
              to={`/products/${product.id}`}
            >
              <StyledCard className="p-4 h-100 shadow">
                <Stack className="align-items-center justify-content-center h-100">
                  <Card.Img variant="top" src={product.image} />
                </Stack>
                <Card.Body>
                  <Card.Title>{product.title.substring(0, 17)}...</Card.Title>
                  <div>
                    <span className="fw-bold fs-4">${product.price}</span>
                    <Stack
                      direction="horizontal"
                      className="gap-1 align-items-center justify-content-between"
                    >
                      <Stack
                        direction="horizontal"
                        className="gap-1 align-items-center"
                      >
                        <FaStar />
                        <span>{product.rating.rate}</span>
                      </Stack>
                      <span>{product.rating.count} Sold</span>
                    </Stack>
                  </div>
                </Card.Body>
              </StyledCard>
            </Link>
          </Col>
        ))}
      </Row>
    )
  }

  return <Container className="p-4 h-100">{content}</Container>
}

export default Products

const StyledCard = styled(Card)`
  &:hover {
    background-color: rgba(
      var(--bs-secondary-bg-rgb),
      var(--bs-bg-opacity)
    ) !important;
  }
`
