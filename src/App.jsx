import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Carrito from "./components/Carrito";
import ProtectedRoute from "./components/ProtectedRoute";
import AgregarProducto from "./components/AgregarProducto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/agregar" element={<AgregarProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
