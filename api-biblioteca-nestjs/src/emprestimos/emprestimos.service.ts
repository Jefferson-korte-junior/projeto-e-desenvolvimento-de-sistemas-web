import { Injectable, NotFoundException } from '@nestjs/common';

import { dataDeHoje, diferencaEmDias, somarDias } from '../comum/datas';
import { JaDevolvidoExcecao } from '../comum/excecoes/ja-devolvido.excecao';
import { LimiteEmprestimosExcecao } from '../comum/excecoes/limite-emprestimos.excecao';
import { SemExemplarExcecao } from '../comum/excecoes/sem-exemplar.excecao';
import { LeitoresService } from '../leitores/leitores.service';
import { LivrosService } from '../livros/livros.service';
import { CriarEmprestimoDto } from './dto/criar-emprestimo.dto';
import { EmprestimosRepository } from './emprestimos.repository';

// Os números das regras ficam aqui em cima pra ficar fácil de achar e mudar
const DIAS_DE_EMPRESTIMO = 14;
const LIMITE_POR_LEITOR = 3;
const MULTA_POR_DIA_DE_ATRASO = 1;

// É aqui que ficam as regras R1 até R5. Esse service não sabe nada de HTTP.
@Injectable()
export class EmprestimosService {
  constructor(
    private readonly emprestimosRepository: EmprestimosRepository,
    private readonly livrosService: LivrosService,
    private readonly leitoresService: LeitoresService,
  ) {}

  async criar(dados: CriarEmprestimoDto) {
    // se o livro ou o leitor não existirem, esses métodos já estouram o 404
    const livro = await this.livrosService.buscarOuErro(dados.livroId);
    await this.leitoresService.buscarOuErro(dados.leitorId);

    // Regra R1: só empresta se ainda sobrar exemplar na estante.
    // A conta é a quantidade de exemplares menos os empréstimos em aberto.
    const abertosDoLivro =
      await this.emprestimosRepository.contarEmAbertoDoLivro(dados.livroId);

    if (abertosDoLivro >= livro.exemplares) {
      throw new SemExemplarExcecao(dados.livroId);
    }

    // Regra R2: o leitor não pode passar de 3 empréstimos em aberto
    const abertosDoLeitor =
      await this.emprestimosRepository.contarEmAbertoDoLeitor(dados.leitorId);

    if (abertosDoLeitor >= LIMITE_POR_LEITOR) {
      throw new LimiteEmprestimosExcecao(dados.leitorId);
    }

    // Regra R3: a data prevista é a retirada mais 14 dias.
    // Quem calcula é a API, o cliente não manda essa data.
    const dataRetirada = dataDeHoje();
    const dataPrevista = somarDias(dataRetirada, DIAS_DE_EMPRESTIMO);

    return await this.emprestimosRepository.criar({
      livroId: dados.livroId,
      leitorId: dados.leitorId,
      dataRetirada: dataRetirada,
      dataPrevista: dataPrevista,
    });
  }

  async devolver(id: number) {
    const emprestimo = await this.emprestimosRepository.buscarPorId(id);

    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo ${id} não encontrado`);
    }

    // Regra R5: se já tem data de devolução, esse empréstimo já foi fechado
    if (emprestimo.dataDevolucao) {
      throw new JaDevolvidoExcecao(id);
    }

    emprestimo.dataDevolucao = dataDeHoje();

    // Regra R4: cada dia de atraso custa R$ 1,00. A multa fica salva no empréstimo.
    const diasDeAtraso = diferencaEmDias(
      emprestimo.dataPrevista,
      emprestimo.dataDevolucao,
    );

    if (diasDeAtraso > 0) {
      emprestimo.multa = diasDeAtraso * MULTA_POR_DIA_DE_ATRASO;
    } else {
      emprestimo.multa = 0;
    }

    return await this.emprestimosRepository.salvar(emprestimo);
  }

  async listarDoLeitor(leitorId: number, status?: string) {
    // confirma que o leitor existe, senão a resposta é 404
    await this.leitoresService.buscarOuErro(leitorId);

    return await this.emprestimosRepository.listarDoLeitor(
      leitorId,
      status === 'aberto',
    );
  }
}
