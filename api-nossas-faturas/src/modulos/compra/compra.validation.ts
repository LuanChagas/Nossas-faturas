import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CompraValidation {
  @IsNumber({}, { message: 'O id deve ser um número' })
  @IsOptional()
  id: number;

  @IsNumber({}, { message: 'O valor deve ser um número' })
  valor: number;

  @IsString({ message: 'A descrição deve ser uma string' })
  descricao: string;

  @IsDateString({}, { message: 'A data da compra deve ser uma data' })
  data_compra: Date;

  @IsNumber({}, { message: 'O id da pessoa deve ser um número' })
  pessoa_id: number;

  @IsNumber({}, { message: 'O status deve ser um número' })
  status: number;

  @IsNumber({}, { message: 'O número de parcelas deve ser um número' })
  parcelas: number;

  @IsNumber({}, { message: 'O id da loja deve ser um número' })
  loja_id: number;

  @IsNumber({}, { message: 'O id do cartão deve ser um número' })
  cartao_id: number;
}

export class CreateCompra extends CompraValidation {}
