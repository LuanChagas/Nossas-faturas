import { IsNotEmpty, IsString } from 'class-validator';

export class LojaValidation {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;
}

export class LojaIdValidation extends LojaValidation {
  @IsNotEmpty({ message: 'Id é obrigatório' })
  id: number;
}

export class CreateLoja extends LojaValidation {}

export class UpdateLoja extends LojaIdValidation {}
