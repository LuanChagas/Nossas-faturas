import { useGetUrlQuery } from "@/Hooks/Compra/UseGetUrlQuery";
import { getCompras } from "@/api/Compra";
import DialogCompra from "@/components/Compras/DialogCompra";
import PaginationShared from "@/components/shared/global/PaginationShared";
import TituloConteudoMain from "@/components/shared/global/TituloConteudoMain";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandleAxiosError } from "@/utils/handles/HandleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Compras = () => {
  const urlQuery = useGetUrlQuery();
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["getCompras", urlQuery],
    queryFn: async () => {
      console.log(await getCompras(urlQuery).then((result) => result.data));
      return getCompras(urlQuery).then((result) => result.data);
    },
  });

  if (error) {
    HandleAxiosError(error, navigate);
  }
  return (
    <>
      <section className="header-compras flex flex-col justify-between">
        <TituloConteudoMain title="Compras" />
        <DialogCompra className=" self-end" title="Cadastrar"></DialogCompra>
      </section>

      <section className="sm:pt-8 pt-2 w-full  flex flex-col gap-4">
        <ul className="w-full flex flex-col gap-2 overflow-y-auto">
          {data?.items &&
            data.items.map((compra) => (
              <li className="flex flex-col gap-2" key={compra.id}>
                <div className="flex justify-between items-center">
                  <div className="secao-esquerda flex gap-2">
                    <div className=" flex items-center gap-5">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="informacoes">
                      <h3 className="text-lg">{compra.pessoa.nome}</h3>
                      <div className="text-xs">
                        <h4>{compra.descricao}</h4>
                        <h4>
                          Data da compra:
                          <span className="font-semibold align">
                            {compra.data_compra.toString()}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="secao-direita flex gap-3 items-center">
                    <h2 className="text-red-600">R$ {compra.valor} </h2>
                    <DialogCompra
                      title="Editar"
                      className="  self-end"
                      compra={compra}
                    ></DialogCompra>
                  </div>
                </div>
                <hr />
              </li>
            ))}
        </ul>
        {data?.links && data.meta && (
          <PaginationShared
            meta={data.meta}
            links={data.links}
            baseUrl="compras"
          />
        )}
      </section>
    </>
  );
};

export default Compras;
