import { getDadosSelect } from "@/api/SelectData";
import {
  showToastError,
  showToastSucess,
} from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

export const useQueryCompra = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<CompraPaginated>>
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key, url],
    queryFn: () =>
      requestApi(url).then((response) => {
        return response.data;
      }),
  });
  return { data, isLoading, isError };
};

export const useQueryDataSelect = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["selectData"],
    queryFn: () => getDadosSelect().then((response) => response.data),
  });
  return { data, isLoading, isError };
};

export const useMutatationCompra = (
  urlQuery: string,
  functionApi: (data: CreateCompra) => Promise<AxiosResponse<ResponseApi>>,
  tipo: EAcaoMutationHooks
) => {
  const mensagemSucess = tipoMensagemSucess(tipo);
  const mensagemError = tipoMensagemError(tipo);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCompra) => {
      return functionApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCompras", urlQuery],
      });
      showToastSucess(`Compra ${mensagemSucess} com sucesso!`, tipo);
    },
    onError: (error) => {
      showToastError(
        `Erro ao ${mensagemError} compra!`,
        tipo === EAcaoMutationHooks.EXCLUIR
          ? 2
          : tipo === EAcaoMutationHooks.EDITAR
          ? 1
          : 3
      );
      console.log(error);
    },
  });
};

export const useGetUrlQuery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const limit = queryParams.get("limit") || "10";
  return `compras?page=${page}&limit=${limit}`;
};

function tipoMensagemSucess(tipo: EAcaoMutationHooks) {
  return tipo === EAcaoMutationHooks.CADASTRAR
    ? "cadastrada"
    : tipo === EAcaoMutationHooks.EDITAR
    ? "editada"
    : "excluída";
}

function tipoMensagemError(tipo: EAcaoMutationHooks) {
  return tipo === EAcaoMutationHooks.CADASTRAR
    ? "cadastrar"
    : tipo === EAcaoMutationHooks.EDITAR
    ? "editar"
    : "excluir";
}
