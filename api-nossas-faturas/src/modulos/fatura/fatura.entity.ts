import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compra } from '../compra/compra.entity';
import { Cartao } from '../cartao/cartao.entity';

@Entity({ name: 'faturas' })
export class Fatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  valor_pago: number;

  @Column()
  valor_total: number;

  @Column()
  status: string;

  @ManyToOne(() => Cartao, (cartao) => cartao.faturas)
  @JoinColumn({ name: 'cartao_id' }) // A coluna no banco de dados que mantém a relação
  cartao: Cartao;

  @ManyToMany(() => Compra, (compra) => compra.faturas)
  compras: Compra[];
}
