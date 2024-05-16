import ErrosInputs from "@/components/shared/global/ErrosInputs";
import Input from "@/components/shared/global/Input";
import Label from "@/components/shared/global/Label";
import { AuthContext } from "@/contexts/AuthContext";

import { CSSProperties, useContext } from "react";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const estiloTitulo: CSSProperties = {
  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  fontFamily: "Poppins",
  fontWeight: "600",
  lineHeight: "110%",
  letterSpacing: "-4px",
  background: "linear-gradient(263deg, #9130F4 21.05%, #4646F9 77.63%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const Login = () => {
  const estilo = estiloTitulo;

  const { loginContext, setIsAutenticado } = useContext(AuthContext);
  setIsAutenticado(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ usuario: string; password: string }>({
    defaultValues: {
      usuario: "",
      password: "",
    },
  });
  const onSubmit = async (dadosUsuario: {
    usuario: string;
    password: string;
  }) => {
    const autenticado = await loginContext(dadosUsuario);
    console.log(autenticado);
    autenticado ? navigate("/menu") : false;
  };

  return (
    <section className=" h-dvh flex sm:flex-row flex-col justify-between gap-10 sm:gap-0 items-center w-full bg-gradient-to-tl from-[#21294e] to-[#410077]  sm:bg-slate-50 sm:from-transparent sm:to-transparent">
      <section className="flex flex-col sm:h-full  items-start sm:items-center  sm:w-9/12 sm:bg-gradient-to-tl from-[#21294e] to-[#410077] sm:shadow-md px-2 pt-5 sm:pt-0">
        <div className="hidden sm:flex items-start w-full ">
          <a
            href="https://github.com/LuanChagas"
            target="_blank"
            className="flex items-center gap-3"
          >
            <img src="/assets/icons/github.png" alt="" />
            <span className="sm:text-slate-50">Dev {"->"} Luanchagas</span>
          </a>
        </div>
        <div className="flex flex-col sm:justify-center sm:h-full">
          <h1 style={estilo} className="text-5xl ">
            Nossas Faturas
          </h1>
          <h2 className="text-slate-50 text-2xl">Não atrase a conta</h2>
        </div>
      </section>

      <section className="flex flex-col sm:h-full items-center justify-center w-full gap-2 px-2  sm:pt-0">
        <span className="text-slate-50 text-xl sm:text-slate-900">
          Entre com o nome de usuário e senha para entrar
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border rounded-xl  sm:shadow-xl w-96  py-10 px-5 sm:p-7  shadow-violet-200 gap-1 bg-slate-50"
        >
          <Controller
            name="usuario"
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  id="usuario"
                  {...field}
                  placeholder="Digite o nome do seu usuário"
                />
              );
            }}
          />
          {errors.usuario?.type === "required" && (
            <ErrosInputs title="Usuário é obrigatório" />
          )}

          <Label
            title="Senha:"
            htmlFor="password"
            className=" text-slate-900"
          />
          <Controller
            name="password"
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              return <Input type="password" id="password" {...field} />;
            }}
          />
          {errors.password?.type === "required" && (
            <ErrosInputs title="Senha é obrigatória" />
          )}
          <div className="flex justify-center w-full pt-5">
            <button
              className="bg-violet-700 w-28 text-white rounded-md py-2 hover:bg-violet-900 shadow-sm  sm:shadow-xl"
              type="submit"
            >
              ACESSAR
            </button>
          </div>
        </form>
      </section>
      <section className="flex w-full justify-center sm:hidden h-20">
        <a
          href="https://github.com/LuanChagas"
          target="_blank"
          className="flex items-center gap-3"
        >
          <img src="/assets/icons/github.png" alt="" />
          <span className="text-slate-50">Dev {"->"} Luanchagas</span>
        </a>
      </section>
    </section>
  );
};
