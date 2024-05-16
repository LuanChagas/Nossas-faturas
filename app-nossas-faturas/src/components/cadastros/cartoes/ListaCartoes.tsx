import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ListaCadastros from "../../shared/Cadastros/ListaCadastros";

import AlertDelete from "@/components/shared/global/AlertDelete";
import { formatoMoeda } from "@/utils/masks/ValueMask";
import { EAcaoMutationHooks } from "@/types/HooksCustom";
import { deleteCartaoApi } from "@/api/CartaoApi";
import PaginationShared from "@/components/shared/global/PaginationShared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogFormsCadastro from "@/components/shared/Cadastros/DialogFormsCadastro";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutatationCartoes } from "@/Hooks/Cartao/UseMutationCartao";

interface cartoesProps {
  data?: CartaoPaginated;
  cartoes: Cartao[] | undefined;
  isError: boolean;
  isLoading: boolean;
  setUrlQuery: React.Dispatch<React.SetStateAction<string>>;
  urlQuery: string;
}

const ListaCartoes = ({
  data,
  cartoes,
  isError,
  isLoading,
  setUrlQuery,
  urlQuery,
}: cartoesProps) => {
  const mutation = useMutatationCartoes(
    urlQuery,
    deleteCartaoApi,
    EAcaoMutationHooks.EXCLUIR
  );

  function deleteCartao(cartao: Cartao) {
    mutation.mutate(cartao);
  }

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Carregando</h1>;
  return (
    <ListaCadastros>
      {cartoes?.map((cartao) => (
        <li className="flex flex-col gap-2" key={cartao.id}>
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex items-start sm:gap-5 gap-2">
                <Avatar>
                  <AvatarFallback className="bg-violet-700 w-9 h-9"></AvatarFallback>
                </Avatar>
                <div className="flex  gap-5 ">
                  <h3 className="text-2xl">{cartao.nome}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DotsHorizontalIcon
                        width={20}
                        height={20}
                        strokeWidth={1}
                        className=""
                      ></DotsHorizontalIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Informações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex flex-col items-start">
                        <span className="text-[12px]">PIX: {cartao.pix}</span>
                        <span className="text-[12px]">
                          Fechamento: {cartao.dia_fechamento}
                        </span>
                        <span className="text-[12px]">
                          Vencimento: {cartao.dia_vencimento}
                        </span>
                        <span className="text-[12px]">
                          Limite Total: {formatoMoeda(cartao.limite_total)}
                        </span>
                        <span className="text-[12px]">
                          Limite parcial:
                          {formatoMoeda(cartao.limite_disponivel)}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-row-reverse md:flex-row align-top">
              <DialogFormsCadastro
                urlQuery={urlQuery}
                className="flex  "
                componentOpen={3}
                title="Editar Cartão"
                cartao={cartao}
              ></DialogFormsCadastro>

              <AlertDelete
                descricao={`o Cartao ${cartao.nome}`}
                onConfirm={() => deleteCartao(cartao)}
              ></AlertDelete>
            </div>
          </div>
          <hr />
        </li>
      ))}
      {data?.links && data.meta && (
        <PaginationShared
          setUrlQuery={setUrlQuery}
          baseUrl="cartoes"
          meta={data.meta}
          links={data.links}
        ></PaginationShared>
      )}
    </ListaCadastros>
  );
};

export default ListaCartoes;
