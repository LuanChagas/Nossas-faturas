import { Module } from '@nestjs/common';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fatura } from './fatura.entity';
import { CartaoModule } from '../cartao/cartao.module';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fatura]),
    CartaoModule,
    AutenticacaoModule,
  ],
  controllers: [FaturaController],
  providers: [FaturaService],
  exports: [FaturaService],
})
export class FaturaModule {}
