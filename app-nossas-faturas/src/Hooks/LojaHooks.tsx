import {
  showToastError,
  showToastSucess,
} from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryLojaHook = <T,>(
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<T>>
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key, url],
    queryFn: () => requestApi(url).then((response) => response.data),
  });
  const dataLoja = data;
  const isLoadingLoja = isLoading;
  const isErrorLoja = isError;
  return { dataLoja, isLoadingLoja, isErrorLoja };
};

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
      showToastSucess(`Loja ${tipoMensagemSucess} com sucesso!`);
    },
    onError: (error) => {
      showToastError(`Erro ao ${tipoMensagemError} loja!`);
      console.log(error);
    },
  });
};
