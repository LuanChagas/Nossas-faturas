import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Badge } from "../../ui/badge";
import ListaCadastros from "../../shared/Cadastros/ListaCadastros";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface cartoesProps {
  cartoes: Cartao[] | undefined;
}

const ListaCartoes = ({ cartoes }: cartoesProps) => {
  return (
    <ListaCadastros>
      {cartoes?.map((cartao) => (
        <li className="flex flex-col gap-3" key={cartao.id}>
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex items-start sm:gap-5 gap-2">
                <Avatar>
                  <AvatarFallback className="bg-violet-700 w-9 h-9"></AvatarFallback>
                </Avatar>
                <div className="sm:flex hidden flex-col">
                  <h3 className="text-2xl">{cartao.nome}</h3>
                  <div className="flex md:flex-row  pt-2 gap-1 flex-wrap">
                    <Badge variant="outline" className="text-[11px]">
                      PIX: {cartao.pix}
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      Fechamento: {cartao.dia_fechamento}
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      Vencimento: {cartao.dia_vencimento}
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      Limite Total: R$ {cartao.limite_total}
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      Limite parcial: R$ {cartao.limite_disponivel}
                    </Badge>
                  </div>
                </div>
                <div className="sm:hidden">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-2xl p-0">
                        {cartao.nome}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex md:flex-row   pt-2  flex-wrap">
                          <Badge variant="outline" className="text-[11px]">
                            PIX: {cartao.pix}
                          </Badge>
                          <Badge variant="outline" className="text-[11px]">
                            Fechamento: {cartao.dia_fechamento}
                          </Badge>
                          <Badge variant="outline" className="text-[11px]">
                            Vencimento: {cartao.dia_vencimento}
                          </Badge>
                          <Badge variant="outline" className="text-[11px]">
                            Limite Total: R$ {cartao.limite_total}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[
                            11px
                          ]"
                          >
                            Limite parcial: R$ {cartao.limite_disponivel}
                          </Badge>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            <button className="flex">
              <Pencil
                width={28}
                height={28}
                className="bg-gray-200  rounded-full hover:bg-slate-50 border-4 shadow-md"
              />
            </button>
          </div>
          <hr />
        </li>
      ))}
    </ListaCadastros>
  );
};

export default ListaCartoes;
