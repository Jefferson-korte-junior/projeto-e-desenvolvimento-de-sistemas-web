import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LeitoresModule } from '../leitores/leitores.module';
import { LivrosModule } from '../livros/livros.module';
import { Emprestimo } from './emprestimo.entity';
import { EmprestimosController } from './emprestimos.controller';
import { EmprestimosRepository } from './emprestimos.repository';
import { EmprestimosService } from './emprestimos.service';
import { LeitorEmprestimosController } from './leitor-emprestimos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emprestimo]),
    // importa os módulos pra usar os services deles, sem dar new em nada
    LivrosModule,
    LeitoresModule,
  ],
  controllers: [EmprestimosController, LeitorEmprestimosController],
  providers: [EmprestimosService, EmprestimosRepository],
})
export class EmprestimosModule {}
