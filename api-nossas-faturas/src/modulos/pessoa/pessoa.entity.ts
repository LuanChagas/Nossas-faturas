import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Compra } from '../compra/compra.entity';
@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Compra, (compra) => compra.pessoa)
  compras: Compra[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
  })
  criado_em: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'now()' })
  atualizado_em: Date;
}
