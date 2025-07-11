import { useCarrito } from "../context/CarritoContext";
import {
  Button,
  Table,
  Container,
  ButtonGroup,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    quitarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useCarrito();

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const handleVaciarCarrito = () => {
    vaciarCarrito();
    toast.info("Carrito vaciado");
  };

  const handleQuitarItem = (id) => {
    quitarDelCarrito(id);
    toast.warn("Producto quitado del carrito");
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Carrito de Compras - Xnegg Shop</title>
        <meta
          name="description"
          content="Revisá los productos agregados a tu carrito antes de finalizar la compra en Xnegg Shop."
        />
      </Helmet>

      <h2 className="mb-4 text-center">🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center text-muted" aria-live="polite">
          No hay productos en el carrito.
        </div>
      ) : (
        <>
          {/* Vista de escritorio */}
          <div className="d-none d-md-block">
            <Card className="p-3 shadow-sm">
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={`/img/${item.imagen || "default.jpg"}`}
                          alt={`Imagen de ${item.nombre}`}
                          width={60}
                          height={60}
                          style={{
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                          }}
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString("es-AR")}</td>
                      <td>
                        <ButtonGroup size="sm" aria-label="Modificar cantidad">
                          <Button
                            variant="outline-secondary"
                            onClick={() => disminuirCantidad(item.id)}
                            aria-label={`Disminuir cantidad de ${item.nombre}`}
                          >
                            −
                          </Button>
                          <Button variant="light" disabled aria-label="Cantidad actual">
                            {item.cantidad}
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => aumentarCantidad(item.id)}
                            aria-label={`Aumentar cantidad de ${item.nombre}`}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </td>
                      <td>${(item.precio * item.cantidad).toLocaleString("es-AR")}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleQuitarItem(item.id)}
                          aria-label={`Quitar ${item.nombre} del carrito`}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="outline-danger"
                  onClick={handleVaciarCarrito}
                  aria-label="Vaciar todo el carrito"
                >
                  Vaciar carrito
                </Button>
                <h4>Total: ${calcularTotal().toLocaleString("es-AR")}</h4>
              </div>
            </Card>
          </div>

          {/* Vista móvil */}
          <div className="d-block d-md-none">
            <Row className="g-3">
              {carrito.map((item) => (
                <Col key={item.id} xs={12}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <div className="d-flex gap-3">
                        <img
                          src={`/img/${item.imagen || "default.jpg"}`}
                          alt={`Imagen de ${item.nombre}`}
                          width={80}
                          height={80}
                          style={{
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <div className="flex-grow-1">
                          <Card.Title>{item.nombre}</Card.Title>
                          <Card.Text className="mb-1">
                            Precio: ${item.precio.toLocaleString("es-AR")}
                          </Card.Text>
                          <Card.Text className="mb-1">
                            Subtotal: ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                          </Card.Text>
                          <ButtonGroup size="sm" className="mb-2" aria-label="Modificar cantidad">
                            <Button
                              variant="outline-secondary"
                              onClick={() => disminuirCantidad(item.id)}
                              aria-label={`Disminuir cantidad de ${item.nombre}`}
                            >
                              −
                            </Button>
                            <Button variant="light" disabled aria-label="Cantidad actual">
                              {item.cantidad}
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={() => aumentarCantidad(item.id)}
                              aria-label={`Aumentar cantidad de ${item.nombre}`}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                          <div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleQuitarItem(item.id)}
                              aria-label={`Quitar ${item.nombre} del carrito`}
                            >
                              Quitar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              <Col xs={12} className="text-center mt-4">
                <h5>Total: ${calcularTotal().toLocaleString("es-AR")}</h5>
                <Button
                  variant="outline-danger"
                  onClick={handleVaciarCarrito}
                  aria-label="Vaciar todo el carrito"
                >
                  Vaciar carrito
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;
