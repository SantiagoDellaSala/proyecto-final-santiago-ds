import { Card } from "react-bootstrap";

const ProductoCard = ({ producto }) => {
    return (
        <Card className="mb-4 shadow-sm" style={{ maxWidth: "300px" }}>
            <Card.Img
                variant="top"
                src={`/img/${producto.imagen || "default.jpg"}`}
                alt={producto.nombre}
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
            </Card.Body>
        </Card>
    );
};

export default ProductoCard;
