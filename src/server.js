const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiKeyAuth = require('./middlewares/apiKeyAuth');
const clientesRoutes = require('./routes/clientes.routes');
const chamadosRoutes = require('./routes/chamados.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API RESTful de Chamados Empresariais',
    status: 'online',
    documentacao: {
      clientes: '/clientes',
      chamados: '/chamados',
      yaml: '/chamados?formato=yaml'
    }
  });
});

app.use('/clientes', apiKeyAuth, clientesRoutes);
app.use('/chamados', apiKeyAuth, chamadosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(erro.status || 500).json({
    erro: erro.message || 'Erro interno no servidor.'
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
