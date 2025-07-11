import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { BsPersonCircle, BsCart3, BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

const Header = () => {
  const { usuario } = useAuth();
  const { carrito } = useCarrito();

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

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
            alt="Logo de Xnegg Shop"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          Xnegg Shop
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {usuario && (
            <Link
              to="/admin"
              className="text-light"
              aria-label="Panel de administración"
            >
              <BsGear size={22} />
            </Link>
          )}
          <Link
            to="/login"
            className="text-light"
            aria-label="Página de inicio de sesión"
          >
            <BsPersonCircle size={24} />
          </Link>
          <Link
            to="/carrito"
            className="position-relative text-light"
            aria-label="Ver carrito de compras"
          >
            <BsCart3 size={24} />
            {cantidadTotal > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cantidadTotal}
              </Badge>
            )}
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
