import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Livro } from '../livros/livro.entity';
import { Leitor } from '../leitores/leitor.entity';

// Tabela de empréstimos.
// Ela é uma entidade de verdade e não só uma ligação entre livro e leitor,
// porque tem dados próprios: as datas e a multa.
@Entity('emprestimos')
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  // o onDelete CASCADE existe por causa do DELETE /livros/:id. A regra R6 só
  // deixa excluir um livro quando ele não tem empréstimo em aberto, mas o
  // histórico dos que já voltaram continua apontando pro livro. Sem o cascade
  // o banco barra a exclusão por causa da chave estrangeira.
  @ManyToOne(() => Livro, (livro) => livro.emprestimos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @Column({ name: 'livro_id', type: 'int' })
  livroId: number;

  @ManyToOne(() => Leitor, (leitor) => leitor.emprestimos)
  @JoinColumn({ name: 'leitor_id' })
  leitor: Leitor;

  @Column({ name: 'leitor_id', type: 'int' })
  leitorId: number;

  // as datas ficam no formato texto AAAA-MM-DD, que é como o Postgres devolve
  @Column({ type: 'date' })
  dataRetirada: string;

  @Column({ type: 'date' })
  dataPrevista: string;

  // fica nulo enquanto o livro não foi devolvido
  @Column({ type: 'date', nullable: true })
  dataDevolucao: string | null;

  // multa por atraso, R$ 1,00 por dia
  @Column({ type: 'float', default: 0 })
  multa: number;
}
