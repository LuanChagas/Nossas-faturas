import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const loginApi = (dados: { usuario: string; password: string }) => {
  console.log(dados);
  return axios.post(
    `${API_URL}/auth/login`,
    {
      userName: dados.usuario,
      password: dados.password,
    },
    { withCredentials: true }
  );
};
