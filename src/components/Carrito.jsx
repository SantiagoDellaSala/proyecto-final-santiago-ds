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
      <h2 className="mb-4 text-center">🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center text-muted">No hay productos en el carrito.</div>
      ) : (
        <>
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
                          alt={item.nombre}
                          width={60}
                          height={60}
                          style={{
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                          }}
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>
                        <ButtonGroup size="sm">
                          <Button
                            variant="outline-secondary"
                            onClick={() => disminuirCantidad(item.id)}
                          >
                            −
                          </Button>
                          <Button variant="light" disabled>
                            {item.cantidad}
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => aumentarCantidad(item.id)}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </td>
                      <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleQuitarItem(item.id)}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button variant="outline-danger" onClick={handleVaciarCarrito}>
                  Vaciar carrito
                </Button>
                <h4>Total: ${calcularTotal().toFixed(2)}</h4>
              </div>
            </Card>
          </div>

          <div className="d-block d-md-none">
            <Row className="g-3">
              {carrito.map((item) => (
                <Col key={item.id} xs={12}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <div className="d-flex gap-3">
                        <img
                          src={`/img/${item.imagen || "default.jpg"}`}
                          alt={item.nombre}
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
                            Precio: ${item.precio.toFixed(2)}
                          </Card.Text>
                          <Card.Text className="mb-1">
                            Subtotal: $
                            {(item.precio * item.cantidad).toFixed(2)}
                          </Card.Text>
                          <ButtonGroup size="sm" className="mb-2">
                            <Button
                              variant="outline-secondary"
                              onClick={() => disminuirCantidad(item.id)}
                            >
                              −
                            </Button>
                            <Button variant="light" disabled>
                              {item.cantidad}
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={() => aumentarCantidad(item.id)}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                          <div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleQuitarItem(item.id)}
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
                <h5>Total: ${calcularTotal().toFixed(2)}</h5>
                <Button variant="outline-danger" onClick={handleVaciarCarrito}>
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
