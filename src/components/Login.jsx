import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";

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
      <div>
        <Alert variant="success">Hola, {usuario.nombre}</Alert>
        <Button variant="secondary" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleLogin} style={{ maxWidth: "400px" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
  );
};

export default Login;
