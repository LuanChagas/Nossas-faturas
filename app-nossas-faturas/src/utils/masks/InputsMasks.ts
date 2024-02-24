export const diasMes = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }
  const value = parseInt(e.target.value);
  if (value > 31) {
    e.target.value = "31";
  }
};

export const moedaBR = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const valueMask = parseFloat(
    value.replace(/[^\d]/g, "").replace(/(\d{2})$/, ".$1")
  );
  const valueMaskParseFormat = valueMask.toFixed(2);
  const valorFormatado = parseFloat(valueMaskParseFormat).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
  e.target.value = valorFormatado;

  /*
  //const value = 15454301795;
  const value = e.target.value.replace(/[^.-\d]/g, "");
  console.log(value);
  if (value.length === 3) {
    e.target.value = value.replace(/(\d{1})$/, "$1.");
  }
  if (value.length === 7) {
    e.target.value = value.replace(/(\d{1})$/, "$1.");
  }
  if (value.length === 11) {
    e.target.value = value.replace(/(\d{1})$/, "$1-");
  }
  if (value.length > 14) {
    e.target.value = value.replace(/(\d{1})$/, "");
  }

  //e.target.value = value.replace(
  //  /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
  //   "$1.$2.$3-$4"
  // );
  console.log(
    String(value).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
  );
  */
};
