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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLoja, UpdateLoja } from './loja.validation';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';

@Controller('loja')
@UseGuards(JwtAuthGuard)
export class LojaController {
  constructor(private lojaService: LojaService) {}

  @Get('lojas')
  async getLojas(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.lojaService.getLojasPaginate({
      page,
      limit,
      route: 'lojas',
    });
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async createLoja(@Body() loja: CreateLoja) {
    const id = await this.lojaService.createLoja(loja);
    return { message: 'Loja criada com sucesso!', id, statusCode: 201 };
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateLoja(
    @Param('id') id: number,
    @Body() loja: UpdateLoja,
    @Res() response: Response,
  ) {
    const retorno = await this.lojaService.updateLoja(id, loja);
    if (retorno.affected === 0) {
      throw new NotFoundException('Loja não encontrada!');
    }
    return response
      .status(200)
      .json({ message: 'Loja atualizada com sucesso!', statusCode: 200 });
  }

  @Delete(':id')
  async deleteLoja(@Param('id') id: number, @Res() response: Response) {
    await this.lojaService.deleteLoja(id);
    return response
      .status(200)
      .json({ message: 'Loja deletada com sucesso', statusCode: 200 });
  }
}
