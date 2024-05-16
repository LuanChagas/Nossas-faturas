import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryPessoaHook = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<PessoaPaginated>>
) => {
  url;
  const {
    data: dataPessoa,
    isLoading: isLoadingPessoa,
    isError: isErrorPessoa,
    error: errorPessoa,
  } = useQuery({
    queryKey: [key, url],
    queryFn: () =>
      requestApi(url).then((response) => {
        console.log(response.data.items);
        return response.data;
      }),
  });
  return { dataPessoa, isLoadingPessoa, isErrorPessoa, errorPessoa };
};
