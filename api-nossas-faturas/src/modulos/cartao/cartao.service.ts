import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cartao } from './cartao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartao, UpdateCartao } from './cartao.validation';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CartaoService {
  constructor(
    @InjectRepository(Cartao) private cartaoRepository: Repository<Cartao>,
  ) {}
  async getCartoes() {
    return await this.cartaoRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
  getCartoesPaginate(options: IPaginationOptions) {
    return paginate<Cartao>(this.cartaoRepository, options, {
      order: {
        id: 'DESC',
      },
    });
  }
  async createCartao(cartao: CreateCartao) {
    await this.cartaoRepository.save(cartao);
  }

  async updateCartao(cartao: UpdateCartao) {
    return await this.cartaoRepository.save(cartao);
  }

  async getCartaoById(id: number) {
    return await this.cartaoRepository.findOne({ where: { id: id } });
  }

  async deleteCartao(id: number) {
    return await this.cartaoRepository.delete(id);
  }
}
