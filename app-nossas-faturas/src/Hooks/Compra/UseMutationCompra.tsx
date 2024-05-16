import {
  showToastError,
  showToastSucess,
} from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

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
      const erroAxios = error as AxiosError;
      if (erroAxios.status === 401 || erroAxios.status === 403) {
        window.location.href = "/login";
      }
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
