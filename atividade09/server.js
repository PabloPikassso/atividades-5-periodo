const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [];
let proximoId = 1;

function validarCorpo(body) {
  const { nome, preco } = body || {};
  if (typeof nome !== 'string' || nome.trim() === '') {
    return 'O campo "nome" é obrigatório e deve ser um texto.';
  }
  if (typeof preco !== 'number' || !Number.isFinite(preco) || preco < 0) {
    return 'O campo "preco" é obrigatório e deve ser um número maior ou igual a zero.';
  }
  return null;
}

function buscarIndice(req) {
  const id = Number(req.params.id);
  return produtos.findIndex((p) => p.id === id);
}

// Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// Consultar um produto
app.get('/api/produtos/:id', (req, res) => {
  const i = buscarIndice(req);
  if (i === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.status(200).json(produtos[i]);
});

// Criar um produto
app.post('/api/produtos', (req, res) => {
  const erro = validarCorpo(req.body);
  if (erro) return res.status(400).json({ erro });
  const produto = { id: proximoId++, nome: req.body.nome.trim(), preco: req.body.preco };
  produtos.push(produto);
  res.status(201).json(produto);
});

// Atualizar um produto
app.put('/api/produtos/:id', (req, res) => {
  const i = buscarIndice(req);
  if (i === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });
  const erro = validarCorpo(req.body);
  if (erro) return res.status(400).json({ erro });
  produtos[i].nome = req.body.nome.trim();
  produtos[i].preco = req.body.preco;
  res.status(200).json(produtos[i]);
});

// Excluir um produto
app.delete('/api/produtos/:id', (req, res) => {
  const i = buscarIndice(req);
  if (i === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });
  produtos.splice(i, 1);
  res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
});

// JSON inválido no corpo da requisição
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
