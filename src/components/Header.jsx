import { Navbar, Container, Nav } from "react-bootstrap";
import { BsPersonCircle, BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Xnegg Shop
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          <Link to="/login" className="text-light">
            <BsPersonCircle size={24} />
          </Link>
          <Link to="/carrito" className="text-light">
            <BsCart3 size={24} />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
