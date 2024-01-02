import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from "../../redux/api/apiSlice"
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import ProductQuantityInput from "./ProductQuantityInput"
import { CartProduct } from "../../redux/types"
import { useAppDispatch } from "../../redux/hooks"
import { addProductToCart } from "../../redux/cart/cartSlice"
import { capitalizeFirstLetterOfEachWord } from "../../helpers/helpers"
import CustomModal from "../Common/CustomModal"

function Product() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [productQuantity, setProductQuantity] = useState(1)
  const [showAddedProductModal, setShowAddedProductModal] = useState(false)
  const { productId } = useParams()
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductQuery(productId!)

  useEffect(() => {
    if (isSuccess && product === null) {
      navigate("/error")
    }
  }, [isSuccess, navigate, product])

  const addToCart = ({ productId, quantity, selected }: CartProduct) => {
    dispatch(addProductToCart({ productId, quantity, selected }))
    setShowAddedProductModal(true)
  }

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        Failed to load product. A network error has occured.
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
        <Row
          xs={1}
          md={2}
          className="h-100 align-items-center justify-content-evenly"
        >
          <Col className="bg-body p-5 shadow">
            <Stack className="align-items-center">
              <Image src={product?.image} fluid width={"300"} />
            </Stack>
          </Col>
          <Col className="d-flex flex-column gap-2 p-5">
            <h1>{product?.title}</h1>
            <Stack direction="horizontal" className="gap-5">
              <Stack direction="horizontal" className="">
                <FaStar />
                <span>{product?.rating.rate}</span>
              </Stack>
              <div>{product?.rating.count} Sold</div>
            </Stack>
            <h2>${product?.price}</h2>
            <div>{product?.description}</div>
            <p>
              Category: {capitalizeFirstLetterOfEachWord(product?.category)}
            </p>
            <Stack
              direction="horizontal"
              className="gap-2 justify-content-center"
            >
              <ProductQuantityInput
                className="w-auto"
                quantityValue={productQuantity}
                setQuantityValue={setProductQuantity}
              />
              <Button
                className="fw-bold"
                variant="secondary"
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
            </Stack>
          </Col>
          <CustomModal
            show={showAddedProductModal}
            onConfirm={() => setShowAddedProductModal(false)}
            content="Product added to cart"
          />
        </Row>
      </>
    )
  }

  return <Container className="h-100">{content}</Container>
}

export default Product
