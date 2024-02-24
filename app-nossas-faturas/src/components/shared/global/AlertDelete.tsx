import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash } from "lucide-react";

interface AlertDeleteProps {
  descricao: string;
  onConfirm: () => void;
}

const AlertDelete = ({ descricao, onConfirm }: AlertDeleteProps) => {
  return (
    <section className="flex align-top">
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash
            width={30}
            height={30}
            strokeWidth={1}
            className="bg-red-300  rounded-full hover:bg-red-200 border-2 shadow-md"
          ></Trash>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Tem certeza desta decisão?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você deseja excluir {descricao}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-900 hover:bg-red-600"
              onClick={() => {
                onConfirm();
              }}
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AlertDelete;
