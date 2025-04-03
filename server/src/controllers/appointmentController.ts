import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";

const appointmentRepository = AppDataSource.getRepository(Appointment);
const userRepository = AppDataSource.getRepository(User);

export class AppointmentController {
  static async createAppointment(req: Request, res: Response) {
    try {
      const { userId, procedure, appointmentDate } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const newAppointment = appointmentRepository.create({
        user,
        procedure,
        appointmentDate,
        status: "pending",
      });

      await appointmentRepository.save(newAppointment);
      return res.status(201).json({ message: "Consulta agendada com sucesso", appointment: newAppointment });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao agendar consulta", error });
    }
  }

  static async getAppointments(req: Request, res: Response) {
    try {
      const appointments = await appointmentRepository.find({ relations: ["user"] });
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar consultas", error });
    }
  }

  static async updateAppointmentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body; // status: "confirmed" | "canceled"

      const appointment = await appointmentRepository.findOne({ where: { id: parseInt(id) } });
      if (!appointment) {
        return res.status(404).json({ message: "Consulta não encontrada" });
      }

      appointment.status = status;
      await appointmentRepository.save(appointment);

      return res.status(200).json({ message: "Status atualizado com sucesso", appointment });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar status", error });
    }
  }
}
