import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryCartao = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<CartaoPaginated>>
) => {
  const {
    data: dataCartao,
    isLoading: isLoadingCartao,
    isError: isErrorCartao,
    error: errorCartao,
  } = useQuery({
    queryKey: [key, url],
    queryFn: () =>
      requestApi(url).then((response) => {
        return response.data;
      }),
  });
  return { dataCartao, isLoadingCartao, isErrorCartao, errorCartao };
};
