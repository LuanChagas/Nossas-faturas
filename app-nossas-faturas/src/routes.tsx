import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cadastros from "./pages/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/cadastro",
        element: <Cadastros />,
      },
    ],
  },
]);

export default router;
