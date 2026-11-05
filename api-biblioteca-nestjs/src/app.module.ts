import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogMiddleware } from './comum/log.middleware';

import { Autor } from './autores/autor.entity';
import { Categoria } from './categorias/categoria.entity';
import { Emprestimo } from './emprestimos/emprestimo.entity';
import { Leitor } from './leitores/leitor.entity';
import { Livro } from './livros/livro.entity';

import { AutoresModule } from './autores/autores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { LeitoresModule } from './leitores/leitores.module';
import { LivrosModule } from './livros/livros.module';

@Module({
  imports: [
    // lê o arquivo .env e joga as variáveis no process.env
    ConfigModule.forRoot({ isGlobal: true }),

    // conexão com o Postgres. Os dados vêm do .env pra não ter senha no código.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Autor, Categoria, Livro, Leitor, Emprestimo],
      // o synchronize cria e atualiza as tabelas sozinho quando a API sobe
      synchronize: true,
    }),

    // um módulo pra cada assunto
    AutoresModule,
    CategoriasModule,
    LivrosModule,
    LeitoresModule,
    EmprestimosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumidor: MiddlewareConsumer) {
    // o middleware de log vale pra todas as rotas da API.
    // o '{*splat}' é como o Express 5 escreve "qualquer caminho".
    consumidor.apply(LogMiddleware).forRoutes('{*splat}');
  }
}
