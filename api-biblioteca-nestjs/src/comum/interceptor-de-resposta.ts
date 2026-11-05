import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

// Interceptor global: tudo que dá certo sai embrulhado no mesmo formato,
// { sucesso: true, dados: ... }. Assim quem usa a API sempre recebe
// a mesma casca, não importa o endpoint.
@Injectable()
export class InterceptorDeResposta implements NestInterceptor {
  intercept(contexto: ExecutionContext, proximo: CallHandler): Observable<any> {
    const resposta = contexto.switchToHttp().getResponse<Response>();

    return proximo.handle().pipe(
      map((dados) => {
        // o DELETE responde 204, e pela regra do HTTP o 204 não tem corpo.
        // se eu embrulhar esse caso a resposta fica inválida, então deixo passar.
        if (resposta.statusCode === 204) {
          return dados;
        }

        return { sucesso: true, dados: dados };
      }),
    );
  }
}
