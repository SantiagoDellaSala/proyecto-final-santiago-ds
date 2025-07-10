import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Carrito from "./components/Carrito";
import ProtectedRoute from "./components/ProtectedRoute";
import AgregarProducto from "./components/AgregarProducto";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ToastConfig from "./components/ToastConfig"; // ✅ Toastify container

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ToastContainer visible en todas las rutas */}
        <ToastConfig /> {/* ✅ insertado fuera de Routes */}
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agregar"
              element={
                <ProtectedRoute>
                  <AgregarProducto />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
