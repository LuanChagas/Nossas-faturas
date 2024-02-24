interface Loja {
  id?: number;
  nome: string;
}

interface LojaPaginated {
  items: Loja[];
  meta: MetaPaginated;
  links: LinksPaginated;
}

interface IFormInputsLoja {
  id?: number;
  nome: string;
}
