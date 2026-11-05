import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Autor } from '../autores/autor.entity';
import { Categoria } from '../categorias/categoria.entity';
import { Emprestimo } from '../emprestimos/emprestimo.entity';

// Tabela de livros
@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'int' })
  ano: number;

  // quantas cópias desse livro a biblioteca tem na estante
  @Column({ type: 'int', default: 1 })
  exemplares: number;

  // o livro tem um autor, então a chave estrangeira fica aqui (lado do N)
  @ManyToOne(() => Autor, (autor) => autor.livros)
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  // guardo o id do autor num campo separado também, fica mais fácil de filtrar
  @Column({ name: 'autor_id', type: 'int' })
  autorId: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.livros)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'categoria_id', type: 'int' })
  categoriaId: number;

  // todos os empréstimos que já foram feitos desse livro
  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
  emprestimos: Emprestimo[];
}
