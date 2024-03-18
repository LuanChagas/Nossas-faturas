interface Compra {
  id: number;
  descricao: string;
  pessoa: Pessoa;
  loja: Loja;
  cartao: Cartao;
  status: number;
  data_compra: Date;
  valor: number;
  parcelas: number;
}

interface IFormInputCompra {
  id?: number;
  descricao: string;
  pessoa_id: number;
  loja_id: number;
  status: number;
  cartao_id: number;
  data_compra: Date;
  valor: string;
  parcelas: number;
}

interface CreateCompra extends Omit<IFormInputCompra, "valor"> {
  valor: number;
  status: number;
}

interface CompraPaginated {
  items: Compra[];
  meta: MetaPaginated;
  links: LinksPaginated;
}
