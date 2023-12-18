import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { FaCartShopping } from "react-icons/fa6"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Link } from "react-router-dom"

function Header() {
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
            <Nav.Link>
              <Stack direction="horizontal" gap={1}>
                <input placeholder="Search..." />
                <FaMagnifyingGlass />
              </Stack>
            </Nav.Link>
            <Nav.Link>
              <FaCartShopping />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
