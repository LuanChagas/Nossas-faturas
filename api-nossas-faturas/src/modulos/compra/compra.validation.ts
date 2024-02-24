import { IsNumber, IsString, IsDate } from 'class-validator';

export class CompraValidation {
  @IsNumber()
  valor: number;

  @IsString()
  descricao: string;

  @IsDate()
  data_compra: Date;

  @IsNumber()
  pessoa_id: number;

  @IsString()
  status: string;

  @IsNumber()
  parcelas: number;

  @IsNumber()
  loja_id: number;

  @IsNumber()
  cartao_id: number;
}

export class CreateCompra extends CompraValidation {}
