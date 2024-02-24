import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CartaoValidation {
  @IsNumber({}, { message: 'O id deve ser um número' })
  @IsOptional()
  id: number;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsDefined({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString({ message: 'Pix deve ser uma string' })
  @MaxLength(35, { message: 'Pix deve ter no máximo 35 caracteres' })
  @IsOptional()
  pix: string;

  @IsString({ message: 'Dia de fechamento deve ser uma string' })
  @IsNotEmpty({ message: 'Dia de fechamento é obrigatório' })
  dia_fechamento: string;

  @IsString({ message: 'Dia de vencimento deve ser uma string' })
  @IsNotEmpty({ message: 'Dia de vencimento é obrigatório' })
  dia_vencimento: string;

  @IsNumber({}, { message: 'Limite total deve ser um número' })
  @IsNotEmpty({ message: 'Limite total é obrigatório' })
  limite_total: number;

  @IsNumber({}, { message: 'Limite disponível deve ser um número' })
  limite_disponivel: number;
}

export class CreateCartao extends CartaoValidation {}
export class UpdateCartao extends CartaoValidation {}
