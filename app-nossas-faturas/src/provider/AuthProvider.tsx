import { loginApi } from "@/api/Autenticacao";
import { AuthContext } from "@/contexts/AuthContext";
import { HttpStatusCode } from "axios";
import { ReactNode, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("");
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);

  const loginContext = async (dados: { usuario: string; password: string }) => {
    try {
      const response = await loginApi(dados);
      if (response.status === HttpStatusCode.Ok) {
        setIsAutenticado(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logoutContext = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAutenticado,
        setIsAutenticado,
        loginContext,
        logoutContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
