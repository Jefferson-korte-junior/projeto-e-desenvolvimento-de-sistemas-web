import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Livro } from '../livros/livro.entity';

// Tabela de autores
@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  // um autor pode ter escrito vários livros (1:N)
  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
