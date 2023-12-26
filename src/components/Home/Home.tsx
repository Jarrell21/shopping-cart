import { Stack } from "react-bootstrap"
import Categories from "./Categories"
import TopProducts from "./TopProducts"

const Home = () => {
  return (
    <Stack className="justify-content-around h-100">
      <Categories />
      <TopProducts />
    </Stack>
  )
}

export default Home
