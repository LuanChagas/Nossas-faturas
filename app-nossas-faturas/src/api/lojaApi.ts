import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createLojaApi = async (loja: Loja) => {
  return axios.post<ResponseApi>(`${API_URL}/loja`, loja);
};

export const getLojasApi = async (url: string) => {
  return axios.get<LojaPaginated>(`${API_URL}/loja/${url}`);
};

export const updateLojaApi = async (loja: Loja) => {
  return axios.put<ResponseApi>(`${API_URL}/loja/${loja.id}`, loja);
};

export const deleteLojaApi = async (loja: Loja) => {
  return axios.delete<ResponseApi>(`${API_URL}/loja/${loja.id}`);
};
