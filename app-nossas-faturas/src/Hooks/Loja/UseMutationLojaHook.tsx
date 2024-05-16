import {
  showToastError,
  showToastSucess,
} from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useMutationLojaHook = (
  urlQuery: string,
  functionApi: (data: IFormInputsLoja) => Promise<AxiosResponse<ResponseApi>>,
  tipo: EAcaoMutationHooks
) => {
  const tipoMensagemSucess =
    tipo === EAcaoMutationHooks.CADASTRAR
      ? "cadastrada"
      : tipo === EAcaoMutationHooks.EDITAR
      ? "editada"
      : "excluída";
  const tipoMensagemError =
    tipo === EAcaoMutationHooks.CADASTRAR
      ? "cadastrar"
      : tipo === EAcaoMutationHooks.EDITAR
      ? "editar"
      : "excluir";

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IFormInputsLoja) => {
      return functionApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLojas", urlQuery] });
      showToastSucess(`Loja ${tipoMensagemSucess} com sucesso!`, tipo);
    },
    onError: (error) => {
      const erroAxios = error as AxiosError;
      if (
        erroAxios.response?.status === 401 ||
        erroAxios.response?.status === 403
      ) {
        window.location.href = "/login";
      }
      showToastError(`Erro ao ${tipoMensagemError} loja!`);
      console.log(error);
    },
  });
};
