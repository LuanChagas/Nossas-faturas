import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CreatePessoa, UpdatePessoa } from './pessoa.validation';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa) private pessoaRepository: Repository<Pessoa>,
  ) {}
  getPessoas(options: IPaginationOptions) {
    return paginate<Pessoa>(this.pessoaRepository, options, {
      order: { id: 'DESC' },
    });
  }
  async createPessoa(pessoa: CreatePessoa) {
    return (await this.pessoaRepository.save(pessoa)).id;
  }
  async updatePessoa(id: number, pessoa: UpdatePessoa) {
    const pessoaAtualizada = this.pessoaRepository.update(id, pessoa);
    return pessoaAtualizada;
  }

  async deletePessoa(id: number) {
    this.pessoaRepository.delete(id);
  }
}
