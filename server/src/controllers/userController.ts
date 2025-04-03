import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// Tipo para permitir acesso ao usuário autenticado no request
interface AuthRequest extends Request {
  user?: any;
}

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  // Criar um novo usuário
  static async createUser(req: Request, res: Response) {
    try {
      const { name, cpf, email, password, birthDate } = req.body;

      // Verifica se o email já está cadastrado
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      // Hash da senha antes de salvar no banco
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({
        name,
        cpf,
        email,
        password: hashedPassword,
        birthDate,
      });

      await userRepository.save(newUser);

      // Remove a senha antes de enviar a resposta
      const { password: _, ...userData } = newUser;
      return res.status(201).json({ message: "Usuário criado com sucesso", user: userData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(500).json({ message: "Erro ao criar usuário", error: errorMessage });
    }
  }

  // Listar todos os usuários
  static async getUsers(req: AuthRequest, res: Response) {
    try {
      const users = await userRepository.find();

      // Remove a senha dos usuários na resposta
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);

      return res.status(200).json(usersWithoutPasswords);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(500).json({ message: "Erro ao buscar usuários", error: errorMessage });
    }
  }

  // Buscar um usuário pelo ID
  static async getUserById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Remove a senha antes de enviar a resposta
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(500).json({ message: "Erro ao buscar usuário", error: errorMessage });
    }
  }

  // Atualizar usuário
  static async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, cpf, email, password, birthDate } = req.body;

      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Se tentar atualizar email, verifica se já está em uso por outro usuário
      if (email && email !== user.email) {
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email já cadastrado" });
        }
      }

      // Atualiza os campos informados
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      user.name = name ?? user.name;
      user.cpf = cpf ?? user.cpf;
      user.email = email ?? user.email;
      user.birthDate = birthDate ?? user.birthDate;

      await userRepository.save(user);

      // Remove a senha antes de enviar a resposta
      const { password: _, ...userData } = user;
      return res.status(200).json({ message: "Usuário atualizado com sucesso", user: userData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(500).json({ message: "Erro ao atualizar usuário", error: errorMessage });
    }
  }
}
