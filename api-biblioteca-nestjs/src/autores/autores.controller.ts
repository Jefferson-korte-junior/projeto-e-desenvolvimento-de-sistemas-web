import { Body, Controller, Get, Post } from '@nestjs/common';

import { AutoresService } from './autores.service';
import { CriarAutorDto } from './dto/criar-autor.dto';

// Controller fino: recebe a requisição e chama o service, nada mais.
@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Get()
  listar() {
    return this.autoresService.listar();
  }

  @Post()
  criar(@Body() dados: CriarAutorDto) {
    return this.autoresService.criar(dados);
  }
}
