import { IsInt, Min } from 'class-validator';

// O cliente manda só o livro e o leitor.
// As datas quem calcula é a API, não ele.
export class CriarEmprestimoDto {
  @IsInt({ message: 'O livroId precisa ser um número' })
  @Min(1, { message: 'Informe o id do livro' })
  livroId: number;

  @IsInt({ message: 'O leitorId precisa ser um número' })
  @Min(1, { message: 'Informe o id do leitor' })
  leitorId: number;
}
