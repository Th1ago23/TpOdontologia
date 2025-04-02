import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Olá do servidor Node.js com TypeScript!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});