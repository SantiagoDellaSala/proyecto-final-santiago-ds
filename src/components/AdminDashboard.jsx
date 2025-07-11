import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Spinner,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import EditarProductoModal from "./EditarProductoModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const navigate = useNavigate();

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:3001/productos");
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      toast.error("No se pudo obtener los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");

      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      toast.success("Producto eliminado correctamente.");
      setConfirmarEliminar(null);
    } catch (err) {
      toast.error("No se pudo eliminar el producto.");
    }
  };

  const abrirEditar = (producto) => {
    setProductoAEditar(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoAEditar(null);
  };

  const actualizarProducto = (actualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
    cerrarModal();
    toast.success("Producto actualizado correctamente.");
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Panel de Administración - Xnegg Shop</title>
        <meta
          name="description"
          content="Panel de administración para gestionar los productos de Xnegg Shop. Editá, eliminá o agregá productos fácilmente."
        />
      </Helmet>

      <h2 className="mb-4">Panel de Administración</h2>

      <Button
        variant="success"
        className="mb-4"
        onClick={() => navigate("/admin/agregar")}
        aria-label="Agregar un nuevo producto"
      >
        Agregar Producto
      </Button>

      {cargando ? (
        <div className="text-center" role="status" aria-live="polite">
          <Spinner animation="border" />
        </div>
      ) : productos.length === 0 ? (
        <p role="alert" className="text-muted">No hay productos cargados.</p>
      ) : (
        <Row className="g-4">
          {productos.map((prod) => (
            <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`/img/${prod.imagen || "default.jpg"}`}
                  alt={`Imagen de ${prod.nombre}`}
                  className="img-fluid"
                  style={{
                    height: "180px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {prod.nombre}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ${prod.precio.toLocaleString("es-AR")}
                  </Card.Subtitle>
                  <Card.Text
                    style={{
                      maxHeight: "4.5em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {prod.descripcion}
                  </Card.Text>
                  <div className="d-flex justify-content-between gap-2 mt-3 flex-wrap">
                    <Button
                      variant="warning"
                      size="sm"
                      className="flex-fill"
                      onClick={() => abrirEditar(prod)}
                      aria-label={`Editar producto ${prod.nombre}`}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex-fill"
                      onClick={() => setConfirmarEliminar(prod.id)}
                      aria-label={`Eliminar producto ${prod.nombre}`}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        show={!!confirmarEliminar}
        onHide={() => setConfirmarEliminar(null)}
        centered
        aria-labelledby="titulo-modal-eliminar"
      >
        <Modal.Header closeButton>
          <Modal.Title id="titulo-modal-eliminar">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que querés eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setConfirmarEliminar(null)}
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarProducto(confirmarEliminar)}
            aria-label="Confirmar eliminación del producto"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {mostrarModal && productoAEditar && (
        <EditarProductoModal
          producto={productoAEditar}
          onClose={cerrarModal}
          onUpdate={actualizarProducto}
        />
      )}
    </Container>
  );
};

export default AdminDashboard;
