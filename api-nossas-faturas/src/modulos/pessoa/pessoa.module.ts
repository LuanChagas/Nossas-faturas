import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './pessoa.entity';
import { PessoaController } from './pessoa.controller';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';

@Module({
  providers: [PessoaService],
  imports: [TypeOrmModule.forFeature([Pessoa]), AutenticacaoModule],
  controllers: [PessoaController],
  exports: [PessoaService],
})
export class PessoaModule {}
