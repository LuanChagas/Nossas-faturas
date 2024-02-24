import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPessoasApi = async (url: string) => {
  return axios.get<PessoaPaginated>(`${API_URL}/pessoa/${url}`);
};

export const createPessoaApi = async (pessoa: Pessoa) => {
  return axios.post<ResponseApi>(`${API_URL}/pessoa`, pessoa);
};

export const updatePessoaApi = async (pessoa: Pessoa) => {
  return axios.put<ResponseApi>(`${API_URL}/pessoa/${pessoa.id}`, pessoa);
};

export const deletePessoaApi = async (pessoa: Pessoa) => {
  return axios.delete<ResponseApi>(`${API_URL}/pessoa/${pessoa.id}`);
};
