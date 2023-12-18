import { Col, Container, Row, Spinner, Stack } from "react-bootstrap"
import { FaTv } from "react-icons/fa6"
import { Link } from "react-router-dom"
import style from "./Categories.module.scss"
import { useGetCategoriesQuery } from "../../../redux/api/apiSlice"

function Categories() {
  const { data, error, isLoading } = useGetCategoriesQuery(arguments)

  let content
  const placeholderCategories = new Array(4).fill("")

  if (error) {
    content = (
      <div className="text-center">A network error has encountered.</div>
    )
  } else if (isLoading) {
    content = placeholderCategories.map((_, index) => (
      <Col className={`${style.category} border p-0`} key={index}>
        <Stack className={style.flexbox}>
          <Spinner animation="border" />
        </Stack>
      </Col>
    ))
  } else {
    content = data?.map((category: string, index: number) => {
      let cleanCategoryName = category.replace(/\s+/g, "-").replace(/'/g, "")

      return (
        <Col className={`${style.category} border p-0`} key={index}>
          <Link
            to={`products/category/${cleanCategoryName}`}
            className="text-decoration-none text-reset"
          >
            <Stack className={style.flexbox}>
              <FaTv size="50%" />
              <span>{category.toUpperCase()}</span>
            </Stack>
          </Link>
        </Col>
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
