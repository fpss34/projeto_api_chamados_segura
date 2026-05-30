const repository = require('../repositories/clientes.repository');

async function listarClientes() {
  return repository.listarClientes();
}

async function buscarClientePorId(id) {
  const cliente = await repository.buscarClientePorId(id);
  if (!cliente) {
    const erro = new Error('Cliente não encontrado.');
    erro.status = 404;
    throw erro;
  }
  return cliente;
}

async function criarCliente(dados) {
  if (!dados.nome || !dados.email) {
    const erro = new Error('Nome e e-mail são obrigatórios.');
    erro.status = 400;
    throw erro;
  }
  return repository.criarCliente(dados);
}

async function atualizarCliente(id, dados) {
  await buscarClientePorId(id);
  return repository.atualizarCliente(id, dados);
}

async function deletarCliente(id) {
  await buscarClientePorId(id);
  return repository.deletarCliente(id);
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  deletarCliente
};
