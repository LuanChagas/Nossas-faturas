interface Compra {
  id: number;
  descricao: string;
  pessoa: Pessoa;
  loja: Loja;
  cartao: Cartao;
  data: Date;
  valor: number;
  parcelas: number;
}

interface IFormInputCompra {
  id: number;
  descricao: string;
  pessoa: number;
  loja: number;
  cartao: number;
  data: Date;
  valor: string;
  parcelas: number;
}
