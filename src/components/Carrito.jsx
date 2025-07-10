import { useCarrito } from "../context/CarritoContext";
import { Button, Table, Container, Alert, ButtonGroup } from "react-bootstrap";

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

  return (
    <Container className="py-4">
      <h2 className="mb-4">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <Alert variant="info">No hay productos en el carrito.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
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
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-secondary"
                        onClick={() => disminuirCantidad(item.id)}
                      >
                        -
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
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: ${calcularTotal().toFixed(2)}</h4>
            <Button variant="outline-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;
