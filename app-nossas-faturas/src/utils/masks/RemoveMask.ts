export const removeMoeda = (valor: string) => {
  return parseFloat(valor.replace(/[^\d]/g, "").replace(/(\d{2})$/, ".$1"));
};
