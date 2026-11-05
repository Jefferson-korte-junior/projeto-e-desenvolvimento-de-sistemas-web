import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { Emprestimo } from '../emprestimos/emprestimo.entity';
import { Livro } from './livro.entity';
import { LivrosController } from './livros.controller';
import { LivrosRepository } from './livros.repository';
import { LivrosService } from './livros.service';

@Module({
  imports: [
    // o Emprestimo entra aqui porque a regra R6 precisa contar
    // os empréstimos em aberto do livro
    TypeOrmModule.forFeature([Livro, Emprestimo]),
    // importa os módulos pra poder usar os services deles, sem dar new em nada
    AutoresModule,
    CategoriasModule,
  ],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository],
  exports: [LivrosService],
})
export class LivrosModule {}
