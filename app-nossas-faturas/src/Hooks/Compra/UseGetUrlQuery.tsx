import { useLocation } from "react-router-dom";

export const useGetUrlQuery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const limit = queryParams.get("limit") || "10";
  return `compras?page=${page}&limit=${limit}`;
};
