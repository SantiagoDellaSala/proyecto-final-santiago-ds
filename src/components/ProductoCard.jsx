import { Card, Button } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";

const ProductoCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <Card className="mb-4 shadow-sm" style={{ maxWidth: "300px" }}>
      <Card.Img
        variant="top"
        src={`/img/${producto.imagen || "default.jpg"}`}
        alt={`Imagen del producto ${producto.nombre}`}
        style={{
          height: "180px",
          objectFit: "contain",
          backgroundColor: "#f8f9fa",
        }}
      />

      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text style={{ minHeight: "60px", color: "#555" }}>
          {producto.descripcion}
        </Card.Text>
        <Card.Text className="fw-bold">${producto.precio.toFixed(2)}</Card.Text>
        <Button
          variant="primary"
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
