import { CheckCircledIcon } from "@radix-ui/react-icons";
import Input from "../../shared/global/Input";
import Label from "../../shared/global/Label";
import { toast } from "../../ui/use-toast";
import { Controller, useForm } from "react-hook-form";
import ErrosInputs from "../../shared/global/ErrosInputs";

type CadastroCartoesProps = {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

interface IFormInputs {
  nome: string;
  pix: string;
  fechamento: number | undefined;
  vencimento: number | undefined;
  limiteTotal: number | undefined;
  limiteDisponivel: number | undefined;
}

const CadastroCartoes = ({ closedDialog }: CadastroCartoesProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      nome: "",
      pix: "",
      fechamento: undefined,
      vencimento: undefined,
      limiteTotal: undefined,
      limiteDisponivel: undefined,
    },
  });

  const onSubmit = (data: IFormInputs) => {
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Luan cadastrada(o) com sucesso!",
      icon: <CheckCircledIcon className="w-5 h-5" color="#15803d" />,
    });
    closedDialog(false);
  };

  return (
    <section>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 pt-5"
        >
          <Label title="Nome" htmlFor="nome" />
          <Controller
            name="nome"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="text" id="nome" {...field} />}
          />
          {errors.nome && (
            <ErrosInputs title="Nome é obrigatório" className="w-40" />
          )}

          <Label title="PIX" htmlFor="pix" />
          <Controller
            name="pix"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="text" id="pix" {...field} />}
          />
          {errors.pix && (
            <ErrosInputs title="PIX é obrigatório" className="w-40" />
          )}
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
              {errors.fechamento?.type === "required" && (
                <ErrosInputs title="Campo obrigatório" className="w-32" />
              )}
              {(errors.fechamento?.type === "min" ||
                errors.fechamento?.type === "max") && (
                <ErrosInputs title="Fechamento deve ser maior que 0 e menor que 31" />
              )}
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
              {errors.vencimento?.type === "required" && (
                <ErrosInputs
                  title="Vencimento é obrigatório"
                  className="w-32"
                />
              )}
              {(errors.vencimento?.type === "min" ||
                errors.vencimento?.type === "max") && (
                <ErrosInputs title=" Vencimento deve ser maior que 0 e menor que 31" />
              )}
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
                    type="number"
                    id="limiteTotal"
                    {...field}
                    mask="MoedaBR"
                    inputMode="numeric"
                  />
                )}
              />
              {errors.limiteTotal && (
                <ErrosInputs title="Limite total é obrigatório" />
              )}
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

export default CadastroCartoes;
