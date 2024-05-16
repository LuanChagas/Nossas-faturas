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
import { createCompraApi, updateCompraApi } from "@/api/Compra";
import { removeMoeda } from "@/utils/masks/RemoveMask";

import { EAcaoMutationHooks } from "@/types/HooksCustom";
import React from "react";
import ErrosInputs from "../shared/global/ErrosInputs";
import { useQueryDataSelect } from "@/Hooks/Compra/UseQueryDataSelect";
import { useGetUrlQuery } from "@/Hooks/Compra/UseGetUrlQuery";
import { useMutatationCompra } from "@/Hooks/Compra/UseMutationCompra";

interface FormCompraProps {
  closedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  compra?: Compra;
}

const FormCompra = ({ closedDialog, compra }: FormCompraProps) => {
  const urlQuery = useGetUrlQuery();

  const defaultValues = {
    id: compra?.id || undefined,
    descricao: compra?.descricao || "",
    valor: compra?.valor ? formatoMoeda(Number(compra?.valor)) : "R$ 0,00",
    parcelas: compra?.parcelas || 1,
    status: compra?.status || 1,
    data_compra: compra?.data_compra
      ? new Date(compra.data_compra + "T00:00:00")
      : new Date(),
    cartao_id: compra?.cartao.id || undefined,
    loja_id: compra?.loja.id || undefined,
    pessoa_id: compra?.pessoa.id || undefined,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputCompra>({
    defaultValues,
  });

  const mutationCompra = useMutatationCompra(
    urlQuery,
    compra ? updateCompraApi : createCompraApi,
    EAcaoMutationHooks.CADASTRAR
  );

  function onSubmit(data: IFormInputCompra) {
    mutationCompra.mutate({ ...data, valor: removeMoeda(data.valor) });
    closedDialog(false);
  }

  const { data, isLoading, isError } = useQueryDataSelect();

  if (isError) return <span>Ocorreu um erro ao carregar os dados</span>;
  if (isLoading) return <span>Carregando...</span>;
  return (
    <section className="h-[70vh] sm:h-full overflow-auto">
      <section>
        {errors.descricao && <ErrosInputs title="Nome é obrigatório" />}
        {errors.valor && <ErrosInputs title="Valor é obrigatório" />}
        {errors.parcelas && <ErrosInputs title="Parcelas é obrigatório" />}
        {errors.data_compra && (
          <ErrosInputs title="Data da compra é obrigatório" />
        )}
        {errors.cartao_id && <ErrosInputs title="Cartão é obrigatório" />}
        {errors.loja_id && <ErrosInputs title="Loja é obrigatório" />}
        {errors.pessoa_id && <ErrosInputs title="Pessoa é obrigatório" />}
      </section>

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
              readOnly={compra ? true : false}
              disabled={compra ? true : false}
              className="w-32 
                disabled:text-muted-foreground disabled:opacity-50"
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
              defaultValue={field.value ? field.value.toString() : ""}
              disabled={compra ? true : false}
            >
              <SelectTrigger className="w-80 border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a quantidade de parcelas" />
              </SelectTrigger>
              <SelectContent className="">
                {Array.from({ length: 24 }, (_, i) => i + 1).map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item} <span>parcela(s)</span>
                  </SelectItem>
                ))}
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
                  disabled={compra ? true : false}
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
              disabled={compra ? true : false}
              onValueChange={(e) => {
                field.onChange(Number(e));
              }}
              name="cartao_id"
              defaultValue={field.value ? field.value.toString() : ""}
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione o cartão" />
              </SelectTrigger>
              <SelectContent className="">
                {data?.cartoes &&
                  data?.cartoes.map((cartao) => (
                    <SelectItem key={cartao.id} value={cartao.id!.toString()}>
                      {cartao.nome}
                    </SelectItem>
                  ))}
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
              defaultValue={field.value ? field.value.toString() : ""}
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a loja" />
              </SelectTrigger>
              <SelectContent className="">
                {data?.lojas &&
                  data?.lojas.map((loja) => (
                    <SelectItem key={loja.id} value={loja.id!.toString()}>
                      {loja.nome}
                    </SelectItem>
                  ))}
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
              defaultValue={field.value ? field.value.toString() : ""}
            >
              <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                <SelectValue placeholder="Selecione a pessoa" />
              </SelectTrigger>
              <SelectContent className="">
                {data?.pessoas &&
                  data?.pessoas.map((pessoa) => (
                    <SelectItem key={pessoa.id} value={pessoa.id!.toString()}>
                      {pessoa.nome}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        <div className="flex justify-center pt-5">
          <button
            className="bg-violet-700 w-28 text-white rounded-md py-2 hover:bg-violet-900 shadow-xl"
            type="submit"
          >
            {compra ? "Editar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCompra;
