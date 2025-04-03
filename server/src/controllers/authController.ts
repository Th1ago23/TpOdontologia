import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import "dotenv/config";
import validator from "validator";

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, cpf, email, password, birthDate } = req.body;
      if (!name || !cpf || !email || !password || !birthDate) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido." });
    }

      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({
        name,
        cpf,
        email,
        password: hashedPassword,
        birthDate,
      });

      await userRepository.save(newUser);

      return res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  }
}
