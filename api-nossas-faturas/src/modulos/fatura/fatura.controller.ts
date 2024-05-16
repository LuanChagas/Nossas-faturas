import { Controller, Get, UseGuards } from '@nestjs/common';
import { FaturaService } from './fatura.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';

@Controller('fatura')
@UseGuards(JwtAuthGuard)
export class FaturaController {
  constructor(private faturaService: FaturaService) {}
  @Get('faturas')
  async getFaturas() {
    return await this.faturaService.getFaturas();
  }
}
