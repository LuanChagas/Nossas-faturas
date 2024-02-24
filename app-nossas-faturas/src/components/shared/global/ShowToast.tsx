import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { toast } from "../../ui/use-toast";
import {
  randomImagens,
  randomMensagemCadastroOutros,
  randomMensagemErro,
  randomMensagemErroDelete,
} from "@/utils/respostas/ArrayRespostas";
import { Avatar, AvatarImage } from "../../ui/avatar";

export const showToastSucess = (titulo: string) => {
  toast({
    title: titulo,
    description: randomMensagemCadastroOutros(),
    icon: <CheckCircledIcon className="w-5 h-5" color="#15803d" />,
    image: (
      <Avatar className="w-16 h-16">
        <AvatarImage
          src={`../../assets/img/avatar/paoduros/${randomImagens()}`}
        />
      </Avatar>
    ),
  });
};

export const showToastError = (titulo: string, tipoError: number = 1) => {
  const mensagem =
    tipoError === 1 ? randomMensagemErro() : randomMensagemErroDelete();
  toast({
    title: titulo,
    description: mensagem,
    icon: <CrossCircledIcon className="w-6 h-6" color="#ef4444" />,
    image: (
      <Avatar className="w-16 h-16">
        <AvatarImage
          src={`../../assets/img/avatar/paoduros/${randomImagens()}`}
        />
      </Avatar>
    ),
  });
};
