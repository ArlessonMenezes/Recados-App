import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  idPessoa: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Recado, recado => recado.de, {
    cascade: true,
  })
  sentRecados: Recado[];

  @OneToMany(() => Recado, recado => recado.para, {
    cascade: true,
  })
  receivedRecados: Recado[];
}
