import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fatura } from './fatura.entity';
import { CartaoService } from '../cartao/cartao.service';
import { Cartao } from '../cartao/cartao.entity';
import { executeIfCondicionalPromisse } from 'src/shared/condicional.shared';

@Injectable()
export class FaturaService {
  constructor(
    @InjectRepository(Fatura) private faturaRepository: Repository<Fatura>,
    private cartaService: CartaoService,
  ) {}

  async criarFatura(fatura: Fatura) {
    return await this.faturaRepository.save(fatura);
  }

  async criarFaturas(faturas: Fatura[]) {
    return await this.faturaRepository.save(faturas);
  }

  async getFaturas() {
    return await this.faturaRepository.find();
  }

  async buscarFaturaById(id: number) {
    return await this.faturaRepository.findOne({ where: { id: id } });
  }

  async buscarFaturasByCartao(cartaoId: number) {
    return await this.faturaRepository
      .createQueryBuilder('fatura')
      .where('fatura.cartao_id = :cartaoId', { cartaoId: cartaoId })
      .innerJoinAndSelect('fatura.cartao', 'cartao')
      .getMany();
  }

  async buscarFaturasAbertas() {
    return await this.faturaRepository.find({
      where: { status: '2' },

      relations: ['cartao'],
    });
  }

  async buscarProximasFaturas(cartaoId: number[], diaFechamento: string) {
    const dataAtual = new Date();
    const dataFinal = new Date(new Date().setMonth(dataAtual.getMonth() + 1));
    dataFinal.setDate(Number.parseInt(diaFechamento));
    return await this.faturaRepository
      .createQueryBuilder('fatura')
      .innerJoinAndSelect('fatura.cartao', 'cartao')
      .where('fatura.cartao_id in (:...cartaoId)', { cartaoId })
      .andWhere('fatura.status = :status', { status: '3' })
      .andWhere('fatura.data >= :dataAtual', { dataAtual })
      .andWhere('fatura.data <= :dataFinal', { dataFinal })
      .getMany();
  }

  async buscarFaturaAbertaByCartao(cartaoId: number) {
    return await this.faturaRepository
      .createQueryBuilder('fatura')
      .where('fatura.cartao_id = :cartaoId', { cartaoId })
      .andWhere('fatura.status = :status', { status: '2' })
      .getOne();
  }

  async buscarFaturasPeriodos(
    cartaoID: number,
    dataInicial: Date,
    dataFinal: Date,
  ) {
    return await this.faturaRepository
      .createQueryBuilder('fatura')
      .where('fatura.cartao_id = :cartaoID', { cartaoID })
      .andWhere('fatura.data >= :dataInicial', { dataInicial })
      .andWhere('fatura.data <= :dataFinal', { dataFinal })
      .getMany();
  }

  async atualizarFatura(fatura: Fatura) {
    return await this.criarFatura(fatura);
  }

  async atualizarFaturas(faturas: Fatura[]) {
    return await this.criarFaturas(faturas);
  }

  async rotinaFatura() {
    try {
      const cartoes = await this.cartaService.getCartoes();
      const faturas = await this.buscarFaturasAbertas();

      const proximasFaturas = await this.buscarProximasFaturas(
        cartoes.map(({ id }) => id),
        this.acharMaiorDataFechamento(cartoes).dia_fechamento,
      );
      await this.rotinaFecharFatura(cartoes, faturas, proximasFaturas);
    } catch (error) {
      console.log(error);
    }
  }

  async buscarIntervaloFaturas() {
    const dados = (await this.faturaRepository
      .createQueryBuilder('faturas')
      .where(
        "data BETWEEN (CURRENT_DATE - INTERVAL '6 months') AND (CURRENT_DATE + INTERVAL '6 months')",
      )
      .select(
        "LPAD(CAST(EXTRACT(MONTH FROM faturas.data) AS TEXT), 2, '0') || '-' || CAST(EXTRACT(YEAR FROM faturas.data) AS TEXT) as data_fatura",
      )
      .groupBy(
        '  EXTRACT(MONTH FROM faturas.data), EXTRACT(YEAR FROM faturas.data) ',
      )
      .orderBy('EXTRACT(YEAR FROM faturas.data)')
      .getRawMany()) as { data_fatura: string }[];
    return dados.map((dados) => dados.data_fatura);
  }

