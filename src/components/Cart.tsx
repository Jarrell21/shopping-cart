import {
  Button,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
  Table,
} from "react-bootstrap"
import { useGetProductsQuery } from "../redux/api/apiSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  deleteProductById,
  selectProducts,
  updateProduct,
} from "../redux/cart/cartSlice"
import ProductQuantityInput from "./Product/ProductQuantityInput"
import { useEffect, useState } from "react"
import CustomModal from "./Common/CustomModal"
import { Link } from "react-router-dom"

function Cart() {
  const cartProductsData = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
  const [showNoProductSelectedModal, setShowNoProductSelectedModal] =
    useState(false)

  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})

  const cartProducts = cartProductsData
    .map((item) => {
      let product = productsData?.find(
        (product) => product.id === item.productId,
      )
      if (product) {
        return { ...product, quantity: item.quantity, selected: item.selected }
      }

      return null
    })
    .filter(Boolean)

  const selectedProducts = cartProducts.filter(
    (product) => product?.selected === true,
  )

  const totalPrice = cartProducts.reduce(
    (total, product) =>
      product?.selected ? total + product.price * product.quantity : total,
    0,
  )

  useEffect(() => {
    if (cartProducts.length < 1) {
      setIsSelectAll(false)
      return
    }

    let hasUnselected = cartProducts.some(
      (product) => product!.selected === false,
    )

    if (hasUnselected) {
      setIsSelectAll(false)
    } else {
      setIsSelectAll(true)
    }
  }, [cartProducts])

  const handleSelectAll = () => {
    if (isSelectAll) {
      setIsSelectAll(false)

      cartProducts.forEach((product) => {
        dispatch(updateProduct({ productId: product!.id, selected: false }))
      })
    } else if (!isSelectAll && cartProducts.length > 0) {
      // select all here
      setIsSelectAll(true)

      cartProducts.forEach((product) => {
        dispatch(updateProduct({ productId: product!.id, selected: true }))
      })
    }
  }

  const handleSelect = (productId: number, selected: boolean) => {
    if (selected) {
      dispatch(updateProduct({ productId: productId, selected: false }))
    } else {
      dispatch(updateProduct({ productId: productId, selected: true }))
    }
  }

  const handleDeleteSelectedProducts = () => {
    if (selectedProducts.length) {
      setShowDeleteProductModal(true)
    } else {
      setShowNoProductSelectedModal(true)
    }
  }

  const deleteProduct = (id: number) => {
    dispatch(deleteProductById(id))
  }

  const deleteSelectedProducts = () => {
    selectedProducts.forEach((product) => {
      dispatch(deleteProductById(product!.id))
    })

    setShowDeleteProductModal(false)
  }

  const handleCheckout = () => {
    if (selectedProducts.length) {
      setShowCheckoutModal(true)
    } else {
      setShowNoProductSelectedModal(true)
    }
  }

  let content

  if (isError) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        Failed to load products. A network error has occured.
      </Stack>
    )
  } else if (isLoading) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        <Spinner animation="border" />
      </Stack>
    )
  } else if (cartProducts.length < 1) {
    content = (
      <Stack className="justify-content-center align-items-center h-100">
        Your cart is empty at the moment
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
                    aria-label="option 1"
                    checked={isSelectAll}
                    onChange={handleSelectAll}
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
              {cartProducts?.map((product, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <Form.Check
                      aria-label="option 1"
                      checked={product?.selected}
                      onChange={() =>
                        handleSelect(product!.id, product!.selected)
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
                    ${product!.quantity * product!.price}
                  </td>
                  <td className="align-middle">
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product!.id)}
                    >
                      Delete
                    </Button>
                  </td>
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
                aria-label="option 1"
                checked={isSelectAll}
                onChange={handleSelectAll}
              />
              <p className="m-0">Select All ({cartProducts.length})</p>
              <Button variant="danger" onClick={handleDeleteSelectedProducts}>
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
              <Button variant="dark" onClick={handleCheckout}>
                Checkout
              </Button>
            </Stack>
          </Stack>
          <CustomModal
            show={showDeleteProductModal}
            onConfirm={() => deleteSelectedProducts()}
            onCancel={() => setShowDeleteProductModal(false)}
            content={`Do you want to delete the (${
              selectedProducts.length
            }) selected product${
              selectedProducts.length > 1 ? "s" : ""
            } from the cart?`}
          />
          <CustomModal
            show={showNoProductSelectedModal}
            onConfirm={() => setShowNoProductSelectedModal(false)}
            content="Please select product(s)"
          />
          <CustomModal
            show={showCheckoutModal}
            onConfirm={() => setShowCheckoutModal(false)}
            content="Checkout is not yet implemented on this app ;)"
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
