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

type DialogCompraProps = {
  className?: string;
  urlQuery?: string;
  compra?: Compra;
};

const DialogCompra = ({ className, urlQuery, compra }: DialogCompraProps) => {
  const [open, setOpen] = useState(false);
  const existeData = compra ? true : false;
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
            <DialogTitle className="text-gray-700 text-2xl"></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DialogCompra;
