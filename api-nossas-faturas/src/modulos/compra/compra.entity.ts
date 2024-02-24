import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Fatura } from '../fatura/fatura.entity';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Loja } from '../loja/loja.entity';
import { Cartao } from '../cartao/cartao.entity';

@Entity({ name: 'compras' })
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data_compra: Date;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @Column()
  parcelas: number;

  @Column()
  status: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.compras)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @ManyToOne(() => Loja, (loja) => loja.compras)
  @JoinColumn({ name: 'loja_id' })
  loja: Loja;

  @ManyToOne(() => Cartao, (cartao) => cartao.compras)
  @JoinColumn({ name: 'cartao_id' })
  cartao: Cartao;

  @ManyToMany(() => Fatura, (fatura) => fatura.compras)
  @JoinTable({
    name: 'fatura_compra',
    joinColumn: { name: 'compra_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fatura_id', referencedColumnName: 'id' },
  })
  faturas: Fatura[];
}
