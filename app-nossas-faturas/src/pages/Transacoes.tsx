import { getTransacoes } from "@/api/Transacoes";
import TituloConteudoMain from "@/components/shared/global/TituloConteudoMain";
import DialogTransacoes from "@/components/transacoes/DialogTransacoes";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HandleAxiosError } from "@/utils/handles/HandleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transacoes = () => {
  const [filtro, setFiltro] = useState<FiltroTransacoes>({
    cartoes: [],
    pessoas: [],
    fatura: "",
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["getTransacoes", filtro],
    queryFn: async () => {
      console.log("dez");
      return getTransacoes(filtro).then((result) => result.data);
    },
  });

  if (error) {
    HandleAxiosError(error, navigate);
  }

  function getTransacoesComFiltro(dados: FiltroTransacoes) {
    setFiltro(dados);
  }

  return (
    <>
      <section className="header-transacoes flex flex-col justify-between">
        <TituloConteudoMain title="Transações" />
        <DialogTransacoes
          open={open}
          setOpen={setOpen}
          getTransacoes={getTransacoesComFiltro}
        ></DialogTransacoes>
      </section>

      <section>
        <section className="w-full flex flex-col justify-center gap-2 mt-5">
          <div className="flex">
            <h1>Cartoes: </h1>
            <ul className="ml-3 flex gap-2">
              {filtro.cartoes.length === 0 && (
                <Badge
                  variant="secondary"
                  className="bg-slate-300 text-[11px] text-slate-700"
                >
                  Todos
                </Badge>
              )}

              {filtro.cartoes.length !== 0 &&
                filtro.cartoes.map((cartao) => (
                  <Badge
                    key={cartao.id}
                    variant="secondary"
                    className="bg-slate-300 text-[11px] text-slate-700"
                  >
                    {cartao.nome}
                  </Badge>
                ))}
            </ul>
          </div>
          <div className="flex">
            <h1>Pessoas: </h1>
            <ul className="ml-3 flex gap-2">
              {filtro.pessoas.length === 0 && (
                <Badge
                  variant="secondary"
                  className="bg-slate-300 text-[11px] text-slate-700"
                >
                  Todos
                </Badge>
              )}
              {filtro.pessoas.length !== 0 &&
                filtro.pessoas.map((pessoa) => (
                  <Badge
                    key={pessoa.id}
                    variant="secondary"
                    className="bg-slate-300 text-[11px] text-slate-700"
                  >
                    {pessoa.nome}
                  </Badge>
                ))}
            </ul>
          </div>
          <div className="flex">
            <h1>Fatura:</h1>
            <div className="ml-3">
              {filtro.fatura === "" && (
                <Badge
                  variant="secondary"
                  className="bg-slate-300 text-[11px] text-slate-700"
                >
                  Atual
                </Badge>
              )}
              {filtro.fatura !== "" && (
                <Badge
                  variant="secondary"
                  className="bg-slate-300 text-[11px] text-slate-700"
                >
                  {filtro.fatura}
                </Badge>
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full pt-10">
          {data &&
            data.map((transacoes) => (
              <section
                key={transacoes.cartao.id}
                className="flex flex-col gap-4"
              >
                <h1 className="text-xl">
                  Cartão {transacoes.cartao.nome} - Fatura{" "}
                  {format(transacoes.fatura, "PPP", { locale: ptBR })}
                </h1>
                <section className="sm:pt-4 pt-2 sm:w-[700px] w-full  flex flex-col gap-4  ">
                  <Table className="border border-violet-300 shadow-lg">
                    <TableCaption></TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" text-center">Loja</TableHead>
                        <TableHead className="text-center">Pessoa</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacoes.transacoes.map((transacao, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-center">
                            {transacao.loja}
                          </TableCell>
                          <TableCell className="text-center">
                            {transacao.pessoa}
                          </TableCell>
                          <TableCell className="text-right">
                            R${transacao.valor}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">
                          R${transacoes.total}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </section>
              </section>
            ))}
        </section>
      </section>
    </>
  );
};

export default Transacoes;
