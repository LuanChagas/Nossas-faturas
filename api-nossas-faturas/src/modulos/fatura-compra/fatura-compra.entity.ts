import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Compra } from '../compra/compra.entity';
import { Fatura } from '../fatura/fatura.entity';

@Entity({ name: 'fatura_compra' })
export class FaturaCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Compra, (compra) => compra.faturas)
  @JoinColumn({ name: 'compra_id' })
  compra: Compra;

  @ManyToOne(() => Fatura, (fatura) => fatura.compras)
  @JoinColumn({ name: 'fatura_id' })
  fatura: Fatura;

  @Column()
  parcela: string;
}
