import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Livro } from '../livros/livro.entity';

// Tabela de categorias
@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  // uma categoria tem vários livros (1:N)
  @OneToMany(() => Livro, (livro) => livro.categoria)
  livros: Livro[];
}
