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

function Cart() {
  const {
    data: productsData = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({})
  const cartProducts = useAppSelector(selectCartProducts)
  const dispatch = useAppDispatch()
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
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
            quantity: item.quantity,
            selected: item.selected,
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
      setIsSelectAll(false)
      return
    }

    let hasUnselected = combinedProducts.some(
      (product) => product!.selected === false,
    )

    if (hasUnselected) {
      setIsSelectAll(false)
    } else {
      setIsSelectAll(true)
    }
  }, [combinedProducts])

  const handleSelectAll = () => {
    if (isSelectAll) {
      setIsSelectAll(false)
      dispatch(setProductsSelected({ selected: false }))
    } else if (!isSelectAll && combinedProducts.length > 0) {
      setIsSelectAll(true)
      dispatch(setProductsSelected({ selected: true }))
    }
  }

  const handleSelect = (productId: number, selected: boolean) => {
    if (selected) {
      dispatch(
        setProductSelectedById({ productId: productId, selected: false }),
      )
    } else {
      dispatch(setProductSelectedById({ productId: productId, selected: true }))
    }
  }

  const handleDeleteSelectedProducts = () => {
    if (selectedProducts.length) {
      setShowDeleteSelectedProductsModal(true)
    } else {
      setShowNoProductSelectedModal(true)
    }
  }

  const deleteProduct = (id: number) => {
    dispatch(deleteProductById(id))
    setShowDeleteProductModal(false)
  }

  const deleteSelectedProducts = () => {
    dispatch(deleteProducts(selectedProducts))

    setShowDeleteSelectedProductsModal(false)
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
              {combinedProducts?.map((product, index) => (
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
                      onClick={() => setShowDeleteProductModal(true)}
                    >
                      Delete
                    </Button>
                  </td>
                  <CustomModal
                    show={showDeleteProductModal}
                    onConfirm={() => deleteProduct(product!.id)}
                    onCancel={() => setShowDeleteProductModal(false)}
                    content={`Do you want to delete (${
                      product!.title
                    }) from the cart?`}
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
                aria-label="option 1"
                checked={isSelectAll}
                onChange={handleSelectAll}
              />
              <p className="m-0">Select All ({combinedProducts.length})</p>
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
            show={showDeleteSelectedProductsModal}
            onConfirm={() => deleteSelectedProducts()}
            onCancel={() => setShowDeleteSelectedProductsModal(false)}
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
