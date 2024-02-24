import { Module } from '@nestjs/common';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fatura } from './fatura.entity';
import { CartaoModule } from '../cartao/cartao.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fatura]), CartaoModule],
  controllers: [FaturaController],
  providers: [FaturaService],
  exports: [FaturaService],
})
export class FaturaModule {}
