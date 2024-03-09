import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCompras = (url: string) => {
  return axios.get<Compra[]>(`${API_URL}/compra/${url}`);
};
