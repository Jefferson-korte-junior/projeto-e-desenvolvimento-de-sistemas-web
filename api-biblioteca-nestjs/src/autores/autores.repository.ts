import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Autor } from './autor.entity';

// O repository é o único lugar do módulo que fala com o banco.
@Injectable()
export class AutoresRepository {
  constructor(
    @InjectRepository(Autor)
    private readonly repositorio: Repository<Autor>,
  ) {}

  listar() {
    return this.repositorio.find({ order: { nome: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id: id });
  }

  criar(nome: string) {
    const autor = this.repositorio.create({ nome: nome });
    return this.repositorio.save(autor);
  }
}
