import { Controller, Get } from '@nestjs/common';
import { GeralService } from './geral.service';

@Controller('geral')
export class GeralController {
  constructor(private geralService: GeralService) {}

  @Get('selectdados')
  async selectDados() {
    const dados = await this.geralService.getSelectDados();

    return {
      cartoes: dados[0],
      pessoas: dados[1],
      lojas: dados[2],
    };
  }
}
