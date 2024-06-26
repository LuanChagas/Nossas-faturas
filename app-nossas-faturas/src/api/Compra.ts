import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCompras = (url: string) => {
  return axios.get<CompraPaginated>(`${API_URL}/compra/${url}`, {
    withCredentials: true,
  });
};

export const createCompraApi = (compra: CreateCompra) => {
  return axios.post<ResponseApi>(`${API_URL}/compra`, compra, {
    withCredentials: true,
  });
};

export const updateCompraApi = (compra: CreateCompra) => {
  return axios.patch<ResponseApi>(`${API_URL}/compra/`, compra, {
    withCredentials: true,
  });
};
