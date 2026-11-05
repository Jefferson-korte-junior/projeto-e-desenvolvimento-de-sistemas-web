import { HttpException, HttpStatus } from '@nestjs/common';

// Regra R2: o leitor já está com 3 livros em aberto e não pode pegar mais.
export class LimiteEmprestimosExcecao extends HttpException {
  codigo = 'LIMITE_EMPRESTIMOS';

  constructor(leitorId: number) {
    super(
      `Leitor ${leitorId} já está com 3 empréstimos em aberto`,
      HttpStatus.CONFLICT,
    );
  }
}
