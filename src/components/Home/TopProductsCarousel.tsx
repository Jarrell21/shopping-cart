import { useState } from "react"
import { Figure } from "react-bootstrap"
import Carousel from "react-bootstrap/Carousel"
import { useGetProductsQuery } from "../../redux/api/apiSlice"
import { Link } from "react-router-dom"

function TopProductsCarousel() {
  const { data, error, isLoading } = useGetProductsQuery(5)
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme="dark"
      >
        {data?.map((product) => (
          <Carousel.Item style={{ height: "350px" }}>
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
                <Link to={`products/${product.id}`}>See more</Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default TopProductsCarousel
