import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { LeitoresRepository } from './leitores.repository';
import { CriarLeitorDto } from './dto/criar-leitor.dto';

@Injectable()
export class LeitoresService {
  constructor(private readonly leitoresRepository: LeitoresRepository) {}

  async criar(dados: CriarLeitorDto) {
    // dois leitores não podem ter a mesma matrícula
    const jaExiste = await this.leitoresRepository.buscarPorMatricula(
      dados.matricula,
    );

    if (jaExiste) {
      throw new ConflictException(
        `A matrícula ${dados.matricula} já está cadastrada`,
      );
    }

    return await this.leitoresRepository.criar(dados);
  }

  // o módulo de empréstimos usa esse método pra confirmar que o leitor existe
  async buscarOuErro(id: number) {
    const leitor = await this.leitoresRepository.buscarPorId(id);

    if (!leitor) {
      throw new NotFoundException(`Leitor ${id} não encontrado`);
    }

    return leitor;
  }
}
