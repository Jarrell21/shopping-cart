import { useEffect, useMemo, useState } from "react"
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../redux/api/apiSlice"
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CartProduct } from "../redux/types"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addProductToCart, selectCartProducts } from "../redux/cart/cartSlice"
import { capitalizeFirstLetterOfEachWord } from "../helpers/helpers"

function Products() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [categoryName, setCategoryName] = useState(
    location.state?.categoryName ?? "",
  )
  const [sortBy, setSortBy] = useState("")
  const { data: categories = [] } = useGetCategoriesQuery()
  const cartProducts = useAppSelector(selectCartProducts)
  let {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})
  let productsWithAddedProp = useMemo(() => {
    return productsData
      .map((item) => {
        let cartProduct = cartProducts.find(
          (product) => product.productId === item.id,
        )
        if (cartProduct) {
          return { ...item, added: true }
        }

        return { ...item, added: false }
      })
      .filter(Boolean)
  }, [productsData, cartProducts])

  let filteredData = useMemo(() => {
    if (categoryName) {
      return productsWithAddedProp.filter(
        (product) => product.category === categoryName,
      )
    }
    return productsWithAddedProp
  }, [categoryName, productsWithAddedProp])

  let sortedData = useMemo(() => {
    if (sortBy === "LOWEST") {
      return [...filteredData].sort((a, b) => a.price - b.price)
    } else if (sortBy === "HIGHEST") {
      return [...filteredData].sort((a, b) => b.price - a.price)
    }
    return filteredData
  }, [sortBy, filteredData])

  useEffect(() => {
    if (isSuccess && !productsWithAddedProp?.length) {
      navigate("/error")
    }
  }, [isSuccess, navigate, productsWithAddedProp])

  const addToCart = ({ productId, quantity, selected }: CartProduct) => {
    dispatch(addProductToCart({ productId, quantity, selected }))
  }

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
      <>
        <Row className="p-2">
          <Form.Select
            style={{ flex: 1 }}
            aria-label="Default select example"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="" disabled>
              Filter by
            </option>
            {categoryName !== "" && <option value="">Remove filter</option>}
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {capitalizeFirstLetterOfEachWord(category)}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ flex: 1 }}
            aria-label="Default select example"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="" disabled>
              Sort by
            </option>
            {sortBy !== "" && <option value="">Remove sort</option>}
            <option value="LOWEST">Lowest price first</option>
            <option value="HIGHEST">Highest price first</option>
          </Form.Select>
        </Row>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {sortedData.map((product, index) => (
            <Col key={index}>
              <StyledCard className="p-4 h-100 shadow">
                <Stack className="align-items-center justify-content-center h-100">
                  <Link
                    className="text-decoration-none"
                    to={`/products/${product.id}`}
                  >
                    <Card.Img variant="top" src={product.image} />
                  </Link>
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
                    {product.added ? (
                      <Button className="fw-bold w-100 mt-2" variant="success">
                        Added <FaCheck />
                      </Button>
                    ) : (
                      <Button
                        className="fw-bold w-100 mt-2"
                        variant="primary"
                        onClick={() =>
                          addToCart({
                            productId: product?.id,
                            quantity: 1,
                            selected: false,
                          })
                        }
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </>
    )
  }

  return <Container className="p-4 h-100">{content}</Container>
}

export default Products

const StyledCard = styled(Card)`
  &:hover {
    transform: scale(1.05);
    transition: 50ms ease-in;
  }
`
