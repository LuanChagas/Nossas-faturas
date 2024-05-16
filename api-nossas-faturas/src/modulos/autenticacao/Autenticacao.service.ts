import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async criarSenha(senha: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);

    this.entityManager
      .createQueryBuilder()
      .update('usuarios')
      .set({ password: hash })
      .where('id =  1')
      .execute();
  }

  async Login(dados: Login) {
    const [usuario] = await this.buscarUsuario(dados.userName);

    if (!usuario) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!(await bcrypt.compare(dados.password, usuario.password))) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { userName: usuario.user_name };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async buscarUsuario(userName: string) {
    return (await this.entityManager.query(
      `
      SELECT user_name, password
      FROM usuarios
      WHERE user_name = $1
    `,
      [userName],
    )) as Usuario[];
  }
}
