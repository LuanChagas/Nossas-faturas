import { IdCardIcon } from "@radix-ui/react-icons";
import { BackpackIcon, FileText, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ItensNavegacaoProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItensNavegacao = ({ setOpen }: ItensNavegacaoProps) => {
  return (
    <>
      <section className="flex flex-col h-full justify-between py-14 w-full pl-5">
        <ul className=" flex flex-col gap-5 items-center w-full">
          <li className="flex w-full justify-start ">
            <div>
              <HomeIcon />
            </div>
            <div className="pl-3">
              <span>DashBoard</span>
            </div>
          </li>
          <li className="flex w-full justify-start">
            <div>
              <BackpackIcon />
            </div>

            <div className="pl-3 ">
              <span> Compras</span>
            </div>
          </li>
          <li className="flex w-full justify-start">
            <div>
              <FileText />
            </div>

            <div className="pl-3 w-full">
              <span>Relatórios</span>
            </div>
          </li>
          <li className="flex w-full justify-start">
            <Link
              to={"cadastro"}
              className="flex justify-between"
              onClick={() => setOpen(!open)}
            >
              <div>
                <IdCardIcon height={24} width={24} />
              </div>
              <div className="pl-3 w-full">
                <span>Cadastros</span>
              </div>
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-5 items-center pt-14 pb-3">
          <li className="flex w-full justify-start ">
            <span>Logout</span>
          </li>

          <li className="flex w-full justify-start">
            <span>Configurações</span>
          </li>
          <li className="flex w-full justify-start">
            <p className="text-[.8rem] text-center">By Luan Chagas</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ItensNavegacao;
