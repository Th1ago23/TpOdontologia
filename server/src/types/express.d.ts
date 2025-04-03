import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // Ajuste conforme necessário, ex: `user?: { id: number; }`
  }
}
