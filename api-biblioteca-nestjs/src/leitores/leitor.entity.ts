import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emprestimo } from '../emprestimos/emprestimo.entity';

// Tabela de leitores (os alunos que pegam livro emprestado)
@Entity('leitores')
export class Leitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  // a matrícula não pode repetir, por isso o unique
  @Column({ type: 'varchar', length: 20, unique: true })
  matricula: string;

  @Column({ type: 'varchar', length: 120 })
  email: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.leitor)
  emprestimos: Emprestimo[];
}
