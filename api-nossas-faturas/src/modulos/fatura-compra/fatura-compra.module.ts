import { Module } from '@nestjs/common';
import { FaturaCompraController } from './fatura-compra.controller';
import { FaturaCompraService } from './fatura-compra.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaturaCompra } from './fatura-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaturaCompra])],
  controllers: [FaturaCompraController],
  providers: [FaturaCompraService],
  exports: [FaturaCompraService],
})
export class FaturaCompraModule {}
