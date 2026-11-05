import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @MaxLength(120, { message: 'O nome da categoria passou de 120 caracteres' })
  nome: string;
}
