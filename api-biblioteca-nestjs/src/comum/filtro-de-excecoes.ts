import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Filtro global de erro. Ele pega qualquer erro que estoura na API e devolve
// sempre no mesmo formato. É por causa dele que nenhum controller precisa
// de try/catch.
@Catch()
export class FiltroDeExcecoes implements ExceptionFilter {
  private readonly logger = new Logger('Erro');

  catch(erro: unknown, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse<Response>();
    const requisicao = contexto.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let codigo = 'ERRO_INTERNO';
    let mensagem = 'Erro interno no servidor';

    if (erro instanceof HttpException) {
      status = erro.getStatus();
      codigo = this.pegarCodigo(erro, status);
      mensagem = this.pegarMensagem(erro);
    } else {
      // erro que a gente não esperava. O detalhe vai só pro log,
      // porque não dá pra devolver stack trace pra quem chamou a API.
      this.logger.error(erro instanceof Error ? erro.stack : String(erro));
    }

    resposta.status(status).json({
      sucesso: false,
      erro: {
        status: status,
        codigo: codigo,
        mensagem: mensagem,
      },
      caminho: requisicao.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }

  // As exceções que eu criei já trazem o código pronto (SEM_EXEMPLAR e as outras).
  // As que vêm do próprio Nest não têm, então monto um código pelo status.
  private pegarCodigo(erro: HttpException, status: number): string {
    const minhaExcecao = erro as HttpException & { codigo?: string };

    if (minhaExcecao.codigo) {
      return minhaExcecao.codigo;
    }

    if (status === HttpStatus.BAD_REQUEST) {
      return 'DADOS_INVALIDOS';
    }

    if (status === HttpStatus.NOT_FOUND) {
      return 'NAO_ENCONTRADO';
    }

    if (status === HttpStatus.CONFLICT) {
      return 'CONFLITO';
    }

    return 'ERRO';
  }

  // A mensagem do HttpException às vezes vem como texto e às vezes como objeto.
  // O ValidationPipe, por exemplo, devolve uma lista com todos os campos errados.
  private pegarMensagem(erro: HttpException): string {
    const corpo = erro.getResponse();

    if (typeof corpo === 'string') {
      return corpo;
    }

    const mensagem = (corpo as { message?: string | string[] }).message;

    if (Array.isArray(mensagem)) {
      return mensagem.join('; ');
    }

    if (typeof mensagem === 'string') {
      return mensagem;
    }

    return erro.message;
  }
}
