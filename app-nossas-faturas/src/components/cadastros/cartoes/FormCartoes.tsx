import Input from "../../shared/global/Input";
import Label from "../../shared/global/Label";
import { Controller, useForm } from "react-hook-form";
import ErrosInputs from "../../shared/global/ErrosInputs";
import { formatoMoeda } from "@/utils/masks/ValueMask";

import { createCartaoApi, updateCartaoApi } from "@/api/CartaoApi";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { removeMoeda } from "@/utils/masks/RemoveMask";
import { useMutatationCartoes } from "@/Hooks/Cartao/UseMutationCartao";

type CadastroCartoesProps = {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  cartao?: Cartao;
  urlQuery: string;
};

const FormCartoes = ({
  closedDialog,
  cartao,
  urlQuery,
}: CadastroCartoesProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsCartao>({
    defaultValues: {
      id: cartao?.id || 0,
      nome: cartao?.nome || "",
      pix: cartao?.pix || "",
      fechamento: cartao?.dia_fechamento || "",
      vencimento: cartao?.dia_vencimento || "",
      limiteTotal: cartao?.limite_total
        ? formatoMoeda(Number(cartao?.limite_total))
        : "R$ 0,00",
      limiteDisponivel: cartao?.limite_disponivel
        ? formatoMoeda(Number(cartao?.limite_disponivel))
        : "R$ 0,00",
    },
  });

  const mutation = useMutatationCartoes(
    urlQuery,
    cartao ? updateCartaoApi : createCartaoApi,
    cartao ? EAcaoMutationHooks.EDITAR : EAcaoMutationHooks.CADASTRAR
  );

  const onSubmit = (data: IFormInputsCartao) => {
    removeMoeda(data.limiteDisponivel);

    mutation.mutate({
      dia_fechamento: data.fechamento,
      dia_vencimento: data.vencimento,
      limite_disponivel: removeMoeda(data.limiteDisponivel),
      limite_total: removeMoeda(data.limiteTotal),
      ...data,
    });
    closedDialog(false);
  };

  return (
    <section>
      <section>
        <section>
          {errors.nome && <ErrosInputs title="Nome é obrigatório" />}
          {errors.pix && <ErrosInputs title="PIX é obrigatório" />}
          {errors.fechamento?.type === "required" && (
            <ErrosInputs title="Campo obrigatório" />
          )}
          {(errors.fechamento?.type === "min" ||
            errors.fechamento?.type === "max") && (
            <ErrosInputs title="Fechamento deve ser maior que 0 e menor que 31" />
          )}
          {errors.vencimento?.type === "required" && (
            <ErrosInputs title="Vencimento é obrigatório" />
          )}
          {(errors.vencimento?.type === "min" ||
            errors.vencimento?.type === "max") && (
            <ErrosInputs title=" Vencimento deve ser maior que 0 e menor que 31" />
          )}
          {errors.limiteTotal && (
            <ErrosInputs title="Limite total é obrigatório" />
          )}
          {errors.limiteDisponivel && (
            <ErrosInputs title="Limite disponivel é obrigatório" />
          )}
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <Label title="Nome" htmlFor="nome" />
          <Controller
            name="nome"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="text" id="nome" {...field} />}
          />

          <Label title="PIX" htmlFor="pix" />
          <Controller
            name="pix"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="text" id="pix" {...field} />}
          />

          <div className="flex  sm:flex-row justify-between">
            <div className="flex flex-col ">
              <Label title="Fechamento" htmlFor="fechamento" />
              <Controller
                name="fechamento"
                control={control}
                rules={{ required: true, min: 1, max: 31 }}
                render={({ field }) => (
                  <Input
                    type="number"
                    className="w-24"
                    id="fechamento"
                    min={1}
                    max={31}
                    {...field}
                    mask="DiaSemana"
                    inputMode="numeric"
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-40 sm:w-48 items-end">
              <Label title="Vencimento" htmlFor="vencimento" />
              <Controller
                name="vencimento"
                control={control}
                rules={{ required: true, min: 1, max: 31 }}
                render={({ field }) => (
                  <Input
                    type="number"
                    className="w-24"
                    id="vencimento"
                    {...field}
                    mask="DiaSemana"
                    inputMode="numeric"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  sm:flex-row justify-between">
            <div className="flex flex-col  ">
              <Label title="Limite Total" htmlFor="limiteTotal" />
              <Controller
                name="limiteTotal"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    className="w-32"
                    type="text"
                    id="limiteTotal"
                    {...field}
                    mask="MoedaBR"
                    inputMode="numeric"
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-40 sm:w-48 items-end">
              <Label title="Limite Disponível" htmlFor="limiteDisponivel" />
              <Controller
                name="limiteDisponivel"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    className="w-32"
                    type="text"
                    id="limiteDisponivel"
                    {...field}
                    mask="MoedaBR"
                    inputMode="numeric"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <button
              className="bg-violet-700 w-28 text-white rounded-md py-2 hover:bg-violet-900 shadow-xl"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default FormCartoes;
