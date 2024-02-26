export const formatoMoeda = (valor: number) => {
  return Number(valor.toFixed(2)).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
