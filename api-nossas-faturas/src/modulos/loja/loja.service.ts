import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from './loja.entity';
import { CreateLoja, UpdateLoja } from './loja.validation';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja) private lojaRepository: Repository<Loja>,
  ) {}

  async createLoja(loja: CreateLoja) {
    return (await this.lojaRepository.save(loja)).id;
  }
  async getLojas(options: IPaginationOptions) {
    return paginate<Loja>(this.lojaRepository, options, {
      order: { id: 'DESC' },
    });
  }
  async updateLoja(id: number, loja: UpdateLoja) {
    return await this.lojaRepository.update(id, loja);
  }
  async deleteLoja(id: number) {
    return await this.lojaRepository.delete({ id: id });
  }
}
