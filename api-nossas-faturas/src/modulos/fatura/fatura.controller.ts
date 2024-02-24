import { Controller, Get } from '@nestjs/common';
import { FaturaService } from './fatura.service';

@Controller('fatura')
export class FaturaController {
  constructor(private faturaService: FaturaService) {}
  @Get('faturas')
  async getFaturas() {
    return await this.faturaService.getFaturas();
  }
}
