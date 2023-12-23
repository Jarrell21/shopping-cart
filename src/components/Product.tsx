import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from "../redux/api/apiSlice"
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap"
import ProductQuantityInput from "./ProductQuantityInput"
import { CartProduct } from "../redux/types"
import { useAppDispatch } from "../redux/hooks"
import { addProductToCart } from "../redux/cart/cartSlice"
import CustomToast from "./CustomToast"

function Product() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [productQuantity, setProductQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const { productId } = useParams()
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductQuery(productId!)

  useEffect(() => {
    if (isSuccess && product === null) {
      navigate("/error")
    }
  }, [isSuccess, navigate, product])

  const addToCart = ({ productId, quantity, selected }: CartProduct) => {
    dispatch(addProductToCart({ productId, quantity, selected }))
    setShowToast(true)
  }

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        Failed to load products. A network error has occured.
        {error.toString()}
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className=" justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (isSuccess) {
    content = (
      <>
        <Row className="h-100 align-items-center justify-content-center border">
          <Col className="border">
            <Stack className="align-items-center">
              <Image src={product?.image} fluid width={"300"} />
            </Stack>
          </Col>
          <Col className="border d-flex flex-column gap-2 p-5">
            <h1>{product?.title}</h1>
            <Stack direction="horizontal" className="gap-5">
              <div>{product?.rating.rate}</div>
              <div>{product?.rating.count}</div>
            </Stack>
            <h2>${product?.price}</h2>
            <div>{product?.description}</div>
            <div>{product?.category}</div>
            <Stack className="align-items-center">
              <ProductQuantityInput
                className="w-auto"
                quantityValue={productQuantity}
                setQuantityValue={setProductQuantity}
              />
            </Stack>
            <Stack
              direction="horizontal"
              className="gap-2 justify-content-center"
            >
              <Button
                onClick={() =>
                  addToCart({
                    productId: product?.id,
                    quantity: productQuantity,
                    selected: false,
                  })
                }
              >
                Add to cart
              </Button>
              <Button>Buy now</Button>
            </Stack>
          </Col>
        </Row>
        <CustomToast show={showToast} setShow={setShowToast} />
      </>
    )
  }

  return <Container className="h-100 border">{content}</Container>
}

export default Product
