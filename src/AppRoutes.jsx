import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Carrito = lazy(() => import("./components/Carrito"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const AgregarProducto = lazy(() => import("./components/AgregarProducto"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center py-5">Cargando...</div>}>
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
    </Suspense>
  );
};

export default AppRoutes;