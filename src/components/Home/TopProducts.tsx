import { Container, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import TopProductsCarousel from "./TopProductsCarousel"

function TopProducts() {
  return (
    <Container className="border py-2">
      <Stack direction="horizontal" className="justify-content-between">
        <h3>Top Products</h3>
        <Link to="products">View all products</Link>
      </Stack>
      <TopProductsCarousel />
    </Container>
  )
}

export default TopProducts
