import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "date" })
  birthDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments!: Appointment[];
}
