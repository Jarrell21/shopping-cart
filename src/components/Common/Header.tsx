import { Badge, Container, Nav, Navbar } from "react-bootstrap"
import { FaCartShopping } from "react-icons/fa6"
import { TbTruckDelivery } from "react-icons/tb"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAppSelector } from "../../redux/hooks"
import { selectCartProducts } from "../../redux/cart/cartSlice"

function Header() {
  const products = useAppSelector(selectCartProducts)
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="fs-2">
          <Link to="/" className="text-decoration-none text-reset">
            Shopping Cart
          </Link>
        </Navbar.Brand>
        <Nav className="flex-row">
          <Nav.Item>
            <Link to="/cart" className="link-body-emphasis">
              <FaCartShopping size="20px" />
              <StyledBadge bg="danger" pill>
                {products.length}
              </StyledBadge>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <div>
              <TbTruckDelivery size="25px" />
              <StyledBadge bg="danger" pill>
                {products.length}
              </StyledBadge>
            </div>
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
