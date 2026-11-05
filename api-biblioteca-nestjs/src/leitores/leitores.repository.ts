import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Leitor } from './leitor.entity';

// O repository é o único lugar do módulo que fala com o banco.
@Injectable()
export class LeitoresRepository {
  constructor(
    @InjectRepository(Leitor)
    private readonly repositorio: Repository<Leitor>,
  ) {}

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id: id });
  }

  buscarPorMatricula(matricula: string) {
    return this.repositorio.findOneBy({ matricula: matricula });
  }

  criar(dados: { nome: string; matricula: string; email: string }) {
    const leitor = this.repositorio.create(dados);
    return this.repositorio.save(leitor);
  }
}
