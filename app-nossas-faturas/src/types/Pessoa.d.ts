interface Pessoa {
  id?: number;
  nome: string;
}

interface PessoaPaginated {
  items: Loja[];
  meta: MetaPaginated;
  links: LinksPaginated;
}

interface IFormInputsPessoa {
  id?: number;
  nome: string;
}
