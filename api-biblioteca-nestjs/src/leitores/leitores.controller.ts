import { Body, Controller, Post } from '@nestjs/common';

import { LeitoresService } from './leitores.service';
import { CriarLeitorDto } from './dto/criar-leitor.dto';

@Controller('leitores')
export class LeitoresController {
  constructor(private readonly leitoresService: LeitoresService) {}

  @Post()
  criar(@Body() dados: CriarLeitorDto) {
    return this.leitoresService.criar(dados);
  }
}
