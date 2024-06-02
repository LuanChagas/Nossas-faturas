import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionFilter } from './filters/MyExceptionFilter.filter';
import * as fs from 'fs';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/key.pem'),
    cert: fs.readFileSync('src/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
