import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompra } from './compra.validation';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';

@Controller('compra')
@UseGuards(JwtAuthGuard)
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

  @Patch()
  @UsePipes(ValidationPipe)
  async editarCompra(@Body() compraEdit: CreateCompra) {
    const compra = await this.compraService.editarCompra(compraEdit);
    return {
      message: 'Compra editada com sucesso!',
      id: compra.id,
      statusCode: 200,
    };
  }
}
