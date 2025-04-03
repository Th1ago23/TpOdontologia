import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.appointments)
  user!: User;

  @Column()
  procedure!: string;

  @Column({ type: "timestamp" })
  appointmentDate!: Date;

  @Column({ default: "pending" })
  status!: string; // Valores possíveis: "pending", "confirmed", "canceled"

  @CreateDateColumn()
  createdAt!: Date;
}
