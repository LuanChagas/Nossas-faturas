import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompra } from './compra.validation';

@Controller('compra')
export class CompraController {
  constructor(private compraService: CompraService) {}
  @Get('compras')
  async getCompras(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

    return await this.compraService.getCompras({
      page,
      limit,
      route: 'compras',
    });
  }
  @Post()
  @UsePipes(ValidationPipe)
  async criarCompra(@Body() createCompra: CreateCompra) {
    const compra = await this.compraService.criarCompra(createCompra);
    return {
      message: 'Compra criada com sucesso!',
      id: compra.id,
      statusCode: 201,
    };
  }
}
