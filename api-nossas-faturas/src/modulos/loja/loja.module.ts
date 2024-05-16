import { Module } from '@nestjs/common';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './loja.entity';
import { LojaService } from './loja.service';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loja]), AutenticacaoModule],
  controllers: [LojaController],
  providers: [LojaService],
  exports: [LojaService],
})
export class LojaModule {}
