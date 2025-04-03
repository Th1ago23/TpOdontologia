import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Definição do tipo para adicionar o usuário à requisição
interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Acesso negado. Token não fornecido." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Armazena os dados do usuário autenticado na requisição

    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido ou expirado" });
  }
};
