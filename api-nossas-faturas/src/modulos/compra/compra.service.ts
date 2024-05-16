import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './compra.entity';

import { FaturaService } from '../fatura/fatura.service';
import { CartaoService } from '../cartao/cartao.service';
import { CreateCompra } from './compra.validation';
import { Fatura } from '../fatura/fatura.entity';
import { executeIfCondicionalPromisse } from 'src/shared/condicional.shared';
import { Cartao } from '../cartao/cartao.entity';
import { FaturaCompra } from '../fatura-compra/fatura-compra.entity';
import { FaturaCompraService } from '../fatura-compra/fatura-compra.service';
import { Pessoa } from '../pessoa/pessoa.entity';
import { EntityManager } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    private readonly faturaService: FaturaService,
    private readonly cartaoService: CartaoService,
    private readonly faturaCompraService: FaturaCompraService,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async criarCompra(createCompra: CreateCompra) {
    await this.faturaService.rotinaFatura();
    const compra = await this.salvarCompra(createCompra);
    const faturaAberta = await this.processarFaturaAberta(compra);
    const dataInicial = new Date(faturaAberta.data);
    const dataFinal = new Date(faturaAberta.data);
    dataFinal.setMonth(dataInicial.getMonth() + compra.parcelas - 1);
    if (compra.parcelas === 1) return compra;
    const { arrayCriarFaturas, arrayUpdateFaturas } =
      await this.distribuirValorPorFaturas(dataInicial, dataFinal, compra);
    const faturasProcessadas = await this.salvarArrayFaturas(
      arrayCriarFaturas,
      arrayUpdateFaturas,
    );
    await this.processarFaturaCompra(faturasProcessadas, compra);
    return compra;
  }

  async editarCompra(compraEdit: CreateCompra) {
    const compra = await this.compraRepository.findOne({
      where: { id: compraEdit.id },
      relations: ['pessoa', 'loja'],
    });
    compra.descricao = compraEdit.descricao;
    compra.loja.id = compraEdit.loja_id;
    compra.pessoa.id = compraEdit.pessoa_id;

    return await this.compraRepository.save(compra);
  }

  async getCompras(options: IPaginationOptions) {
    const queryCompra = this.compraRepository
      .createQueryBuilder('c')
      .select([
        'c.id',
        'c.data_compra',
        'c.descricao',
        'c.valor',
        'c.parcelas',
        'c.status',
      ])
      .innerJoinAndSelect('c.pessoa', 'p', 'c.pessoa_id = p.id')
      .innerJoinAndSelect('c.loja', 'l', 'c.loja_id = l.id')
      .innerJoinAndSelect('c.cartao', 'ca', 'c.cartao_id = ca.id')
      .orderBy('c.id', 'DESC');
    return paginate<Compra>(queryCompra, options);
  }
  private async salvarCompra(createCompra: CreateCompra) {
    const saveCompra = await this.createCompraToSave(createCompra);
    return await this.compraRepository.save(saveCompra);
  }

  private async processarFaturaAberta(compra: Compra) {
    const faturaAberta = await this.faturaService.buscarFaturaAbertaByCartao(
      compra.cartao.id,
    );
    const dataInicial = new Date(faturaAberta.data);
    const dataFinal = new Date(faturaAberta.data);
    dataFinal.setMonth(dataInicial.getMonth() + compra.parcelas - 1);

    faturaAberta.valor_total =
      faturaAberta.valor_total + compra.valor / compra.parcelas;
    this.faturaService.atualizarFatura(faturaAberta);
    const faturaCompraSave = this.criarFaturaCompra(faturaAberta, compra, 1);
    this.faturaCompraService.criarFaturaCompra(faturaCompraSave);
    return faturaAberta;
  }

  private async distribuirValorPorFaturas(
    dataInicial: Date,
    dataFinal: Date,
    compra: Compra,
  ) {
    const valorParcelas = compra.valor / compra.parcelas;
    const numeroParcelas = compra.parcelas;
    const arrayCriarFaturas: Fatura[] = [];
    const arrayUpdateFaturas: Fatura[] = [];

    const faturas = await this.faturaService.buscarFaturasPeriodos(
      compra.cartao.id,
      dataInicial,
      dataFinal,
    );

    for (let i = 1; i < numeroParcelas; i++) {
      const data = new Date(dataInicial);
      data.setMonth(dataInicial.getMonth() + i);
      const fatura = faturas.find(
        (fatura) =>
          fatura.data.getMonth() === data.getMonth() &&
          fatura.data.getFullYear() === data.getFullYear(),
      );
      if (!fatura) {
        const fatura = new Fatura();
        fatura.valor_total = valorParcelas;
        fatura.status = '3';
        fatura.data = new Date(
          data.setDate(Number.parseInt(compra.cartao.dia_fechamento)),
        );
        fatura.cartao = compra.cartao;
        fatura.valor_pago = 0;
        arrayCriarFaturas.push(fatura);
        continue;
      }
      fatura.valor_total = fatura.valor_total + valorParcelas;
      arrayUpdateFaturas.push(fatura);
    }
    return { arrayCriarFaturas, arrayUpdateFaturas };
  }

  private async salvarArrayFaturas(
    arrayCriarFaturas: Fatura[],
    arrayUpdateFaturas: Fatura[],
  ) {
    return await Promise.all([
      executeIfCondicionalPromisse(arrayCriarFaturas.length > 0, () =>
        this.faturaService.criarFaturas(arrayCriarFaturas),
      ),
      executeIfCondicionalPromisse(arrayUpdateFaturas.length > 0, () =>
        this.faturaService.atualizarFaturas(arrayUpdateFaturas),
      ),
    ]);
  }

  private async processarFaturaCompra(
    faturasProcessadas: Fatura[][],
    compra: Compra,
  ) {
    const faturas = this.criarArrayFaturasCriadas(faturasProcessadas);

    const arrayFaturasCompra: FaturaCompra[] = [];
    faturas.sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
    );
    const inicioParcela = 2;
    for (const [i, fatura] of faturas.entries()) {
      const parcela = inicioParcela + i;
      arrayFaturasCompra.push(this.criarFaturaCompra(fatura, compra, parcela));
    }
    return await this.faturaCompraService.criarFaturasCompras(
      arrayFaturasCompra,
    );
  }

  private criarFaturaCompra(fatura: Fatura, compra: Compra, parcela: number) {
    const faturaCompra = new FaturaCompra();
    faturaCompra.compra = compra;
    faturaCompra.fatura = fatura;
    faturaCompra.parcela = `${parcela}/${compra.parcelas}`;
    return faturaCompra;
  }

  private async createCompraToSave(createCompra: CreateCompra) {
    const cartao = await this.cartaoService.getCartaoById(
      createCompra.cartao_id,
    );
    cartao.limite_disponivel = cartao.limite_disponivel - createCompra.valor;
    await this.cartaoService.updateCartao(cartao);
    const compra = new Compra();
    compra.data_compra = new Date(createCompra.data_compra);
    compra.descricao = createCompra.descricao;
    compra.valor = createCompra.valor;
    compra.parcelas = createCompra.parcelas;
    compra.status = createCompra.status;
    compra.pessoa = { id: createCompra.pessoa_id } as Pessoa;
    compra.cartao = cartao;
    compra.loja = { id: createCompra.loja_id } as Cartao;
    return compra;
  }

  private criarArrayFaturasCriadas(resultado: Fatura[][]) {
    if (resultado[0] && resultado[1]) return resultado[0].concat(resultado[1]);
    if (resultado[0] && !resultado[1]) return resultado[0];
    if (!resultado[0] && resultado[1]) return resultado[1];
  }
}
