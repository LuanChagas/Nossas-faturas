import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ListaCadastros from "../../shared/Cadastros/ListaCadastros";
import React from "react";
import PaginationShared from "@/components/shared/global/PaginationShared";

import AlertDelete from "@/components/shared/global/AlertDelete";
import { useMutationPessoaHook } from "@/Hooks/PessoaHooks";
import { deletePessoaApi } from "@/api/PessoaApi";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import DialogFormsCadastro from "@/components/shared/Cadastros/DialogFormsCadastro";

interface PessoasProps {
  data?: PessoaPaginated;
  isLoading?: boolean;
  isError?: boolean;
  setUrlQuery: React.Dispatch<React.SetStateAction<string>>;
  urlQuery: string;
}

const ListaPessoas = ({
  data,
  isLoading,
  isError,
  setUrlQuery,
  urlQuery,
}: PessoasProps) => {
  const mutation = useMutationPessoaHook(
    urlQuery,
    deletePessoaApi,
    EAcaoMutationHooks.EXCLUIR
  );

  function deletePessoa(pessoa: Pessoa) {
    mutation.mutate(pessoa);
  }

  if (isLoading) return <h1>Carregando...</h1>;
  if (isError) return <h1>Erro ao carregar</h1>;
  return (
    <section className="flex flex-col justify-between gap-4 ">
      <ListaCadastros>
        {data?.items.map((pessoa) => (
          <li key={pessoa.id} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl">{pessoa.nome}</h3>
              </div>
              <div className="flex gap-4 flex-row-reverse md:flex-row align-top">
                <DialogFormsCadastro
                  urlQuery={urlQuery}
                  className="flex  "
                  componentOpen={2}
                  title="Editar Pessoa"
                  pessoa={pessoa}
                ></DialogFormsCadastro>

                <AlertDelete
                  descricao={`a pessoa ${pessoa.nome}`}
                  onConfirm={() => deletePessoa(pessoa)}
                ></AlertDelete>
              </div>
            </div>

            <hr />
          </li>
        ))}
      </ListaCadastros>
      {data?.links && data.meta && (
        <PaginationShared
          setUrlQuery={setUrlQuery}
          baseUrl="pessoas"
          meta={data.meta}
          links={data.links}
        ></PaginationShared>
      )}
    </section>
  );
};

export default ListaPessoas;
