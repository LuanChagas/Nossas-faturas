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
      faturas: [
        '2023-01',
        '2023-02',
        '2023-03',
        '2023-04',
        '2023-05',
        '2023-06',
        '2023-07',
        '2023-08',
        '2023-09',
        '2023-10',
        '2023-11',
        '2023-12',
      ],
    };
  }

  @Post('')
  async getTransacoes(@Body() body: any) {
    return this.transacaoService.getTransacoes();
  }
}
