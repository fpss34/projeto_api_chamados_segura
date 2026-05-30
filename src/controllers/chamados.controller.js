const service = require('../services/chamados.service');
const YAML = require('yaml');

function responder(req, res, dados, status = 200) {
  const formato = req.query.formato;

  if (formato === 'yaml') {
    res.status(status).type('text/yaml').send(YAML.stringify(dados));
    return;
  }

  res.status(status).json(dados);
}

async function listar(req, res, next) {
  try {
    const chamados = await service.listarChamados();
    responder(req, res, chamados);
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const chamado = await service.buscarChamadoPorId(req.params.id);
    responder(req, res, chamado);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const chamado = await service.criarChamado(req.body);
    responder(req, res, chamado, 201);
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const chamado = await service.atualizarChamado(req.params.id, req.body);
    responder(req, res, chamado);
  } catch (erro) {
    next(erro);
  }
}

async function deletar(req, res, next) {
  try {
    const chamado = await service.deletarChamado(req.params.id);
    responder(req, res, { mensagem: 'Chamado removido com sucesso.', chamado });
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
