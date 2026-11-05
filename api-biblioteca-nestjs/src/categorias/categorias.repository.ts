import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './categoria.entity';

// O repository é o único lugar do módulo que fala com o banco.
@Injectable()
export class CategoriasRepository {
  constructor(
    @InjectRepository(Categoria)
    private readonly repositorio: Repository<Categoria>,
  ) {}

  listar() {
    return this.repositorio.find({ order: { nome: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id: id });
  }

  criar(nome: string) {
    const categoria = this.repositorio.create({ nome: nome });
    return this.repositorio.save(categoria);
  }
}
