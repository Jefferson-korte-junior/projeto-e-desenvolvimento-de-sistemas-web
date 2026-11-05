import { IsIn, IsOptional } from 'class-validator';

// Filtro da rota /leitores/:id/emprestimos?status=aberto
export class FiltrarEmprestimosDto {
  @IsOptional()
  @IsIn(['aberto'], { message: 'O filtro status aceita só o valor aberto' })
  status?: string;
}
