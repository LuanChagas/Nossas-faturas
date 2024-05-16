import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDadosSelect = async () => {
  return axios.get<SelectData>(`${API_URL}/geral/selectdados`, {
    withCredentials: true,
  });
};
