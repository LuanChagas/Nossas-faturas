import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const HandleAxiosError = (
  error: unknown,
  navigate: ReturnType<typeof useNavigate>
) => {
  const erroAxios = error as AxiosError;
  if (
    erroAxios.response?.status === 401 ||
    erroAxios.response?.status === 403
  ) {
    navigate("/login");
  }
};