  private async rotinaFecharFatura(
    cartoes: Cartao[],
    faturas: Fatura[],
    proximasFaturas: Fatura[],
  ) {
    const arrayCriarFaturas: Fatura[] = [];
    const arrayFecharFaturas: Fatura[] = [];
    const arrayAbrirFaturas: Fatura[] = [];
    const dataAtual = new Date();
    for (const cartao of cartoes) {
      this.processarFatura(
        cartao,
        faturas,
        proximasFaturas,
        dataAtual,
        arrayCriarFaturas,
        arrayFecharFaturas,
        arrayAbrirFaturas,
      );
    }
    await Promise.all([
      executeIfCondicionalPromisse(arrayCriarFaturas.length > 0, () =>
        this.criarFaturas(arrayCriarFaturas),
      ),
      executeIfCondicionalPromisse(arrayFecharFaturas.length > 0, () =>
        this.atualizarFaturas(arrayFecharFaturas),
      ),
      executeIfCondicionalPromisse(arrayAbrirFaturas.length > 0, () =>
        this.atualizarFaturas(arrayAbrirFaturas),
      ),
    ]);
  }

  private async processarFatura(
    cartao: Cartao,
    faturas: Fatura[],
    proximasFaturas: Fatura[],
    dataAtual: Date,
    arrayCriarFaturas: Fatura[],
    arrayFecharFaturas: Fatura[],
    arrayAbrirFaturas: Fatura[],
  ) {
    const fatura = this.buscarFaturaCartaoID(faturas, cartao.id);
    if (!fatura) {
      const fatura = this.criarFaturaRotina(
        cartao,
        dataAtual,
        this.obterDataFechamento(cartao.dia_fechamento),
      );
      arrayCriarFaturas.push(fatura);
      return;
    }

    const dataFechamento = new Date(fatura.data);
    const faturaProxima = this.buscarFaturaCartaoID(proximasFaturas, cartao.id);
    if (dataAtual >= dataFechamento) {
      fatura.status = '1';
      arrayFecharFaturas.push(fatura);

      if (!faturaProxima) {
        //criar proxima fatura em aberto
        const faturaProxima = this.criarFaturaRotina(
          fatura.cartao,
          dataAtual,
          dataFechamento,
          '2',
        );
        arrayCriarFaturas.push(faturaProxima);
      } else {
        faturaProxima.status = '2';
        arrayAbrirFaturas.push(faturaProxima);
      }
    }
  }

  private criarFaturaRotina(
    cartao: Cartao,
    dataAtual: Date,
    dataFechamento: Date,
    status = '2',
  ) {
    const dataFatura =
      dataAtual < dataFechamento
        ? dataFechamento
        : new Date(dataFechamento.setMonth(dataFechamento.getMonth() + 1));
    const fatura = new Fatura();
    fatura.cartao = cartao;
    fatura.data = dataFatura;
    fatura.status = status;
    fatura.valor_pago = 0;
    fatura.valor_total = 0;
    return fatura;
  }

  private async executeSeNaoVazio(
    condicao: boolean,
    funcao: () => Promise<any>,
  ) {
    if (condicao) {
      return funcao();
    }
  }

  private obterDataFechamento(diaFechamento: string) {
    const dataAtual = new Date();
    return new Date(
      `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${diaFechamento}`,
    );
  }

  private buscarFaturaCartaoID(faturas: Fatura[], cartaoId: number) {
    return faturas.find(({ cartao: { id } }) => id === cartaoId);
  }

  private acharMaiorDataFechamento(cartoes: Cartao[]) {
    return cartoes.reduce(
      (maiorData, cartao) =>
        Number.parseInt(maiorData.dia_fechamento) >
        Number.parseInt(cartao.dia_fechamento)
          ? maiorData
          : cartao,
      cartoes[0],
    );
  }
}
