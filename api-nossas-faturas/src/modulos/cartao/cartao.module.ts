import { Module } from '@nestjs/common';

import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from './cartao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cartao])],
  controllers: [CartaoController],
  providers: [CartaoService],
  exports: [CartaoService],
})
export class CartaoModule {}
