import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

// No PATCH o cliente manda só os campos que quer mudar,
// por isso tudo aqui é opcional.
export class AtualizarLivroDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O título não pode ficar vazio' })
  @MaxLength(200, { message: 'O título passou de 200 caracteres' })
  titulo?: string;

  @IsOptional()
  @IsInt({ message: 'O ano precisa ser um número' })
  @Min(1, { message: 'O ano precisa ser maior que zero' })
  ano?: number;

  @IsOptional()
  @IsInt({ message: 'A quantidade de exemplares precisa ser um número' })
  @Min(1, { message: 'O livro precisa ter pelo menos 1 exemplar' })
  exemplares?: number;

  @IsOptional()
  @IsInt({ message: 'O autorId precisa ser um número' })
  @Min(1, { message: 'Informe o id do autor' })
  autorId?: number;

  @IsOptional()
  @IsInt({ message: 'O categoriaId precisa ser um número' })
  @Min(1, { message: 'Informe o id da categoria' })
  categoriaId?: number;
}
