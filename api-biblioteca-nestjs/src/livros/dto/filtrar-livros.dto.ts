import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

// Os filtros do GET /livros vêm na URL, tipo /livros?categoria=2&autor=1.
// Como tudo que vem na URL é texto, o @Type converte pra número antes de validar.
export class FiltrarLivrosDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O filtro categoria precisa ser o id da categoria' })
  @Min(1, { message: 'O filtro categoria precisa ser maior que zero' })
  categoria?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O filtro autor precisa ser o id do autor' })
  @Min(1, { message: 'O filtro autor precisa ser maior que zero' })
  autor?: number;

  // esse filtro aceita só true ou false escrito na URL
  @IsOptional()
  @IsIn(['true', 'false'], {
    message: 'O filtro disponivel aceita só true ou false',
  })
  disponivel?: string;
}
