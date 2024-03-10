import { getCompras } from "@/api/Compra";
import DialogCompra from "@/components/Compras/DialogCompra";
import TituloConteudoMain from "@/components/shared/global/TituloConteudoMain";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

const Compras = () => {
  const { data } = useQuery({
    queryKey: ["getCompras"],
    queryFn: () => {
      return getCompras("compras").then((result) => result.data);
    },
  });
  return (
    <>
      <section className="header-compras flex flex-col justify-between">
        <TituloConteudoMain title="Compras" />
        <DialogCompra className=" self-end" title="Cadastrar"></DialogCompra>
      </section>

      <section className="sm:pt-8 pt-5 w-full  ">
        <ul className="w-full flex flex-col gap-3 overflow-y-auto">
          {data &&
            data.map((compra) => (
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
                          <span className="font-semibold">
                            {compra.data.toString()}
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
      </section>
    </>
  );
};

export default Compras;
