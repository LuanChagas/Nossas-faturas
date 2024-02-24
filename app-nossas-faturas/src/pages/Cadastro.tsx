import { TabsContent } from "@radix-ui/react-tabs";
import TituloConteudoMain from "../components/shared/global/TituloConteudoMain";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListaCartoes from "../components/cadastros/cartoes/ListaCartoes";
import ListaLojas from "../components/cadastros/lojas/ListaLojas";
import React from "react";
import ListaPessoas from "../components/cadastros/pessoas/ListaPessoas";
import DialogCadastroAndEdit from "../components/shared/Cadastros/DialogCadastro";
import { useQueryPessoaHook } from "@/Hooks/PessoaHooks";
import { getPessoasApi } from "@/api/PessoaApi";
import { getLojasApi } from "@/api/lojaApi";
import { useQueryLojaHook } from "@/Hooks/LojaHooks";
import { useQuery } from "@tanstack/react-query";

import { getCartoes } from "@/api/CartaoApi";

const Cadastros = () => {
  const [componentOpen, setComponentOpen] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("Cadastrar Loja");
  const [urlQuery, setUrlQuery] = React.useState<string>("lojas?limit=10");
  const [urlLoja, setUrlLoja] = React.useState<string>("lojas?limit=10");
  const [urlPessoa, setUrlPessoa] = React.useState<string>("pessoas?limit=10");
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

  const { data } = useQuery({
    queryKey: ["getCartoes"],
    queryFn: () =>
      getCartoes("cartoes?limit=10").then((response) => response.data),
  });

  return (
    <>
      <TituloConteudoMain title="Cadastro" />
      <section className="w-full flex flex-col justify-between sm:pt-5 align-middle">
        <DialogCadastroAndEdit
          urlQuery={urlQuery}
          className="flex self-end sm:pb-4 md:pb-0"
          componentOpen={componentOpen}
          title={title}
        ></DialogCadastroAndEdit>
        <Tabs defaultValue="lojas" className="w-full ">
          <TabsList className="md:w-[400px] w-full">
            <TabsTrigger
              value="lojas"
              className="w-full"
              onClick={() => {
                setUrlQuery("lojas?limit=10");
                handleDadosDialog("Cadastrar Loja", 1);
              }}
            >
              Lojas
            </TabsTrigger>
            <TabsTrigger
              value="pessoas"
              className="w-full"
              onClick={() => {
                setUrlQuery("pessoas?limit=10");
                handleDadosDialog("Cadastrar Pessoa", 2);
              }}
            >
              Pessoas
            </TabsTrigger>
            <TabsTrigger
              value="cartoes"
              className="w-full"
              onClick={() => handleDadosDialog("Cadastrar Cartão", 3)}
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
            <ListaCartoes cartoes={data?.items} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Cadastros;
