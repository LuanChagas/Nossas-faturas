import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryLojaHook = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<LojaPaginated>>
) => {
  const {
    data,
    isLoading,
    isError,
    error: errorLoja,
  } = useQuery({
    queryKey: [key, url],
    queryFn: () => requestApi(url).then((response) => response.data),
  });
  const dataLoja = data;
  const isLoadingLoja = isLoading;
  const isErrorLoja = isError;
  return { dataLoja, isLoadingLoja, isErrorLoja, errorLoja };
};
