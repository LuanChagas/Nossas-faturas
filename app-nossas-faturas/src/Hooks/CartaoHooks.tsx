import {
  showToastError,
  showToastSucess,
} from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryCartao = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<CartaoPaginated>>
) => {
  const {
    data: dataCartao,
    isLoading: isLoadingCartao,
    isError: isErrorCartao,
  } = useQuery({
    queryKey: [key, url],
    queryFn: () =>
      requestApi(url).then((response) => {
        return response.data;
      }),
  });
  return { dataCartao, isLoadingCartao, isErrorCartao };
};

export const useMutatationCartoes = (
  urlQuery: string,
  functionApi: (data: Cartao) => Promise<AxiosResponse<ResponseApi>>,
  tipo: EAcaoMutationHooks
) => {
  const mensagemSucess = tipoMensagemSucess(tipo);
  const mensagemError = tipoMensagemError(tipo);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Cartao) => {
      return functionApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCartoes", urlQuery],
      });
      showToastSucess(`Cartão ${mensagemSucess} com sucesso!`, tipo);
    },
    onError: (error) => {
      showToastError(
        `Erro ao ${mensagemError} cartão!`,
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
