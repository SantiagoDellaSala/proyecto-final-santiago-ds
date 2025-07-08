import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CarritoProvider from "./context/CarritoContext";
import AuthProvider from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);
