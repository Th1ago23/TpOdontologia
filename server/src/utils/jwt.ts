import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
