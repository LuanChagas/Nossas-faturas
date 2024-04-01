import { PessoaModule } from './modulos/pessoa/pessoa.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CartaoModule } from './modulos/cartao/cartao.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { databaseConfig } from './config/database/database.config';
import { FaturaModule } from './modulos/fatura/fatura.module';
import { CompraModule } from './modulos/compra/compra.module';
import { FaturaCompraModule } from './modulos/fatura-compra/fatura-compra.module';
import { LojaModule } from './modulos/loja/loja.module';
import { GeralModule } from './modulos/geral/geral.module';
import { TransacaoModule } from './modulos/transacao/transacao.module';

@Module({
  imports: [
    PessoaModule,
    CartaoModule,
    TypeOrmModule.forRoot(databaseConfig),
    FaturaModule,
    CompraModule,
    FaturaCompraModule,
    LojaModule,
    GeralModule,
    TransacaoModule,
  ],

  providers: [AppService],
})
export class AppModule {}
