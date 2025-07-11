import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ToastConfig from "./components/ToastConfig";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastConfig />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
