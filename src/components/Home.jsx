import { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/productos");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProductos(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Bienvenido a Xnegg Shop</h1>

      {cargando && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && productos.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}

      <Row className="g-3">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <ProductoCard producto={producto} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default Home;
