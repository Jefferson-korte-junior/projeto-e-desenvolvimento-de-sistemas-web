import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CriarLivroDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MaxLength(200, { message: 'O título passou de 200 caracteres' })
  titulo: string;

  @IsInt({ message: 'O ano precisa ser um número' })
  @Min(1, { message: 'O ano precisa ser maior que zero' })
  ano: number;

  @IsInt({ message: 'A quantidade de exemplares precisa ser um número' })
  @Min(1, { message: 'O livro precisa ter pelo menos 1 exemplar' })
  exemplares: number;

  @IsInt({ message: 'O autorId precisa ser um número' })
  @Min(1, { message: 'Informe o id do autor' })
  autorId: number;

  @IsInt({ message: 'O categoriaId precisa ser um número' })
  @Min(1, { message: 'Informe o id da categoria' })
  categoriaId: number;
}
