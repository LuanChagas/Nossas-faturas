import { createContext } from "react";

export interface AuthContextType {
  user: string;
  isAutenticado: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setIsAutenticado: React.Dispatch<React.SetStateAction<boolean>>;
  loginContext: (dados: {
    usuario: string;
    password: string;
  }) => Promise<boolean>;
  logoutContext: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: "",
  isAutenticado: false,
  setUser: () => {},
  setIsAutenticado: () => {},
  loginContext: async () => false,
  logoutContext: () => {},
});
