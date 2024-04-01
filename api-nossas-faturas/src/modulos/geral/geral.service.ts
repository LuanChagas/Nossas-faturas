import { Injectable } from '@nestjs/common';
import { CartaoService } from '../cartao/cartao.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { LojaService } from '../loja/loja.service';

@Injectable()
export class GeralService {
  constructor(
    private cartaoService: CartaoService,
    private pessoaService: PessoaService,
    private lojaService: LojaService,
  ) {}

  getSelectDados() {
    return Promise.all([
      this.cartaoService.getCartoes(),
      this.pessoaService.getPessoas(),
      this.lojaService.getLojas(),
    ]);
  }
}
