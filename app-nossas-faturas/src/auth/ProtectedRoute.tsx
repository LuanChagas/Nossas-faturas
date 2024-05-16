import { AuthContext } from "@/contexts/AuthContext";
import { ReactNode, useContext } from "react";

import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext não encontrado");
  }
  const { isAutenticado } = authContext;
  return isAutenticado ? children : <Navigate to="/login" />;
};
