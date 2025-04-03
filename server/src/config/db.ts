import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import dotenv from "dotenv";

dotenv.config();
console.log("🔍 Variáveis carregadas:", process.env);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Appointment],
  migrations: [],
  subscribers: [],
});

// Inicializando a conexão com o banco
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => console.log("Erro ao conectar no banco:", error));

  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
