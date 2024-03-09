import Label from "../../shared/global/Label";
import { Controller, useForm } from "react-hook-form";
import ErrosInputs from "../../shared/global/ErrosInputs";
import Input from "../../shared/global/Input";

import { useMutationLojaHook } from "@/Hooks/LojaHooks";
import { createLojaApi, updateLojaApi } from "@/api/lojaApi";
import { EAcaoMutationHooks } from "@/types/HooksCustom";

type CadastroLojaProps = {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loja?: Loja;
  urlQuery: string;
};

const FormLoja = ({ closedDialog, loja, urlQuery }: CadastroLojaProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsLoja>({
    defaultValues: {
      id: loja?.id || 0,
      nome: loja?.nome || "",
    },
  });

  const mutation = useMutationLojaHook(
    urlQuery,
    loja ? updateLojaApi : createLojaApi,
    loja ? EAcaoMutationHooks.EDITAR : EAcaoMutationHooks.CADASTRAR
  );

  const onSubmit = (data: IFormInputsLoja) => {
    mutation.mutate(data);
    closedDialog(false);
  };

  return (
    <section className="flex flex-col gap-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <Label title="Nome" />
        <Controller
          name="nome"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="text" id="loja" {...field} />}
        />
        {errors.nome && <ErrosInputs title="O campo nome é obrigatório" />}
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
  );
};

export default FormLoja;
