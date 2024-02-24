import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();

// TODO terminar comprar
// TODO salvar comprar no banco
// TODO Salvar na tabela fatura_compra
