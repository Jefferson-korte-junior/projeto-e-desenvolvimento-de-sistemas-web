import { HttpException, HttpStatus } from '@nestjs/common';

// Regra R1: a biblioteca não tem exemplar livre desse livro pra emprestar.
// Herda de HttpException e carrega um código, que é o que o filtro usa
// pra montar a resposta de erro.
export class SemExemplarExcecao extends HttpException {
  codigo = 'SEM_EXEMPLAR';

  constructor(livroId: number) {
    super(`Livro ${livroId} sem exemplar disponível`, HttpStatus.CONFLICT);
  }
}
