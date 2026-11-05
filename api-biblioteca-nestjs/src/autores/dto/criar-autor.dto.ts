import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CriarAutorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do autor é obrigatório' })
  @MaxLength(120, { message: 'O nome do autor passou de 120 caracteres' })
  nome: string;
}
