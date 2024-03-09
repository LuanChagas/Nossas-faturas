import { TabsContent } from "@radix-ui/react-tabs";
import TituloConteudoMain from "../components/shared/global/TituloConteudoMain";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListaCartoes from "../components/cadastros/cartoes/ListaCartoes";
import ListaLojas from "../components/cadastros/lojas/ListaLojas";
import React from "react";
import ListaPessoas from "../components/cadastros/pessoas/ListaPessoas";

import { useQueryPessoaHook } from "@/Hooks/PessoaHooks";
import { getPessoasApi } from "@/api/PessoaApi";
import { getLojasApi } from "@/api/lojaApi";
import { useQueryLojaHook } from "@/Hooks/LojaHooks";

import { useQueryCartao } from "@/Hooks/CartaoHooks";
import { getCartoesApi } from "@/api/CartaoApi";
import DialogFormsCadastro from "../components/shared/Cadastros/DialogFormsCadastro";

const Cadastros = () => {
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

  const { dataPessoa, isLoadingPessoa, isErrorPessoa } = useQueryPessoaHook(
    "getPessoas",
    urlPessoa,
    getPessoasApi
  );

  const { dataLoja, isLoadingLoja, isErrorLoja } = useQueryLojaHook(
    "getLojas",
    urlLoja,
    getLojasApi
  );

  const { dataCartao, isLoadingCartao, isErrorCartao } = useQueryCartao(
    "getCartoes",
    urlCartao,
    getCartoesApi
  );

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
