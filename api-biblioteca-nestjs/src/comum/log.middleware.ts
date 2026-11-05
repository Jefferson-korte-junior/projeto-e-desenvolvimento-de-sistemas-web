import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Middleware de log: escreve no terminal o método, a rota, o status
// e quanto tempo a requisição levou pra responder.
@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Requisicao');

  use(requisicao: Request, resposta: Response, proximo: NextFunction) {
    const comecou = Date.now();

    // o evento 'finish' acontece depois que a resposta já foi enviada.
    // é a única hora em que o status já está definido.
    resposta.on('finish', () => {
      const tempo = Date.now() - comecou;

      this.logger.log(
        `${requisicao.method} ${requisicao.originalUrl} ${resposta.statusCode} - ${tempo}ms`,
      );
    });

    proximo();
  }
}
