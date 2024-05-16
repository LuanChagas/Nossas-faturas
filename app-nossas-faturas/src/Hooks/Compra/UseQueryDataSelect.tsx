import { getDadosSelect } from "@/api/SelectData";
import { useQuery } from "@tanstack/react-query";

export const useQueryDataSelect = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["selectData"],
    queryFn: () => getDadosSelect().then((response) => response.data),
  });
  return { data, isLoading, isError };
};
