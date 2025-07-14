import { Card, Button } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";

const ProductoCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <Card className="producto-card h-100">
      <Card.Img
        variant="top"
        src={`/img/${producto.imagen || "default.jpg"}`}
        alt={`Imagen del producto ${producto.nombre}`}
        className="producto-img"
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-semibold">{producto.nombre}</Card.Title>
        <Card.Text className="producto-descripcion flex-grow-1">
          {producto.descripcion}
        </Card.Text>
        <Card.Text className="card-price fw-bold fs-5">
          ${producto.precio.toLocaleString("es-AR")}
        </Card.Text>

        <Button
          variant="dark"
          className="agregar-carrito mt-2"
          onClick={() => agregarAlCarrito(producto)}
          aria-label={`Agregar ${producto.nombre} al carrito`}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
