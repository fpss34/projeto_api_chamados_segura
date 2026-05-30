const service = require('../services/clientes.service');

async function listar(req, res, next) {
  try {
    const clientes = await service.listarClientes();
    res.json(clientes);
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const cliente = await service.buscarClientePorId(req.params.id);
    res.json(cliente);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const cliente = await service.criarCliente(req.body);
    res.status(201).json(cliente);
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const cliente = await service.atualizarCliente(req.params.id, req.body);
    res.json(cliente);
  } catch (erro) {
    next(erro);
  }
}

async function deletar(req, res, next) {
  try {
    const cliente = await service.deletarCliente(req.params.id);
    res.json({ mensagem: 'Cliente removido com sucesso.', cliente });
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
