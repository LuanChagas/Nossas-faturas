import { Injectable } from '@nestjs/common';

import { CartaoService } from '../cartao/cartao.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { FaturaService } from '../fatura/fatura.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private cartaoService: CartaoService,
    private pessoaService: PessoaService,
    private faturaService: FaturaService,
  ) {}

  async filtroTransacoes() {
    this.faturaService.rotinaFatura();
    return {
      cartoes: await this.cartaoService.getCartoes(),
      pessoas: await this.pessoaService.getPessoas(),
      faturas: await this.faturaService.buscarIntervaloFaturas(),
    };
  }

  async getTransacoes(filtro: FiltroBody) {
    const cartoes = filtro.cartoes.map((cartao) => cartao.id);
    const pessoas = filtro.pessoas.map((pessoa) => pessoa.id);
    const fatura = filtro.fatura;
    const dadosConsulta = await this.buscarTransacoes(cartoes, pessoas, fatura);
    const totais = await this.buscarTotais(cartoes, pessoas, fatura);
    return this.agruparTransacoes(dadosConsulta, totais);
  }

  private async buscarTransacoes(
    cartoes: number[],
    pessoas: number[],
    fatura: string,
  ) {
    const dados = this.entityManager
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
      .innerJoin('pessoas', 'p', 'p.id = c.pessoa_id');

    if (cartoes.length > 0) {
      dados.andWhere('cc.id IN (:...cartoes)', { cartoes });
    }

    if (pessoas.length > 0) {
      dados.andWhere('p.id IN (:...pessoas)', { pessoas });
    }

    if (fatura === '') {
      dados.andWhere("f.status = '2'");
    }

    if (fatura !== '') {
      const data = this.obterMesEAno(fatura);
      dados.andWhere(
        `EXTRACT(MONTH FROM f.data) = ${data.mes} and EXTRACT(YEAR FROM f.data) = ${data.ano}`,
      );
    }
    console.log(dados.getQuery())
    return (await dados.execute()) as Transacao[];
  }

  private async buscarTotais(
    cartoes: number[],
    pessoas: number[],
    fatura: string,
  ) {
    const totais = this.entityManager
      .createQueryBuilder()
      .select(['c.cartao_id as id', 'SUM(c.valor) as total'])
      .from('compras', 'c')
      .innerJoin('fatura_compra', 'fc', 'c.id = fc.compra_id')
      .innerJoin('faturas', 'f', 'f.id = fc.fatura_id')
      .innerJoin('cartoes', 'cc', 'cc.id = c.cartao_id')
      .innerJoin('lojas', 'l', 'l.id = c.loja_id')
      .innerJoin('pessoas', 'p', 'p.id = c.pessoa_id')
      .groupBy('c.cartao_id');

    if (cartoes.length > 0) {
      totais.andWhere('cc.id IN (:...cartoes)', { cartoes });
    }

    if (pessoas.length > 0) {
      totais.andWhere('p.id IN (:...pessoas)', { pessoas });
    }

    if (fatura === '') {
      totais.andWhere("f.status = '2'");
    }

    if (fatura !== '') {
      const data = this.obterMesEAno(fatura);
      totais.andWhere(
        `EXTRACT(MONTH FROM f.data) = ${data.mes} and EXTRACT(YEAR FROM f.data) = ${data.ano}`,
      );
    }

    return (await totais.execute()) as { id: number; total: number }[];
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

  private obterMesEAno(fatura: string) {
    const mes = fatura.charAt(0) + fatura.charAt(1);
    const ano = fatura.slice(3);

    return { mes, ano };
  }
}
