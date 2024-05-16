import { Module } from '@nestjs/common';
import { AutenticacaoController } from './Autenticacao.controller';
import { AutenticacaoService } from './Autenticacao.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_JWT'),
        signOptions: { expiresIn: '5m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [JwtModule],
})
export class AutenticacaoModule {}
