import { showToastError, showToastSucess } from "@/components/shared/global/ShowToast";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useMutationPessoaHook = (
  urlQuery: string,
  functionApi: (data: IFormInputsPessoa) => Promise<AxiosResponse<ResponseApi>>,
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
    mutationFn: (data: IFormInputsPessoa) => {
      return functionApi(data);
    },
    onSuccess: () => {
      console.log(urlQuery);
      queryClient.invalidateQueries({ queryKey: ["getPessoas", urlQuery] });
      showToastSucess(`Pessoa ${tipoMensagemSucess} com sucesso!`, tipo);
    },
    onError: (error) => {
      showToastError(
        `Erro ao ${tipoMensagemError} pessoa!`,
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
