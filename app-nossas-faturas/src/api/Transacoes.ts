import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDadosFiltroTransacoes = () => {
  return axios.get<FiltroTransacoesResponse>(`${API_URL}/transacao/filtro`);
};

export const getTransacoes = (filtro: FiltroTransacoes) => {
  return axios.post<Transacao[]>(`${API_URL}/transacao/`, filtro);
};
