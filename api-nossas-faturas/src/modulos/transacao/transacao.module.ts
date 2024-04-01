import { Module } from '@nestjs/common';
import { TransacaoController } from './transacao.controller';
import { TransacaoService } from './transacao.service';
import { LojaModule } from '../loja/loja.module';
import { CartaoModule } from '../cartao/cartao.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { CompraModule } from '../compra/compra.module';

@Module({
  controllers: [TransacaoController],
  imports: [PessoaModule, CartaoModule, LojaModule, CompraModule],
  providers: [TransacaoService],
})
export class TransacaoModule {}
