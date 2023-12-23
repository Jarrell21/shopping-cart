import { Col, Container, Row, Spinner, Stack } from "react-bootstrap"
import { FaTv, FaRegGem } from "react-icons/fa6"
import { GiClothes } from "react-icons/gi"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../redux/api/apiSlice"
import styled from "styled-components"

type CategoryIconProps = {
  category: string
  size: string
}

function Categories() {
  const {
    data: categoryData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery()

  const placeholderCategories = new Array(4).fill("")
  let content

  if (isError) {
    content = (
      <ColStyle className="border p-0">
        <Stack className="flexbox">
          Failed to load categories. A network error has occured.
          {error.toString()}
        </Stack>
      </ColStyle>
    )
  } else if (isLoading) {
    content = placeholderCategories.map((_, index) => (
      <ColStyle className="border p-0" key={index}>
        <Stack className="flexbox">
          <Spinner animation="border" />
        </Stack>
      </ColStyle>
    ))
  } else if (isSuccess) {
    content = categoryData?.map((category: string, index: number) => {
      let categoryUpper = category.toUpperCase()
      return (
        <ColStyle md className="border p-0" key={index}>
          <Link
            to={`/products/category/${category}`}
            className="text-decoration-none text-reset"
          >
            <Stack className="flexbox">
              <CategoryIcon category={categoryUpper} size="50%" />
              <span>{categoryUpper}</span>
            </Stack>
          </Link>
        </ColStyle>
      )
    })
  }

  return (
    <>
      <Container className="border py-2">
        <h3>Categories</h3>
        <Row>{content}</Row>
      </Container>
    </>
  )
}

function CategoryIcon({ category, size }: CategoryIconProps) {
  let icon
  if (category === "ELECTRONICS") {
    icon = <FaTv size={size} />
  } else if (category === "JEWELERY") {
    icon = <FaRegGem size={size} />
  } else if (category === "MEN'S CLOTHING") {
    icon = <GiClothes size={size} />
  } else if (category === "WOMEN'S CLOTHING") {
    icon = <GiClothes size={size} />
  }
  return <>{icon}</>
}

export default Categories

const ColStyle = styled(Col)`
  height: 200px;

  .flexbox {
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`
