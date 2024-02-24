import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCartoes = (url: string) => {
  return axios.get<CartaoPaginated>(`${API_URL}/cartao/${url}`);
};
