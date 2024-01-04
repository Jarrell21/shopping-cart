import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  deleteProductById,
  deleteProducts,
  selectCartProducts,
  setProductSelectedById,
  setProductsSelected,
} from "../redux/cart/cartSlice"
import {
  Button,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
  Table,
} from "react-bootstrap"
import ProductQuantityInput from "./Product/ProductQuantityInput"
import CustomModal from "./Common/CustomModal"
import { v4 as uuidv4 } from "uuid"
import { addOrder } from "../redux/orders/orderSlice"

function Cart() {
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})
  const cartProducts = useAppSelector(selectCartProducts)
  const dispatch = useAppDispatch()
  const [isAllProductsSelected, setIsAllProductsSelected] = useState(false)
  const [productIdToBeDeleted, setProductIdToBeDeleted] = useState<
    number | null
  >(null)
  const [showDeleteSelectedProductsModal, setShowDeleteSelectedProductsModal] =
    useState(false)
  const [showNoProductSelectedModal, setShowNoProductSelectedModal] =
    useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  let combinedProducts = useMemo(() => {
    return cartProducts
      .map((item) => {
        let product = productsData.find(
          (product) => product.id === item.productId,
        )
        if (product) {
          return {
            ...product,
            ...item,
          }
        }

        return null
      })
      .filter(Boolean)
  }, [cartProducts, productsData])

  const selectedProducts = useMemo(() => {
    return combinedProducts.filter((product) => product!.selected === true)
  }, [combinedProducts])

  const totalPrice = useMemo(
    () =>
      selectedProducts.reduce(
        (total, product) =>
          product?.selected ? total + product.price * product.quantity : total,
        0,
      ),
    [selectedProducts],
  )

  useEffect(() => {
    if (combinedProducts.length < 1) {
      setIsAllProductsSelected(false)
      return
    }

    let hasUnselected = combinedProducts.some(
      (product) => product!.selected === false,
    )

    if (hasUnselected) {
      setIsAllProductsSelected(false)
    } else {
      setIsAllProductsSelected(true)
    }
  }, [combinedProducts])

  const handleSelectAllProducts = () => {
    if (isAllProductsSelected) {
      setIsAllProductsSelected(false)
      dispatch(setProductsSelected({ selected: false }))
    } else if (!isAllProductsSelected && combinedProducts.length > 0) {
      setIsAllProductsSelected(true)
      dispatch(setProductsSelected({ selected: true }))
    }
  }

  const handleSelectProduct = (productId: number, selected: boolean) => {
    if (selected) {
      dispatch(
        setProductSelectedById({ productId: productId, selected: false }),
      )
    } else {
      dispatch(setProductSelectedById({ productId: productId, selected: true }))
    }
  }

  const handleDeleteSelectedButton = () => {
    if (selectedProducts.length) {
      setShowDeleteSelectedProductsModal(true)
    } else {
      setShowNoProductSelectedModal(true)
    }
  }

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProductById(id))
    setProductIdToBeDeleted(null)
  }

  const handleDeleteSelectedProducts = () => {
    dispatch(deleteProducts(selectedProducts))

    setShowDeleteSelectedProductsModal(false)
  }

  const handleCheckoutButton = () => {
    if (selectedProducts.length) {
      setShowCheckoutModal(true)
    } else {
      setShowNoProductSelectedModal(true)
    }
  }

  const handleCheckout = () => {
    cartProducts.forEach((product) => {
      if (product.selected) {
        dispatch(
          addOrder({
            ...product,
            orderNumber: `#${uuidv4().substring(0, 8)}`,
          }),
        )
        dispatch(deleteProductById(product.productId))
      }
    })
    setShowCheckoutModal(false)
  }

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <p className="fw-bold">
          Failed to load products. A network error has occured.
        </p>
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (combinedProducts.length < 1) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <p className="fw-bold">
          Your cart is empty! Products added to cart will show here
        </p>
      </Stack>
    )
  } else if (isSuccess) {
    content = (
      <Stack className="justify-content-evenly h-100">
        <div style={{ height: "80vh", overflowY: "auto" }}>
          <Table
            responsive
            hover
            className="text-center shadow"
            style={{
              minWidth: "700px",
            }}
          >
            <thead>
              <tr>
                <th className="align-middle p-3">
                  <Form.Check
                    checked={isAllProductsSelected}
                    onChange={handleSelectAllProducts}
                  />
                </th>
                <th className="align-middle">Product</th>
                <th className="align-middle">Unit Price</th>
                <th className="align-middle">Quantity</th>
                <th className="align-middle">Total Price</th>
                <th className="align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {combinedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <Form.Check
                      checked={product?.selected}
                      onChange={() =>
                        handleSelectProduct(product!.id, product!.selected)
                      }
                    />
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none text-reset"
                      to={`/products/${product?.id}`}
                    >
                      <Stack className="flex-row gap-2 align-items-center">
                        <img src={product?.image} alt="" width={100} />
                        <span className="fw-bold ">{product?.title}</span>
                      </Stack>
                    </Link>
                  </td>
                  <td className="align-middle">${product?.price}</td>
                  <td className="align-middle">
                    <ProductQuantityInput
                      quantityValue={product!.quantity}
                      productId={product!.id}
                    />
                  </td>
                  <td className="align-middle">
                    ${(product!.quantity * product!.price).toFixed(2)}
                  </td>
                  <td className="align-middle">
                    <Button
                      variant="danger"
                      onClick={() => setProductIdToBeDeleted(product!.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <CustomModal
                    show={productIdToBeDeleted === product!.id}
                    onConfirm={() => handleDeleteProduct(product!.id)}
                    onCancel={() => setProductIdToBeDeleted(null)}
                    content={
                      <>
                        Do you want to delete{" "}
                        <span className="fw-bold">({product!.title})</span> from
                        the cart?
                      </>
                    }
                  />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="shadow bg-body">
          <Stack
            direction="horizontal"
            className="align-items-center justify-content-around p-2"
          >
            <Stack direction="horizontal" className="align-items-center gap-2">
              <Form.Check
                checked={isAllProductsSelected}
                onChange={handleSelectAllProducts}
              />
              <span>Select All ({combinedProducts.length})</span>
              <Button variant="danger" onClick={handleDeleteSelectedButton}>
                Delete
              </Button>
            </Stack>
            <Stack direction="horizontal" className="align-items-center gap-2">
              <p className="m-0">
                Total ({selectedProducts.length} item
                {selectedProducts.length > 1 && "s"}):{" "}
                <span className="text-primary-emphasis fw-bold fs-4">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
              <Button variant="dark" onClick={handleCheckoutButton}>
                Checkout
              </Button>
            </Stack>
          </Stack>
          <CustomModal
            show={showDeleteSelectedProductsModal}
            onConfirm={() => handleDeleteSelectedProducts()}
            onCancel={() => setShowDeleteSelectedProductsModal(false)}
            content={
              <>
                Do you want to delete the{" "}
                <span className="fw-bold">({selectedProducts.length})</span>{" "}
                selected product{selectedProducts.length > 1 && "s"} from the
                cart?
              </>
            }
          />
          <CustomModal
            show={showNoProductSelectedModal}
            onConfirm={() => setShowNoProductSelectedModal(false)}
            content="Please select product(s)"
          />
          <CustomModal
            show={showCheckoutModal}
            onConfirm={handleCheckout}
            onCancel={() => setShowCheckoutModal(false)}
            content={
              <>
                Your total is:
                <h2 className="fw-bold">${totalPrice.toFixed(2)}</h2>
                Proceed?
              </>
            }
          />
        </Row>
      </Stack>
    )
  }

  return (
    <Container fluid="md" className="h-100">
      {content}
    </Container>
  )
}

export default Cart
