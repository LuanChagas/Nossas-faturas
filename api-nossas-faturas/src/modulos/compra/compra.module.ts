import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './compra.entity';
import { FaturaModule } from '../fatura/fatura.module';
import { CartaoModule } from '../cartao/cartao.module';
import { FaturaCompraModule } from '../fatura-compra/fatura-compra.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compra]),
    FaturaModule,
    CartaoModule,
    FaturaCompraModule,
  ],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
