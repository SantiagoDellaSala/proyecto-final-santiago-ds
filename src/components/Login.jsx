import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";

const Login = () => {
  const { usuario, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Completa todos los campos");
      return;
    }

    const usuarioSimulado = { nombre: "Santiago Della Sala", email };
    login(usuarioSimulado);
    setError(null);
  };

  if (usuario) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Alert variant="success" className="text-center">
              Hola, <strong>{usuario.nombre}</strong>
            </Alert>
            <div className="d-grid">
              <Button variant="secondary" onClick={logout}>
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
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">Iniciar Sesión</h3>
            <Form onSubmit={handleLogin}>
              {error && <Alert variant="danger">{error}</Alert>}
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
                <Button variant="primary" type="submit">
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
