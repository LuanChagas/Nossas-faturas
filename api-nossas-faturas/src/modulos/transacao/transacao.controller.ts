import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransacaoService } from './transacao.service';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Get('filtro')
  async filtroTransacoes() {
    const dados = await this.transacaoService.filtroTransacoes();
    return {
      cartoes: dados.cartoes,
      pessoas: dados.pessoas,
      faturas: dados.faturas,
    };
  }

  @Post('')
  async getTransacoes(@Body() filtro: FiltroBody) {
    return this.transacaoService.getTransacoes(filtro);
  }
}
