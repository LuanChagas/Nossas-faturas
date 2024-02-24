import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Compra } from '../compra/compra.entity';

@Entity({ name: 'lojas' })
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Compra, (compra) => compra.loja)
  compras: Compra[];
}
