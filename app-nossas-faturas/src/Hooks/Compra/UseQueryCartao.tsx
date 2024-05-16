import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useQueryCompra = (
  key: string,
  url: string,
  requestApi: (url: string) => Promise<AxiosResponse<CompraPaginated>>
) => {
  const {
    data,
    isLoading,
    isError,
    error: errorCompra,
  } = useQuery({
    queryKey: [key, url],
    queryFn: () =>
      requestApi(url).then((response) => {
        return response.data;
      }),
  });
  return { data, isLoading, isError, errorCompra };
};
