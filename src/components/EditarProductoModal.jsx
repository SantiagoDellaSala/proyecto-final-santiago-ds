import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditarProductoModal = ({ producto, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        precio: producto.precio || "",
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
      });
      setError("");
      setExito("");
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!formData.nombre.trim()) {
      return "El nombre es obligatorio.";
    }
    if (parseFloat(formData.precio) <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (formData.descripcion.trim().length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    const mensajeError = validar();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/productos/${producto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            precio: parseFloat(formData.precio),
          }),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar el producto");

      const actualizado = await res.json();
      setExito("Producto actualizado correctamente.");
      onUpdate(actualizado);
    } catch (err) {
      setError("No se pudo actualizar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      aria-labelledby="editar-producto-titulo"
    >
      <Modal.Header closeButton>
        <Modal.Title id="editar-producto-titulo">Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" role="alert" aria-live="assertive">
            {error}
          </Alert>
        )}
        {exito && (
          <Alert variant="success" role="alert" aria-live="polite">
            {exito}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="editar-nombre">Nombre</Form.Label>
            <Form.Control
              id="editar-nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={loading}
              aria-label="Nombre del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="editar-precio">Precio</Form.Label>
            <Form.Control
              id="editar-precio"
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="1"
              disabled={loading}
              aria-label="Precio del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="editar-descripcion">Descripción</Form.Label>
            <Form.Control
              id="editar-descripcion"
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              disabled={loading}
              aria-label="Descripción del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="editar-imagen">Nombre de Imagen</Form.Label>
            <Form.Control
              id="editar-imagen"
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              disabled={loading}
              aria-label="Nombre del archivo de imagen"
            />
            <Form.Text className="text-muted">
              Asegúrate que la imagen exista en la carpeta <code>public/img/</code>
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} aria-label="Guardar cambios del producto">
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarProductoModal;
