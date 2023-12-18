import { Col, Container, Row, Spinner, Stack } from "react-bootstrap"
import { FaTv } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../redux/api/apiSlice"
import styled from "styled-components"

function Categories() {
  const { data, error, isLoading } = useGetCategoriesQuery(arguments)

  let content
  const placeholderCategories = new Array(4).fill("")

  if (error) {
    content = (
      <ColStyle className="border p-0">
        <Stack className="flexbox">
          Failed to load categories. A network error has occured.
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
  } else {
    content = data?.map((category: string, index: number) => {
      return (
        <ColStyle md className="border p-0" key={index}>
          <Link
            to={`products/category/${category}`}
            className="text-decoration-none text-reset"
          >
            <Stack className="flexbox">
              <FaTv size="50%" />
              <span>{category.toUpperCase()}</span>
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

export default Categories

const ColStyle = styled(Col)`
  height: 200px;

  .flexbox {
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`
