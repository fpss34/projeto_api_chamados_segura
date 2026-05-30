const pool = require('../config/db');

async function listarChamados() {
  const resultado = await pool.query(`
    SELECT chamados.*, clientes.nome AS cliente_nome, clientes.empresa AS cliente_empresa
    FROM chamados
    INNER JOIN clientes ON clientes.id = chamados.cliente_id
    ORDER BY chamados.id ASC
  `);
  return resultado.rows;
}

async function buscarChamadoPorId(id) {
  const resultado = await pool.query(`
    SELECT chamados.*, clientes.nome AS cliente_nome, clientes.empresa AS cliente_empresa
    FROM chamados
    INNER JOIN clientes ON clientes.id = chamados.cliente_id
    WHERE chamados.id = $1
  `, [id]);
  return resultado.rows[0];
}

async function criarChamado(chamado) {
  const { cliente_id, titulo, descricao, status } = chamado;
  const resultado = await pool.query(
    'INSERT INTO chamados (cliente_id, titulo, descricao, status) VALUES ($1, $2, $3, COALESCE($4, $5)) RETURNING *',
    [cliente_id, titulo, descricao, status, 'aberto']
  );
  return resultado.rows[0];
}

async function atualizarChamado(id, chamado) {
  const { cliente_id, titulo, descricao, status } = chamado;
  const resultado = await pool.query(
    'UPDATE chamados SET cliente_id = $1, titulo = $2, descricao = $3, status = $4 WHERE id = $5 RETURNING *',
    [cliente_id, titulo, descricao, status, id]
  );
  return resultado.rows[0];
}

async function deletarChamado(id) {
  const resultado = await pool.query('DELETE FROM chamados WHERE id = $1 RETURNING *', [id]);
  return resultado.rows[0];
}

module.exports = {
  listarChamados,
  buscarChamadoPorId,
  criarChamado,
  atualizarChamado,
  deletarChamado
};
