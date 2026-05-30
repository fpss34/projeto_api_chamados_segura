CREATE DATABASE api_chamados;

-- Depois de criar o banco, conecte nele e execute o restante:

CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  empresa VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chamados (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'aberto',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clientes (nome, email, telefone, empresa)
VALUES
('João Silva', 'joao@empresa.com', '98999990000', 'Empresa Alpha'),
('Maria Souza', 'maria@empresa.com', '98888880000', 'Empresa Beta')
ON CONFLICT (email) DO NOTHING;

INSERT INTO chamados (cliente_id, titulo, descricao, status)
VALUES
(1, 'Erro no sistema financeiro', 'Cliente informou falha ao gerar relatório mensal.', 'aberto'),
(2, 'Lentidão no sistema interno', 'Sistema apresenta lentidão no horário comercial.', 'em atendimento');
