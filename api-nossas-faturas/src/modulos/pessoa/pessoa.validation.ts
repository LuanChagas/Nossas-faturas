import { IsNotEmpty, IsString } from 'class-validator';

export class PessoaValidation {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;
}

export class CreatePessoa extends PessoaValidation {}
export class UpdatePessoa extends PessoaValidation {}
