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
import { PessoaService } from './pessoa.service';

import { Response } from 'express';
import { CreatePessoa, UpdatePessoa } from './pessoa.validation';

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}
  @Get('pessoas')
  async getPessoas(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.pessoaService.getPessoasPaginate({
      page,
      limit,
      route: 'pessoas',
    });
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createPessoa(@Body() pessoa: CreatePessoa) {
    const id = await this.pessoaService.createPessoa(pessoa);
    return { message: 'Pessoa criada com sucesso!', id, statusCode: 201 };
  }
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updatePessoa(
    @Param('id') id: number,
    @Body() pessoa: UpdatePessoa,
    @Res() response: Response,
  ) {
    const retorno = await this.pessoaService.updatePessoa(id, pessoa);
    if (retorno.affected === 0) {
      throw new NotFoundException('Pessoa não encontrada!');
    }
    return response.json({
      message: 'Pessoa atualizada com sucesso!',
      statusCode: 200,
    });
  }
  @Delete(':id')
  @UsePipes(ValidationPipe)
  async deletePessoa(@Param('id') id: number, @Res() response: Response) {
    await this.pessoaService.deletePessoa(id);
    return response
      .status(200)
      .json({ message: 'Pessoa deletada com sucesso', statusCode: 200 });
  }
}
