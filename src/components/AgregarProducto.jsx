import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

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
            <h2>Agregar Producto</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {exito && <Alert variant="success">{exito}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Seleccionar Imagen</Form.Label>
                    <Form.Control
                        type="file"
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
                    />
                    <Form.Text className="text-muted">
                        Luego de enviar, copiá manualmente la imagen seleccionada a la carpeta <code>public/img/</code>.
                    </Form.Text>
                </Form.Group>


                <Button type="submit" variant="primary">
                    Agregar Producto
                </Button>
            </Form>
        </div>
    );
};

export default AgregarProducto;
