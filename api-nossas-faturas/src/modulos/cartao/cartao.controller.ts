import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartaoService } from './cartao.service';
import { Response } from 'express';
import { CreateCartao, UpdateCartao } from './cartao.validation';

@Controller('cartao')
export class CartaoController {
  constructor(private cartaoService: CartaoService) {}
  @Get('cartoes')
  getCartoes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.cartaoService.getCartoesPaginate({
      page,
      limit,
      route: 'cartoes',
    });
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createCartao(@Body() cartao: CreateCartao) {
    const id = await this.cartaoService.createCartao(cartao);
    return { message: 'Cartão criado com sucesso!', id, statusCode: 201 };
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateCartao(
    @Param('id') id: number,
    @Body() cartao: UpdateCartao,
    @Res() response: Response,
  ) {
    cartao.id = id;
    const retorno = await this.cartaoService.updateCartao(cartao);
    if (!retorno) {
      throw new NotFoundException('Cartão não encontrado!');
    }
    return response
      .status(200)
      .json({ message: 'Cartão atualizado com sucesso!', statusCode: 200 });
  }

  @Delete(':id')
  async deleteCartao(
    @Param('id') id: number,
    @Body() cartao: UpdateCartao,
    @Res() response: Response,
  ) {
    await this.cartaoService.deleteCartao(id);
    return response
      .status(200)
      .json({ message: 'Cartão deletado com sucesso!', statusCode: 200 });
  }
}
