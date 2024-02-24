import ListaCadastros from "../../shared/Cadastros/ListaCadastros";
import PaginationShared from "../../shared/global/PaginationShared";

import DialogCadastroAndEdit from "../../shared/Cadastros/DialogCadastro";

import AlertDelete from "@/components/shared/global/AlertDelete";
import { useMutationLojaHook } from "@/Hooks/LojaHooks";
import { deleteLojaApi } from "@/api/lojaApi";
import { EAcaoMutationHooks } from "@/types/HooksCustom";

interface LojasProps {
  data?: LojaPaginated;
  isLoading?: boolean;
  isError?: boolean;
  setUrlQuery: React.Dispatch<React.SetStateAction<string>>;
  urlQuery: string;
}

const ListaLojas = ({
  data,
  isLoading,
  isError,
  setUrlQuery,
  urlQuery,
}: LojasProps) => {
  const mutation = useMutationLojaHook(
    urlQuery,
    deleteLojaApi,
    EAcaoMutationHooks.EXCLUIR
  );

  function deleteLoja(loja: Loja) {
    mutation.mutate(loja);
  }

  if (isLoading) return <h1>Carregando...</h1>;
  if (isError) return <h1>Erro ao carregar</h1>;
  return (
    <section className="flex flex-col justify-between gap-4 ">
      <ListaCadastros>
        {data?.items.map((loja) => (
          <li key={loja.id} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-2xl">{loja.nome}</h3>
              <div className="flex gap-4 flex-row-reverse md:flex-row align-top">
                <DialogCadastroAndEdit
                  urlQuery={urlQuery}
                  className="flex  "
                  componentOpen={1}
                  title="Editar Loja"
                  loja={loja}
                ></DialogCadastroAndEdit>

                <AlertDelete
                  descricao={`a loja ${loja.nome}`}
                  onConfirm={() => deleteLoja(loja)}
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
          baseUrl="lojas"
          meta={data.meta}
          links={data.links}
        ></PaginationShared>
      )}
    </section>
  );
};

export default ListaLojas;
