import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";

const AgregarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!producto.nombre.trim()) {
      return "El nombre es obligatorio.";
    }
    if (parseFloat(producto.precio) <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (producto.descripcion.trim().length < 10) {
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

    try {
      const res = await fetch("http://localhost:3001/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...producto,
          precio: parseFloat(producto.precio),
        }),
      });

      if (!res.ok) throw new Error("Error al agregar el producto");

      setExito("Producto agregado correctamente.");
      setProducto({ nombre: "", precio: "", descripcion: "", imagen: "" });
    } catch (err) {
      setError("No se pudo agregar el producto.");
    }
  };

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Agregar Producto - Xnegg Shop</title>
        <meta
          name="description"
          content="Añadí un nuevo producto a tu catálogo en Xnegg Shop desde el panel de administrador."
        />
      </Helmet>

      <h2>Agregar Producto</h2>

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
          <Form.Label htmlFor="nombre">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
            aria-label="Nombre del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="precio">Precio</Form.Label>
          <Form.Control
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
            min="1"
            aria-label="Precio del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="descripcion">Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
            aria-label="Descripción del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="imagen">Seleccionar Imagen</Form.Label>
          <Form.Control
            type="file"
            id="imagen"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProducto((prev) => ({
                  ...prev,
                  imagen: file.name,
                }));
              }
            }}
            aria-label="Seleccionar imagen del producto"
          />
          <Form.Text className="text-muted">
            Luego de enviar, copiá manualmente la imagen seleccionada a la carpeta <code>public/img/</code>.
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" aria-label="Agregar producto">
          Agregar Producto
        </Button>
      </Form>
    </div>
  );
};

export default AgregarProducto;
