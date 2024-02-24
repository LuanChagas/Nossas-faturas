import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './pessoa.entity';
import { PessoaController } from './pessoa.controller';

@Module({
  providers: [PessoaService],
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoaController],
})
export class PessoaModule {}
