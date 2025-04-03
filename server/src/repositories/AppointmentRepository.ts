import { Repository } from "typeorm";
import { AppDataSource } from "../config/db";
import { Appointment } from "../models/Appointment";

export const AppointmentRepository: Repository<Appointment> = AppDataSource.getRepository(Appointment);
