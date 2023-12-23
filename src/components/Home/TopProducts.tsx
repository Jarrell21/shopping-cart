import { useState } from "react"
import { Container, Figure, Spinner, Stack, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../../redux/api/apiSlice"

function TopProducts() {
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery({ limit: 5 })
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  let content

  if (isError) {
    content = (
      <div>
        Failed to load categories. A network error has occured.
        {error.toString()}
      </div>
    )
  } else if (isLoading) {
    content = (
      <Carousel.Item
        style={{ height: "40vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" />
      </Carousel.Item>
    )
  } else if (isSuccess) {
    content = productsData?.map((product) => (
      <Carousel.Item style={{ height: "350px" }} key={product.id}>
        <Figure className="d-flex justify-content-center">
          <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={product.image}
          />
        </Figure>
        <Carousel.Caption
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}
        >
          <h3>{product.title}</h3>
          <p>
            {product.description.substring(0, 50)}...{" "}
            <Link to={`/products/${product.id}`}>See more</Link>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    ))
  }

  return (
    <Container className="border py-2">
      <Stack direction="horizontal" className="justify-content-between">
        <h3>Top Products</h3>
        <Link to="/products">View all products</Link>
      </Stack>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme="dark"
      >
        {content}
      </Carousel>
    </Container>
  )
}

export default TopProducts
