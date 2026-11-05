import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';

import { Emprestimo } from './emprestimo.entity';

// O repository é o único lugar do módulo que fala com o banco.
@Injectable()
export class EmprestimosRepository {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly repositorio: Repository<Emprestimo>,
  ) {}

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id: id });
  }

  // empréstimo em aberto é aquele que ainda não tem data de devolução
  contarEmAbertoDoLivro(livroId: number) {
    return this.repositorio.count({
      where: { livroId: livroId, dataDevolucao: IsNull() },
    });
  }

  contarEmAbertoDoLeitor(leitorId: number) {
    return this.repositorio.count({
      where: { leitorId: leitorId, dataDevolucao: IsNull() },
    });
  }

  listarDoLeitor(leitorId: number, somenteAbertos: boolean) {
    const condicoes: FindOptionsWhere<Emprestimo> = { leitorId: leitorId };

    if (somenteAbertos) {
      condicoes.dataDevolucao = IsNull();
    }

    return this.repositorio.find({
      where: condicoes,
      // traz o livro junto pra lista ficar útil de ler
      relations: { livro: true },
      order: { id: 'DESC' },
    });
  }

  criar(dados: {
    livroId: number;
    leitorId: number;
    dataRetirada: string;
    dataPrevista: string;
  }) {
    const emprestimo = this.repositorio.create(dados);
    return this.repositorio.save(emprestimo);
  }

  salvar(emprestimo: Emprestimo) {
    return this.repositorio.save(emprestimo);
  }
}
