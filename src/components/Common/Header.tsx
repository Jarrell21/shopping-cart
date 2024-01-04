import { Badge, Container, Nav, Navbar } from "react-bootstrap"
import { FaCartShopping } from "react-icons/fa6"
import { TbTruckDelivery } from "react-icons/tb"
import { FaShop } from "react-icons/fa6"
import { Tooltip } from "react-tooltip"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAppSelector } from "../../redux/hooks"
import { selectCartProducts } from "../../redux/cart/cartSlice"
import { selectOrders } from "../../redux/orders/orderSlice"

function Header() {
  const products = useAppSelector(selectCartProducts)
  const orders = useAppSelector(selectOrders)
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="fs-2">
          <Link to="/" className="text-decoration-none text-reset">
            Shop Ping
          </Link>
        </Navbar.Brand>
        <Nav className="flex-row">
          <Nav.Item className="me-3">
            <Tooltip id="products-tooltip" />
            <Link
              to="/products"
              className="link-body-emphasis"
              data-tooltip-id="products-tooltip"
              data-tooltip-content="Products"
              data-tooltip-place="bottom"
            >
              <FaShop size="25px" />
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Tooltip id="cart-tooltip" />
            <Link
              to="/cart"
              className="link-body-emphasis"
              data-tooltip-id="cart-tooltip"
              data-tooltip-content="Cart"
              data-tooltip-place="bottom"
            >
              <FaCartShopping size="20px" />
            </Link>
            <StyledBadge bg="danger" pill>
              {products.length}
            </StyledBadge>
          </Nav.Item>
          <Nav.Item>
            <Tooltip id="orders-tooltip" />
            <Link
              to="/orders"
              className="link-body-emphasis"
              data-tooltip-id="orders-tooltip"
              data-tooltip-content="Orders"
              data-tooltip-place="bottom"
            >
              <TbTruckDelivery size="25px" />
            </Link>
            <StyledBadge bg="danger" pill>
              {orders.length}
            </StyledBadge>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header

const StyledBadge = styled(Badge)`
  position: relative;
  top: -15px;
  left: -10px;
`
