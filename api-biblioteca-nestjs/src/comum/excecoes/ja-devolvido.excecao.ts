import { HttpException, HttpStatus } from '@nestjs/common';

// Regra R5: esse empréstimo já foi devolvido, não dá pra devolver de novo.
export class JaDevolvidoExcecao extends HttpException {
  codigo = 'JA_DEVOLVIDO';

  constructor(emprestimoId: number) {
    super(
      `Empréstimo ${emprestimoId} já foi devolvido`,
      HttpStatus.CONFLICT,
    );
  }
}
