import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { AtualizarLivroDto } from './dto/atualizar-livro.dto';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { FiltrarLivrosDto } from './dto/filtrar-livros.dto';
import { LivrosRepository } from './livros.repository';

// Todas as regras de livro ficam aqui. Esse service não sabe nada de HTTP.
@Injectable()
export class LivrosService {
  constructor(
    private readonly livrosRepository: LivrosRepository,
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async listar(filtros: FiltrarLivrosDto) {
    return await this.livrosRepository.listar({
      categoriaId: filtros.categoria,
      autorId: filtros.autor,
      // o filtro chega como texto na URL, aqui ele virou verdadeiro ou falso
      disponivel: filtros.disponivel === 'true',
    });
  }

  async buscarDetalhe(id: number) {
    const livro = await this.livrosRepository.buscarComAutorECategoria(id);

    if (!livro) {
      throw new NotFoundException(`Livro ${id} não encontrado`);
    }

    return livro;
  }

  async criar(dados: CriarLivroDto) {
    // se o autor ou a categoria não existirem, esses métodos já estouram o 404
    await this.autoresService.buscarOuErro(dados.autorId);
    await this.categoriasService.buscarOuErro(dados.categoriaId);

    return await this.livrosRepository.criar(dados);
  }

  async atualizar(id: number, dados: AtualizarLivroDto) {
    const livro = await this.buscarOuErro(id);

    if (dados.autorId) {
      await this.autoresService.buscarOuErro(dados.autorId);
    }

    if (dados.categoriaId) {
      await this.categoriasService.buscarOuErro(dados.categoriaId);
    }

    // copia pro livro só os campos que vieram no corpo da requisição
    Object.assign(livro, dados);

    return await this.livrosRepository.salvar(livro);
  }

  async remover(id: number) {
    const livro = await this.buscarOuErro(id);

    // Regra R6: livro que está emprestado com alguém não pode ser excluído
    const emAberto = await this.livrosRepository.contarEmprestimosEmAberto(id);

    if (emAberto > 0) {
      throw new ConflictException(
        `Livro ${id} tem empréstimo em aberto e não pode ser excluído`,
      );
    }

    await this.livrosRepository.remover(livro);
  }

  // o módulo de empréstimos usa esse método pra pegar o livro e confirmar que existe
  async buscarOuErro(id: number) {
    const livro = await this.livrosRepository.buscarPorId(id);

    if (!livro) {
      throw new NotFoundException(`Livro ${id} não encontrado`);
    }

    return livro;
  }
}
