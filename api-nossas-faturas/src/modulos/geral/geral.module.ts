import { Module } from '@nestjs/common';
import { GeralController } from './geral.controller';
import { GeralService } from './geral.service';

import { PessoaModule } from '../pessoa/pessoa.module';
import { CartaoModule } from '../cartao/cartao.module';
import { LojaModule } from '../loja/loja.module';

@Module({
  controllers: [GeralController],
  imports: [PessoaModule, CartaoModule, LojaModule],
  providers: [GeralService],
})
export class GeralModule {}
