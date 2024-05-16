import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { TokensIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Label from "../shared/global/Label";
import { useQuery } from "@tanstack/react-query";
import { getDadosFiltroTransacoes } from "@/api/Transacoes";
import { Controller, useForm } from "react-hook-form";

interface DialogTransacoesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTransacoes: (filtro: FiltroTransacoes) => void;
}

const DialogTransacoes = ({
  open,
  setOpen,
  getTransacoes,
}: DialogTransacoesProps) => {
  const { handleSubmit, control } = useForm<FiltroTransacoes>({
    defaultValues: {
      cartoes: [],
      pessoas: [],
      fatura: "",
    },
  });

  const onSubmit = (dados: FiltroTransacoes) => {
    getTransacoes(dados);
  };
  const { data } = useQuery({
    queryKey: ["getFiltroTransacoes"],
    queryFn: async () => {
      return getDadosFiltroTransacoes().then((result) => result.data);
    },
  });

  return (
    <section className="self-end ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex ">
            <TokensIcon
              width={23}
              height={23}
              strokeWidth={2}
              className=""
            ></TokensIcon>
          </div>
        </DialogTrigger>
        <DialogContent
          className="rounded-lg p-8 overflow-auto h-screen"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-gray-700 text-2xl">
              Opções de buscas
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col gap-4 ">
              <section className="border-b border-violet-300">
                <div className="text-lg font-normal">Cartões</div>
                <div className="grid grid-cols-2">
                  {data?.cartoes.map((cartao, index) => (
                    <Controller
                      key={cartao.id!}
                      name={`cartoes`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex gap-2 items-baseline">
                          <Checkbox
                            checked={field.value?.some(
                              (value) => value.id === cartao.id
                            )}
                            id={`cartao${index}`}
                            {...field}
                            onCheckedChange={(e) => {
                              return e
                                ? field.onChange([...field.value, cartao])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value.id !== cartao.id
                                    )
                                  );
                            }}
                            value={`${cartao}`}
                          ></Checkbox>
                          <label htmlFor={`cartao${index}`}>
                            {cartao.nome}
                          </label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </section>
              <section className="border-b border-violet-300">
                <div className="text-lg font-normal">Pessoas</div>
                <div className="grid grid-cols-2">
                  {data?.pessoas.map((pessoa, index) => (
                    <Controller
                      key={pessoa.id}
                      name={`pessoas`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex gap-2 items-baseline">
                          <Checkbox
                            checked={field.value?.some(
                              (value) => value.id === pessoa.id
                            )}
                            id={`pessoa${index}`}
                            {...field}
                            onCheckedChange={(e) => {
                              return e
                                ? field.onChange([...field.value, pessoa])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== pessoa
                                    )
                                  );
                            }}
                            value={`${pessoa}`}
                          ></Checkbox>
                          <label htmlFor={`pessoa${index}`}>
                            {pessoa.nome}
                          </label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </section>
              <section className="flex flex-col ">
                <Label title="Fatura"></Label>
                <Controller
                  name="fatura"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger className="w-[180px] border-violet-700 rounded-lg  focus:ring-0 focus:ring-violet-700 ">
                        <SelectValue
                          placeholder="Selecione a Fatura"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent className="">
                        {data?.faturas.map((fatura, index) => (
                          <SelectItem
                            key={index}
                            value={`${fatura}`}
                            className="hover:bg-violet-700 hover:text-white"
                          >
                            {fatura}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </section>
            </section>
            <button
              type="submit"
              className="bg-violet-700 text-white py-2 px-4 rounded-lg mt-3"
            >
              Buscar
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DialogTransacoes;
