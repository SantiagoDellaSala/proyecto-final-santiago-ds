import { useEffect, useState } from "react";
import { Table, Button, Modal, Alert, Spinner } from "react-bootstrap";
import EditarProductoModal from "./EditarProductoModal";
// ... imports sin cambios
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState(""); // ✅ nuevo
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const navigate = useNavigate();

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:3001/productos");
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
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
      setMensaje("Producto eliminado correctamente.");
      setConfirmarEliminar(null);

      setTimeout(() => setMensaje(""), 3000); // ✅ ocultar mensaje luego de 3s
    } catch (err) {
      setError("No se pudo eliminar el producto.");
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
    setMensaje("Producto actualizado correctamente.");
    setTimeout(() => setMensaje(""), 3000); // ✅ ocultar luego de 3s
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Panel de Administración</h2>

      <Button variant="success" className="mb-3" onClick={() => navigate("/admin/agregar")}>
        Agregar Producto
      </Button>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : productos.length === 0 ? (
        <p>No hay productos cargados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img
                    src={`/img/${prod.imagen || "default.jpg"}`}
                    alt={prod.nombre}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.descripcion}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirEditar(prod)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setConfirmarEliminar(prod.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de edición */}
      {mostrarModal && productoAEditar && (
        <EditarProductoModal
          producto={productoAEditar}
          onClose={cerrarModal}
          onUpdate={actualizarProducto}
        />
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal
        show={!!confirmarEliminar}
        onHide={() => setConfirmarEliminar(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que querés eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmarEliminar(null)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarProducto(confirmarEliminar)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
