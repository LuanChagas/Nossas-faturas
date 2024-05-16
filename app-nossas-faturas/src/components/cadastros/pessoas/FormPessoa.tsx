import Input from "../../shared/global/Input";
import Label from "../../shared/global/Label";
import { Controller, useForm } from "react-hook-form";
import ErrosInputs from "../../shared/global/ErrosInputs";

import { createPessoaApi, updatePessoaApi } from "@/api/PessoaApi";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { useMutationPessoaHook } from "@/Hooks/Pessoa/UseMutationPessoa";

type CadastroPessoaProps = {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  urlQuery: string;
  pessoa?: Pessoa;
};

const FormPessoa = ({
  closedDialog,
  pessoa,
  urlQuery,
}: CadastroPessoaProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsPessoa>({
    defaultValues: {
      id: pessoa?.id || 0,
      nome: pessoa?.nome || "",
    },
  });
  const mutation = useMutationPessoaHook(
    urlQuery,
    pessoa ? updatePessoaApi : createPessoaApi,
    pessoa ? EAcaoMutationHooks.EDITAR : EAcaoMutationHooks.CADASTRAR
  );
  const onSubmit = (data: IFormInputsPessoa) => {
    mutation.mutate(data);
    closedDialog(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 ">
        <Label title="Nome" htmlFor="pessoa" />
        <Controller
          name="nome"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="text" id="pessoa" {...field} />}
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

export default FormPessoa;
