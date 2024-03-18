import { Controller, useForm } from "react-hook-form";
import Input from "../shared/global/Input";
import Label from "../shared/global/Label";
import { formatoMoeda } from "@/utils/masks/ValueMask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { createCompraApi } from "@/api/Compra";
import { removeMoeda } from "@/utils/masks/RemoveMask";
import { useGetUrlQuery, useMutatationCompra } from "@/Hooks/CompraHooks";
import { EAcaoMutationHooks } from "@/types/HooksCustom";

interface FormCompraProps {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;

  compra?: Compra;
}

const FormCompra = ({ closedDialog, compra }: FormCompraProps) => {
  const urlQuery = useGetUrlQuery();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputCompra>({
    defaultValues: {
      id: compra?.id || undefined,
      descricao: compra?.descricao || "",
      valor: compra?.valor ? formatoMoeda(Number(compra?.valor)) : "R$ 0,00",
      parcelas: compra?.parcelas || 1,
      status: compra?.status || 1,
      data_compra: compra?.data_compra || new Date(),
      cartao_id: compra?.cartao.id || undefined,
      loja_id: compra?.loja.id || undefined,
      pessoa_id: compra?.pessoa.id || undefined,
    },
  });

  const mutationCompra = useMutatationCompra(
    urlQuery,
    compra ? createCompraApi : createCompraApi,
    EAcaoMutationHooks.CADASTRAR
  );

  function onSubmit(data: IFormInputCompra) {
    mutationCompra.mutate({ ...data, valor: removeMoeda(data.valor) });
    closedDialog(false);
  }
  return (
    <section className="h-[70vh] sm:h-full overflow-auto">
      {errors.descricao && <span>Descrição é obrigatória</span>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <Label title="Descrição" htmlFor="descricao"></Label>
        <Controller
          name="descricao"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input type="text" id="descricao" {...field} />
          )}
        />
        <Label title="Valor" htmlFor="valor"></Label>
        <Controller
          name="valor"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              className="w-32"
              type="text"
              id="valor"
              mask="MoedaBR"
              inputMode="numeric"
              {...field}
            />
          )}
        />
        <Label title="Parcelas" htmlFor="parcelas "></Label>
        <Controller
          name="parcelas"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                field.onChange(Number(e));
              }}
            >
              <SelectTrigger className="w-80 border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a quantidade de parcelas" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Label title="Data da compra" htmlFor="data_compra"></Label>
        <Controller
          name="data_compra"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP", { locale: ptBR })
                  ) : (
                    <span>Data da compra</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(e) => {
                    if (e) field.onChange(e);
                  }}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <Label title="Cartão" htmlFor="cartao_id"></Label>
        <Controller
          name="cartao_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                field.onChange(Number(e));
              }}
              name="cartao_id"
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione o cartão" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="1">cartao 1</SelectItem>
                <SelectItem value="2">cartao 2</SelectItem>
                <SelectItem value="3">cartao 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Label title="Loja" htmlFor="loja"></Label>
        <Controller
          name="loja_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                field.onChange(Number(e));
              }}
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a loja" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="1">Loja 1</SelectItem>
                <SelectItem value="2">Loja 2</SelectItem>
                <SelectItem value="3">Loja 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Label title="Pessoa" htmlFor="pessoa"></Label>
        <Controller
          name="pessoa_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                field.onChange(Number(e));
              }}
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a pessoa" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="49">pessoa 1</SelectItem>
                <SelectItem value="51">pessoa 2</SelectItem>
                <SelectItem value="52">pessoa 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
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

export default FormCompra;
