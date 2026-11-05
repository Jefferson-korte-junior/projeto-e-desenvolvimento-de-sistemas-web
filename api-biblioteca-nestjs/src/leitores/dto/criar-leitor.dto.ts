import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CriarLeitorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(120, { message: 'O nome passou de 120 caracteres' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A matrícula é obrigatória' })
  @MaxLength(20, { message: 'A matrícula passou de 20 caracteres' })
  matricula: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @MaxLength(120, { message: 'O e-mail passou de 120 caracteres' })
  email: string;
}
