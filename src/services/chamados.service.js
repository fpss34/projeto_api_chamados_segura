const repository = require('../repositories/chamados.repository');
const clientesRepository = require('../repositories/clientes.repository');

async function listarChamados() {
  return repository.listarChamados();
}

async function buscarChamadoPorId(id) {
  const chamado = await repository.buscarChamadoPorId(id);
  if (!chamado) {
    const erro = new Error('Chamado não encontrado.');
    erro.status = 404;
    throw erro;
  }
  return chamado;
}

async function criarChamado(dados) {
  if (!dados.cliente_id || !dados.titulo || !dados.descricao) {
    const erro = new Error('Cliente, título e descrição são obrigatórios.');
    erro.status = 400;
    throw erro;
  }

  const clienteExiste = await clientesRepository.buscarClientePorId(dados.cliente_id);
  if (!clienteExiste) {
    const erro = new Error('Cliente informado não existe.');
    erro.status = 400;
    throw erro;
  }

  return repository.criarChamado(dados);
}

async function atualizarChamado(id, dados) {
  await buscarChamadoPorId(id);

  const clienteExiste = await clientesRepository.buscarClientePorId(dados.cliente_id);
  if (!clienteExiste) {
    const erro = new Error('Cliente informado não existe.');
    erro.status = 400;
    throw erro;
  }

  return repository.atualizarChamado(id, dados);
}

async function deletarChamado(id) {
  await buscarChamadoPorId(id);
  return repository.deletarChamado(id);
}

module.exports = {
  listarChamados,
  buscarChamadoPorId,
  criarChamado,
  atualizarChamado,
  deletarChamado
};
