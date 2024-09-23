import express from 'express';
import { configureDependencies } from '../infrastructure/utils/config';

export const app = express();
app.use(express.json());

// Instancia dependências e rotas
const { crochetController } = configureDependencies();
app.post('/crochets', (req, res) => crochetController.create(req, res));
app.get('/crochets', (req, res) => crochetController.listAll(req, res));
app.put('/crochets/:id', (req, res) => crochetController.update(req, res));
app.delete('/crochets/:id', (req, res) => crochetController.delete(req, res));

if (require.main === module) {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
