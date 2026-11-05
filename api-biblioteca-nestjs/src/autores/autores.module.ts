import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Autor } from './autor.entity';
import { AutoresController } from './autores.controller';
import { AutoresRepository } from './autores.repository';
import { AutoresService } from './autores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutoresController],
  providers: [AutoresService, AutoresRepository],
  // exporta o service porque o módulo de livros precisa dele
  exports: [AutoresService],
})
export class AutoresModule {}
