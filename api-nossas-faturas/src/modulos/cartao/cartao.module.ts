import { Module } from '@nestjs/common';

import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from './cartao.entity';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cartao]), AutenticacaoModule],
  controllers: [CartaoController],
  providers: [CartaoService],
  exports: [CartaoService],
})
export class CartaoModule {}
