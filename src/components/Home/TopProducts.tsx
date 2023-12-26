import { useState } from "react"
import { Container, Figure, Spinner, Stack, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../../redux/api/apiSlice"
import { FaArrowRight } from "react-icons/fa6"

function TopProducts() {
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  let content

  if (isError) {
    content = (
      <Carousel.Item
        style={{ height: "40vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        Failed to load products. A network error has occured.
      </Carousel.Item>
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
    content = productsData?.map((product, index) => {
      if (index % 5 === 0) {
        return (
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
              <h4>{product.title}</h4>
              <p>
                {product.description.substring(0, 50)}...{" "}
                <Link
                  className="link-body-emphasis"
                  to={`/products/${product.id}`}
                >
                  See more
                </Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }

      return null
    })
  }

  return (
    <Container className="shadow py-2 bg-white">
      <Stack direction="horizontal" className="justify-content-between">
        <h3 className="p-3 mb-0">Top Products</h3>
        <Link
          to="/products"
          className="icon-link icon-link-hover link-body-emphasis"
        >
          View all products
          <FaArrowRight className="bi" />
        </Link>
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
