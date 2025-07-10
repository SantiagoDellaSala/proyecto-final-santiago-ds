import { Navbar, Container, Nav } from "react-bootstrap";
import { BsPersonCircle, BsCart3, BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { usuario } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          Xnegg Shop
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {usuario && (
            <Link to="/admin" className="text-light">
              <BsGear size={22} />
            </Link>
          )}
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
