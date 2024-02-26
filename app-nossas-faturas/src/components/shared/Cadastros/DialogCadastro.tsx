import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import CadastroLoja from "../../cadastros/lojas/CadastroLoja";
import CadastroPessoa from "../../cadastros/pessoas/CadastroPessoa";
import CadastroCartoes from "../../cadastros/cartoes/CadastroCartoes";

import { Pencil } from "lucide-react";
type DialogCadastroProps = {
  className?: string;
  componentOpen: number;
  title: string;
  loja?: Loja;
  pessoa?: Pessoa;
  cartao?: Cartao;
  urlQuery: string;
};

const DialogCadastroAndEdit = ({
  className,
  componentOpen,
  title,
  loja,
  pessoa,
  cartao,
  urlQuery,
}: DialogCadastroProps) => {
  const [open, setOpen] = React.useState(false);
  const existeData = loja || pessoa || cartao ? true : false;
  return (
    <section className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex ">
            {existeData && (
              <Pencil
                width={30}
                height={30}
                strokeWidth={2}
                className="bg-gray-200  rounded-full hover:bg-slate-50 border-2 shadow-md"
              ></Pencil>
            )}
            {!existeData && (
              <PlusIcon
                width={32}
                height={32}
                strokeWidth={1}
                className="bg-gray-200  rounded-full hover:bg-slate-50 border-2 shadow-md"
              />
            )}
          </div>
        </DialogTrigger>
        <DialogContent
          className="rounded-lg p-8 "
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-gray-700 text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {componentOpen === 1 && (
            <CadastroLoja
              closedDialog={setOpen}
              loja={loja}
              urlQuery={urlQuery}
            />
          )}
          {componentOpen === 2 && (
            <CadastroPessoa
              closedDialog={setOpen}
              pessoa={pessoa}
              urlQuery={urlQuery}
            />
          )}
          {componentOpen === 3 && (
            <CadastroCartoes
              closedDialog={setOpen}
              urlQuery={urlQuery}
              cartao={cartao}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DialogCadastroAndEdit;
