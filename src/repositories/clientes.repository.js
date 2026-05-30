const pool = require('../config/db');

async function listarClientes() {
  const resultado = await pool.query('SELECT * FROM clientes ORDER BY id ASC');
  return resultado.rows;
}

async function buscarClientePorId(id) {
  const resultado = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return resultado.rows[0];
}

async function criarCliente(cliente) {
  const { nome, email, telefone, empresa } = cliente;
  const resultado = await pool.query(
    'INSERT INTO clientes (nome, email, telefone, empresa) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, telefone, empresa]
  );
  return resultado.rows[0];
}

async function atualizarCliente(id, cliente) {
  const { nome, email, telefone, empresa } = cliente;
  const resultado = await pool.query(
    'UPDATE clientes SET nome = $1, email = $2, telefone = $3, empresa = $4 WHERE id = $5 RETURNING *',
    [nome, email, telefone, empresa, id]
  );
  return resultado.rows[0];
}

async function deletarCliente(id) {
  const resultado = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
  return resultado.rows[0];
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  deletarCliente
};
