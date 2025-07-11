import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Login = () => {
  const { usuario, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Completa todos los campos");
      return;
    }

    const usuarioSimulado = { nombre: "Santiago Della Sala", email };
    login(usuarioSimulado);
    toast.success("Inicio de sesión exitoso");
  };

  if (usuario) {
    return (
      <Container className="py-5">
        <Helmet>
          <title>Mi Cuenta - Xnegg Shop</title>
          <meta name="description" content="Gestión de sesión para usuarios registrados en Xnegg Shop" />
        </Helmet>

        <Row className="justify-content-center">
          <Col md={6} lg={4} className="text-center">
            <h5 aria-live="polite">
              Hola, <strong>{usuario.nombre}</strong>
            </h5>
            <div className="d-grid mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  toast.info("Sesión cerrada");
                }}
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Helmet>
        <title>Iniciar sesión - Xnegg Shop</title>
        <meta name="description" content="Accedé a tu cuenta para gestionar productos y realizar compras en Xnegg Shop." />
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">Iniciar Sesión</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo electrónico"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                  required
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" aria-label="Enviar formulario de inicio de sesión">
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

