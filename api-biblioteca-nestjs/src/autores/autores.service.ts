import { Injectable, NotFoundException } from '@nestjs/common';

import { AutoresRepository } from './autores.repository';
import { CriarAutorDto } from './dto/criar-autor.dto';

// O service é onde ficam as regras. Ele não sabe nada de HTTP.
@Injectable()
export class AutoresService {
  constructor(private readonly autoresRepository: AutoresRepository) {}

  async listar() {
    return await this.autoresRepository.listar();
  }

  async criar(dados: CriarAutorDto) {
    return await this.autoresRepository.criar(dados.nome);
  }

  // o módulo de livros usa esse método pra confirmar que o autor existe
  async buscarOuErro(id: number) {
    const autor = await this.autoresRepository.buscarPorId(id);

    if (!autor) {
      throw new NotFoundException(`Autor ${id} não encontrado`);
    }

    return autor;
  }
}
