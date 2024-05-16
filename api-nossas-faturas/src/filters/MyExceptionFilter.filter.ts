import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const mensagem =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Houve um error interno';
    console.log(exception);
    response.status(status).json({
      statusCode: status,
      mensagem,
      timestamp: new Date().toISOString(),
    });
  }
}
