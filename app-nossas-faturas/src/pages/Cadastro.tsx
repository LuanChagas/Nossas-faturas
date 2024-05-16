import { TabsContent } from "@radix-ui/react-tabs";
import TituloConteudoMain from "../components/shared/global/TituloConteudoMain";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListaCartoes from "../components/cadastros/cartoes/ListaCartoes";
import ListaLojas from "../components/cadastros/lojas/ListaLojas";
import React from "react";
import ListaPessoas from "../components/cadastros/pessoas/ListaPessoas";

import { getPessoasApi } from "@/api/PessoaApi";
import { getLojasApi } from "@/api/lojaApi";

import { getCartoesApi } from "@/api/CartaoApi";
import DialogFormsCadastro from "../components/shared/Cadastros/DialogFormsCadastro";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { HandleAxiosError } from "@/utils/handles/HandleAxiosError";
import { useQueryCartao } from "@/Hooks/Cartao/UseQueryCartao";
import { useQueryLojaHook } from "@/Hooks/Loja/UseQueryLoja";
import { useQueryPessoaHook } from "@/Hooks/Pessoa/UseQueryPessoa";

const Cadastros = () => {
  const navigate = useNavigate();
  const [componentOpen, setComponentOpen] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("Cadastrar Loja");
  const [urlQuery, setUrlQuery] = React.useState<string>(
    "lojas?page=1&limit=10"
  );
  const [urlLoja, setUrlLoja] = React.useState<string>("lojas?page=1&limit=10");
  const [urlPessoa, setUrlPessoa] = React.useState<string>(
    "pessoas?page=1&limit=10"
  );
  const [urlCartao, setUrlCartao] = React.useState<string>(
    "cartoes?page=1&limit=10"
  );
  function handleDadosDialog(title: string, component: number) {
    setTitle(title);
    setComponentOpen(component);
  }

  const { dataPessoa, isLoadingPessoa, isErrorPessoa, errorPessoa } =
    useQueryPessoaHook("getPessoas", urlPessoa, getPessoasApi);

  const { dataLoja, isLoadingLoja, isErrorLoja, errorLoja } = useQueryLojaHook(
    "getLojas",
    urlLoja,
    getLojasApi
  );

  const { dataCartao, isLoadingCartao, isErrorCartao, errorCartao } =
    useQueryCartao("getCartoes", urlCartao, getCartoesApi);

  if (isLoadingPessoa || isLoadingLoja || isLoadingCartao)
    return <h1>Carregando...</h1>;

  if (isErrorPessoa || isErrorLoja || isErrorCartao) {
    const erroAxiosCartao = errorCartao as AxiosError;
    const erroAxiosLoja = errorLoja as AxiosError;
    const erroAxiosPessoa = errorPessoa as AxiosError;
    HandleAxiosError(erroAxiosCartao, navigate);
    HandleAxiosError(erroAxiosLoja, navigate);
    HandleAxiosError(erroAxiosPessoa, navigate);
  }

  return (
    <>
      <TituloConteudoMain title="Cadastro" />
      <section className="w-full flex flex-col justify-between sm:pt-5 align-middle">
        <DialogFormsCadastro
          urlQuery={urlQuery}
          className="flex self-end pb-4 md:pb-0"
          componentOpen={componentOpen}
          title={title}
        ></DialogFormsCadastro>
        <Tabs defaultValue="lojas" className="w-full ">
          <TabsList className="md:w-[400px] w-full">
            <TabsTrigger
              value="lojas"
              className="w-full"
              onClick={() => {
                setUrlQuery("lojas?page=1&limit=10");
                handleDadosDialog("Cadastrar Loja", 1);
              }}
            >
              Lojas
            </TabsTrigger>
            <TabsTrigger
              value="pessoas"
              className="w-full"
              onClick={() => {
                setUrlQuery("pessoas?page=1&limit=10");
                handleDadosDialog("Cadastrar Pessoa", 2);
              }}
            >
              Pessoas
            </TabsTrigger>
            <TabsTrigger
              value="cartoes"
              className="w-full"
              onClick={() => {
                setUrlQuery("cartoes?page=1&limit=10");
                handleDadosDialog("Cadastrar Cartão", 3);
              }}
            >
              Cartões
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lojas">
            <ListaLojas
              data={dataLoja}
              isLoading={isLoadingLoja}
              isError={isErrorLoja}
              setUrlQuery={setUrlLoja}
              urlQuery={urlLoja}
            />
          </TabsContent>
          <TabsContent value="pessoas" className="w-full">
            <ListaPessoas
              data={dataPessoa}
              isLoading={isLoadingPessoa}
              isError={isErrorPessoa}
              setUrlQuery={setUrlPessoa}
              urlQuery={urlPessoa}
            />
          </TabsContent>
          <TabsContent value="cartoes">
            <ListaCartoes
              data={dataCartao}
              cartoes={dataCartao?.items}
              isError={isErrorCartao}
              isLoading={isLoadingCartao}
              setUrlQuery={setUrlCartao}
              urlQuery={urlCartao}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Cadastros;
