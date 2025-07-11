import { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import {
  Row,
  Col,
  Spinner,
  Alert,
  Container,
  InputGroup,
  FormControl,
  Pagination,
  Form,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/productos");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const termino = busqueda.toLowerCase();
    return (
      prod.nombre.toLowerCase().includes(termino) ||
      prod.descripcion.toLowerCase().includes(termino)
    );
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <main className="py-5" role="main">
      <Helmet>
        <title>Xnegg Shop - Inicio</title>
        <meta
          name="description"
          content="Bienvenido a Xnegg Shop. Descubrí productos exclusivos con los mejores precios y calidad."
        />
      </Helmet>

      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold">Bienvenido a Xnegg Shop</h1>
          <p className="text-muted">
            Descubrí nuestros productos seleccionados para tu setup ideal.
          </p>
        </div>

        <Form className="mb-4" role="search" aria-label="Formulario de búsqueda de productos">
          <InputGroup>
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={busqueda}
              onChange={handleBusqueda}
              aria-label="Buscar productos"
            />
          </InputGroup>
        </Form>

        {cargando && (
          <div className="d-flex justify-content-center" aria-live="polite">
            <Spinner animation="border" variant="dark" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center" aria-live="assertive">
            {error}
          </Alert>
        )}

        {!cargando && !error && productosFiltrados.length === 0 && (
          <p className="text-center text-muted" aria-live="polite">
            No se encontraron productos con esos criterios.
          </p>
        )}

        <Row className="g-4">
          {productosPaginados.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>

        {totalPaginas > 1 && (
          <Pagination className="justify-content-center mt-4" aria-label="Paginación de productos">
            <Pagination.First
              onClick={() => setPaginaActual(1)}
              disabled={paginaActual === 1}
            />
            <Pagination.Prev
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
            />
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <Pagination.Item
                key={num}
                active={num === paginaActual}
                onClick={() => setPaginaActual(num)}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
            />
            <Pagination.Last
              onClick={() => setPaginaActual(totalPaginas)}
              disabled={paginaActual === totalPaginas}
            />
          </Pagination>
        )}
      </Container>
    </main>
  );
};

export default Home;
