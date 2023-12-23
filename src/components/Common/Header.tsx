import { Badge, Container, Nav, Navbar, Stack } from "react-bootstrap"
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6"
import { IoPersonCircleSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAppSelector } from "../../redux/hooks"
import { selectProducts } from "../../redux/cart/cartSlice"

function Header() {
  const products = useAppSelector(selectProducts)
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="fs-3">
          <Link to="/" className="text-decoration-none text-reset">
            Shopping Cart
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item className="d-flex justify-content-center align-items-center">
              <Link to="/cart">
                <FaCartShopping size="20px" />
                <StyledBadge bg="danger" pill>
                  {products.length}
                </StyledBadge>
              </Link>
            </Nav.Item>
            <Nav.Link>
              <IoPersonCircleSharp size="25px" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
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
