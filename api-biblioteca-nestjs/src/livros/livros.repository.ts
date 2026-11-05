import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { Emprestimo } from '../emprestimos/emprestimo.entity';
import { Livro } from './livro.entity';

// O repository é o único lugar do módulo que fala com o banco.
@Injectable()
export class LivrosRepository {
  constructor(
    @InjectRepository(Livro)
    private readonly repositorio: Repository<Livro>,
    @InjectRepository(Emprestimo)
    private readonly emprestimosRepositorio: Repository<Emprestimo>,
  ) {}

  // A listagem usa o QueryBuilder porque o filtro de disponível precisa
  // contar os empréstimos em aberto dentro do próprio SQL.
  listar(filtros: {
    categoriaId?: number;
    autorId?: number;
    disponivel?: boolean;
  }) {
    const consulta = this.repositorio.createQueryBuilder('livro');

    if (filtros.categoriaId) {
      consulta.andWhere('livro.categoriaId = :categoriaId', {
        categoriaId: filtros.categoriaId,
      });
    }

    if (filtros.autorId) {
      consulta.andWhere('livro.autorId = :autorId', {
        autorId: filtros.autorId,
      });
    }

    if (filtros.disponivel) {
      // o livro tem exemplar livre quando a quantidade que está na estante
      // é maior do que a quantidade de empréstimos ainda em aberto
      consulta.andWhere(
        `livro.exemplares > (
           SELECT COUNT(*) FROM emprestimos e
           WHERE e.livro_id = livro.id AND e."dataDevolucao" IS NULL
         )`,
      );
    }

    return consulta.orderBy('livro.titulo', 'ASC').getMany();
  }

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id: id });
  }

  // o detalhe precisa trazer o autor e a categoria junto, por isso o relations
  buscarComAutorECategoria(id: number) {
    return this.repositorio.findOne({
      where: { id: id },
      relations: { autor: true, categoria: true },
    });
  }

  criar(dados: {
    titulo: string;
    ano: number;
    exemplares: number;
    autorId: number;
    categoriaId: number;
  }) {
    const livro = this.repositorio.create(dados);
    return this.repositorio.save(livro);
  }

  salvar(livro: Livro) {
    return this.repositorio.save(livro);
  }

  remover(livro: Livro) {
    return this.repositorio.remove(livro);
  }

  // usado pela regra R6: conta quantos empréstimos desse livro ainda estão abertos
  contarEmprestimosEmAberto(livroId: number) {
    return this.emprestimosRepositorio.count({
      where: { livroId: livroId, dataDevolucao: IsNull() },
    });
  }
}
