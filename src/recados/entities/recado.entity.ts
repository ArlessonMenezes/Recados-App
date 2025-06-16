import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  de: string;

  @Column()
  para: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  date: Date;
}