require('dotenv').config();

function apiKeyAuth(req, res, next) {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({
      erro: 'Acesso negado. API Key não informada.'
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      erro: 'API Key inválida.'
    });
  }

  next();
}

module.exports = apiKeyAuth;
