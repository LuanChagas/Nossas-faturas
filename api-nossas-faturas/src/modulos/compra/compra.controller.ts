import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompra } from './compra.validation';

@Controller('compra')
export class CompraController {
  constructor(private compraService: CompraService) {}
  @Get('compras')
  async getCompras() {
    return await this.compraService.getCompras();
  }
  @Post()
  async criarCompra(@Body() createCompra: CreateCompra) {
    const compra = await this.compraService.criarCompra(createCompra);
    return {
      message: 'Compra criada com sucesso!',
      id: compra.id,
      statusCode: 201,
    };
  }
}
