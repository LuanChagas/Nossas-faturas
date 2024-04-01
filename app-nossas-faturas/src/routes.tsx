import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cadastros from "./pages/Cadastro";
import Compras from "./pages/Compras";
import Transacoes from "./pages/Transacoes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/cadastro",
        element: <Cadastros />,
      },
      {
        path: "/compras",
        element: <Compras />,
      },
      {
        path: "/transacoes",
        element: <Transacoes />,
      },
    ],
  },
]);

export default router;
