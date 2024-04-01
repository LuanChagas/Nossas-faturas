import { Injectable } from '@nestjs/common';

import { CartaoService } from '../cartao/cartao.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { LojaService } from '../loja/loja.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private cartaoService: CartaoService,
    private pessoaService: PessoaService,
    private lojaService: LojaService,
  ) {}

  async filtroTransacoes() {
    return {
      cartoes: await this.cartaoService.getCartoes(),
      pessoas: await this.pessoaService.getPessoas(),
    };
  }

  async getTransacoes() {
    const dados: Transacao[] = await this.entityManager
      .createQueryBuilder()
      .select([
        'l.nome as loja',
        'p.nome as pessoa',
        'fc.parcela as parcela',
        'c.valor as valor',
        'cc.nome as cartao',
        'c.cartao_id as cartao_id',
        'f.data as data_fatura',
      ])
      .from('compras', 'c')
      .innerJoin('fatura_compra', 'fc', 'c.id = fc.compra_id')
      .innerJoin('faturas', 'f', 'f.id = fc.fatura_id')
      .innerJoin('cartoes', 'cc', 'cc.id = c.cartao_id')
      .innerJoin('lojas', 'l', 'l.id = c.loja_id')
      .innerJoin('pessoas', 'p', 'p.id = c.pessoa_id')
      .execute();

    const totais: { id: number; total: number }[] = await this.entityManager
      .createQueryBuilder()
      .select(['c.cartao_id as id', 'SUM(c.valor) as total'])
      .from('compras', 'c')
      .innerJoin('fatura_compra', 'fc', 'c.id = fc.compra_id')
      .innerJoin('faturas', 'f', 'f.id = fc.fatura_id')
      .innerJoin('cartoes', 'cc', 'cc.id = c.cartao_id')
      .innerJoin('lojas', 'l', 'l.id = c.loja_id')
      .innerJoin('pessoas', 'p', 'p.id = c.pessoa_id')
      .groupBy('c.cartao_id')
      .execute();

    return this.agruparTransacoes(dados, totais);
  }

  private agruparTransacoes(
    dados: Transacao[],
    totais: { id: number; total: number }[],
  ): TransacaoAgrupada[] {
    const dadosAgrupado: TransacaoAgrupada[] = [];

    for (const dado of dados) {
      if (dadosAgrupado.length === 0) {
        dadosAgrupado.push({
          cartao: { id: dado.cartao_id, nome: dado.cartao },
          fatura: new Date(dado.data_fatura),
          total: totais[this.getIndexCartaoTotal(totais, dado.cartao_id)].total,
          transacoes: [{ ...dado }],
        });
        continue;
      }
      if (this.existeCartao(dadosAgrupado, dado.cartao_id)) {
        const index = dadosAgrupado.findIndex(
          (dadoAgrupado) => dadoAgrupado.cartao.id === dado.cartao_id,
        );
        dadosAgrupado[index].transacoes.push({ ...dado });
        continue;
      }
      dadosAgrupado.push({
        cartao: { id: dado.cartao_id, nome: dado.cartao },
        fatura: new Date(dado.data_fatura),
        total: totais[this.getIndexCartaoTotal(totais, dado.cartao_id)].total,
        transacoes: [{ ...dado }],
      });
    }

    return dadosAgrupado;
  }

  private getIndexCartaoTotal(
    totais: { id: number; total: number }[],
    id: number,
  ) {
    return totais.findIndex((total) => total.id === id);
  }

  private existeCartao(dadosAgrupado: TransacaoAgrupada[], id: number) {
    return dadosAgrupado.some((dado) => dado.cartao.id === id);
  }
}
