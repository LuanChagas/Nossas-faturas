import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaturaCompra } from './fatura-compra.entity';

@Injectable()
export class FaturaCompraService {
  constructor(
    @InjectRepository(FaturaCompra)
    private readonly faturaCompraRepository: Repository<FaturaCompra>,
  ) {}

  async criarFaturaCompra(faturaCompra: FaturaCompra) {
    return await this.faturaCompraRepository.save(faturaCompra);
  }
  async criarFaturasCompras(faturaCompra: FaturaCompra[]) {
    return await this.faturaCompraRepository.save(faturaCompra);
  }
}
