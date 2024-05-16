import { Navigate, createBrowserRouter } from "react-router-dom";
import Cadastros from "./pages/Cadastro";
import Compras from "./pages/Compras";
import Transacoes from "./pages/Transacoes";
import { Login } from "./pages/Login";
import Menu from "./pages/Menu";
import { ProtectedRoute } from "./auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/menu" />,
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "cadastro",
        element: (
          <ProtectedRoute>
            <Cadastros />
          </ProtectedRoute>
        ),
      },
      {
        path: "compras",
        element: (
          <ProtectedRoute>
            <Compras />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "transacoes",
        element: (
          <ProtectedRoute>
            <Transacoes />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

//DxVFjNR9^#cFyF
