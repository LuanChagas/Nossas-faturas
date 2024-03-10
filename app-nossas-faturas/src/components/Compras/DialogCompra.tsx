import { Pencil, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import FormCompra from "./FormCompra";
import { title } from "process";

type DialogCompraProps = {
  className?: string;
  urlQuery?: string;
  compra?: Compra;
  title: string;
};

const DialogCompra = ({
  className,
  urlQuery,
  compra,
  title,
}: DialogCompraProps) => {
  const [open, setOpen] = useState(false);
  const existeData = compra ? true : false;
  return (
    <section className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex ">
            {existeData && (
              <Pencil
                width={23}
                height={23}
                strokeWidth={2}
                className=""
              ></Pencil>
            )}
            {!existeData && (
              <PlusIcon width={32} height={32} strokeWidth={1} className="" />
            )}
          </div>
        </DialogTrigger>
        <DialogContent
          className="rounded-lg p-8 "
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-gray-700 text-2xl">
              {title} Compra
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FormCompra></FormCompra>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DialogCompra;
