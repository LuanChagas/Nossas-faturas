import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common';

import { AutenticacaoService } from './Autenticacao.service';
import { validarLogin } from './Autenticacao.validation';
import { Response } from 'express';
import { MyExceptionFilter } from 'src/filters/MyExceptionFilter.filter';

@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}
  @Post('login')
  @UseFilters(new MyExceptionFilter())
  async Login(@Body() loginRequest: Login, @Res() res: Response) {
    console.log(loginRequest);
    const validacao = validarLogin(loginRequest);
    if (validacao.error) {
      return res.status(400).json({
        mensagem: validacao.mensagens,
      });
    }

    const data = await this.autenticacaoService.Login(loginRequest);
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 h
    });
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });
    return res.status(200).json({
      mensagem: 'Login efetuado',
    });
  }

  @Get('verificarToken')
  verificar() {}

  @Post('criarsenha')
  criarSenha(@Body() senha: { senha: string }) {
    this.autenticacaoService.criarSenha(senha.senha);
  }
}
