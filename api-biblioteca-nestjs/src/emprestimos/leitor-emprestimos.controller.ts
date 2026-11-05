import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { FiltrarEmprestimosDto } from './dto/filtrar-emprestimos.dto';
import { EmprestimosService } from './emprestimos.service';

// Esse controller atende a rota /leitores/:id/emprestimos.
// Ele ficou aqui no módulo de empréstimos, e não no de leitores, porque quem
// conhece as regras de empréstimo é o EmprestimosService. Se eu colocasse no
// módulo de leitores, os dois módulos iam precisar um do outro e o Nest
// não consegue resolver essa dependência circular.
@Controller('leitores')
export class LeitorEmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Get(':id/emprestimos')
  listar(
    @Param('id', ParseIntPipe) id: number,
    @Query() filtros: FiltrarEmprestimosDto,
  ) {
    return this.emprestimosService.listarDoLeitor(id, filtros.status);
  }
}
