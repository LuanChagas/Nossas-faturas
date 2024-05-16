import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCartoesApi = (url: string) => {
  return axios.get<CartaoPaginated>(`${API_URL}/cartao/${url}`, {
    withCredentials: true,
  });
};

export const createCartaoApi = (cartao: Cartao) => {
  return axios.post<ResponseApi>(`${API_URL}/cartao`, cartao, {
    withCredentials: true,
  });
};

export const updateCartaoApi = (cartao: Cartao) => {
  return axios.put<ResponseApi>(`${API_URL}/cartao/${cartao.id}`, cartao, {
    withCredentials: true,
  });
};

export const deleteCartaoApi = (cartao: Cartao) => {
  return axios.delete<ResponseApi>(`${API_URL}/cartao/${cartao.id}`, {
    withCredentials: true,
  });
};
