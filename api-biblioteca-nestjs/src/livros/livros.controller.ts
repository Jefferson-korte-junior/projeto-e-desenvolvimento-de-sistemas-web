import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AtualizarLivroDto } from './dto/atualizar-livro.dto';
import { CriarLivroDto } from './dto/criar-livro.dto';
import { FiltrarLivrosDto } from './dto/filtrar-livros.dto';
import { LivrosService } from './livros.service';

// Controller fino: cada método só repassa pro service. Nenhum if de regra aqui.
@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  listar(@Query() filtros: FiltrarLivrosDto) {
    return this.livrosService.listar(filtros);
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.buscarDetalhe(id);
  }

  @Post()
  criar(@Body() dados: CriarLivroDto) {
    return this.livrosService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarLivroDto,
  ) {
    return this.livrosService.atualizar(id, dados);
  }

  // o 204 é o status de "deu certo e não tem nada pra devolver"
  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.remover(id);
  }
}
