import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fatura } from '../fatura/fatura.entity';
import { Compra } from '../compra/compra.entity';

@Entity({ name: 'cartoes' })
export class Cartao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  pix: string;

  @Column()
  dia_fechamento: string;

  @Column()
  dia_vencimento: string;

  @Column()
  limite_total: number;

  @Column()
  limite_disponivel: number;

  @OneToMany(() => Fatura, (fatura) => fatura.cartao)
  faturas: Fatura[];

  @OneToMany(() => Compra, (compra) => compra.cartao)
  compras: Compra[];
}
