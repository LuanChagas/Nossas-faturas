import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as cookie from 'cookie';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const token = cookie.parse(request.headers.cookie)['accessToken'];
      console.log(token);
      const payload = this.jwtService.verify<{ userName: string }>(token);
      request.user = payload.userName;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
