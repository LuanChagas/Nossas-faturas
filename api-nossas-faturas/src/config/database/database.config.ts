import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cartao } from 'src/modulos/cartao/cartao.entity';
import { Compra } from 'src/modulos/compra/compra.entity';
import { FaturaCompra } from 'src/modulos/fatura-compra/fatura-compra.entity';
import { Fatura } from 'src/modulos/fatura/fatura.entity';
import { Loja } from 'src/modulos/loja/loja.entity';
import { Pessoa } from 'src/modulos/pessoa/pessoa.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Cartao, Pessoa, Compra, Loja, FaturaCompra, Fatura],
  logging: false,
};
