import express from "express";
import cors from "cors";
import "dotenv/config";
import { AppDataSource } from "./config/db";
import router from "./routes/router";


console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(() => console.log("📦 Banco de dados conectado! 🚀"))
  .catch((err) => console.error("Erro ao conectar no banco:", err));

app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
