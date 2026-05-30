# API RESTful Segura - Chamados Empresariais

Projeto desenvolvido para a disciplina Arquitetura Orientada a Serviços.

## Objetivo

Desenvolver uma API RESTful para integração segura de sistemas empresariais, utilizando arquitetura multicamadas, banco de dados PostgreSQL e autenticação por API Key.

## Tecnologias

- Node.js
- Express.js
- PostgreSQL
- API Key
- JSON
- YAML

## Estrutura

```text
src/
  config/
    db.js
  middlewares/
    apiKeyAuth.js
  routes/
    clientes.routes.js
    chamados.routes.js
  controllers/
    clientes.controller.js
    chamados.controller.js
  services/
    clientes.service.js
    chamados.service.js
  repositories/
    clientes.repository.js
    chamados.repository.js
  server.js
```

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar arquivo .env

Copie o arquivo `.env.example` e renomeie para `.env`.

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
copy .env.example .env
```

### 3. Criar banco de dados

Abra o PostgreSQL e execute o arquivo `database.sql`.

### 4. Rodar o projeto

```bash
npm run dev
```

Ou:

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Autenticação

Todos os endpoints `/clientes` e `/chamados` são protegidos por API Key.

Header obrigatório:

```text
x-api-key: minha-chave-secreta
```

## Endpoints

### Clientes

```http
GET /clientes
GET /clientes/:id
POST /clientes
PUT /clientes/:id
DELETE /clientes/:id
```

### Chamados

```http
GET /chamados
GET /chamados/:id
POST /chamados
PUT /chamados/:id
DELETE /chamados/:id
```

### YAML

Para receber chamados em YAML:

```http
GET /chamados?formato=yaml
```

## Exemplo de POST /clientes

```json
{
  "nome": "Carlos Lima",
  "email": "carlos@empresa.com",
  "telefone": "98777770000",
  "empresa": "Empresa Gama"
}
```

## Exemplo de POST /chamados

```json
{
  "cliente_id": 1,
  "titulo": "Falha no acesso ao sistema",
  "descricao": "Usuário não consegue acessar o sistema interno.",
  "status": "aberto"
}
```

## Resposta sem API Key

```json
{
  "erro": "Acesso negado. API Key não informada."
}
```

## Resposta com API Key inválida

```json
{
  "erro": "API Key inválida."
}
```

## Justificativa da API Key

A API Key foi escolhida por ser adequada ao cenário de integração entre sistemas empresariais. Nesse contexto, a autenticação não depende necessariamente de um usuário humano realizando login, mas sim de aplicações autorizadas consumindo a API.

Em comparação com JWT, a API Key apresenta menor complexidade de implementação e atende ao objetivo do projeto, que é proteger endpoints contra acessos não autorizados em uma integração entre sistemas.

## Por que é RESTful?

A API é RESTful porque utiliza recursos bem definidos, como clientes e chamados, métodos HTTP adequados para cada operação, respostas em JSON ou YAML e comunicação sem estado.
