import { getRepositoryToken } from '@nestjs/typeorm';
import { Pessoa } from '../pessoa.entity';
import { PessoaService } from '../pessoa.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('PessoaService', () => {
  let pessoaService: PessoaService;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn().mockResolvedValue(['pessoa1', 'pessoa2']),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        {
          provide: getRepositoryToken(Pessoa),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    pessoaService = module.get<PessoaService>(PessoaService);
  });

  it('Deve retornar uma lista de pessoas', async () => {
    expect(await pessoaService.getPessoas()).toEqual(['pessoa1', 'pessoa2']);
    expect(repositoryMock.find).toHaveBeenCalled();
  });
});
