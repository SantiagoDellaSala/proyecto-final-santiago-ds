import { useCarrito } from "../context/CarritoContext";
import { Button } from "react-bootstrap";

const Carrito = () => {
  const { carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito } = useCarrito();

  const productoEjemplo = {
    id: 1,
    nombre: "Guante Pro",
    precio: 2000,
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Carrito</h2>
      <Button onClick={() => agregarAlCarrito(productoEjemplo)}>Agregar producto</Button>
      <Button variant="danger" onClick={vaciarCarrito} style={{ marginLeft: "1rem" }}>
        Vaciar carrito
      </Button>

      <ul>
        {carrito.map((item) => (
          <li key={item.id}>
            {item.nombre} - x{item.cantidad}
            <Button variant="outline-danger" size="sm" onClick={() => quitarDelCarrito(item.id)} style={{ marginLeft: "0.5rem" }}>
              Quitar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carrito;
