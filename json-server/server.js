const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'DanielCS11',
  database: 'project_jwt'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.get('/projetos', (req, res) => {
  const query = 'SELECT * FROM projetos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

app.delete('/projetos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM projetos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar projeto:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado.' });
    }
    res.status(200).json({ message: `Projeto com ID ${id} deletado.` });
  });
});

app.post('/projetos', (req, res) => {
  const { nome, descprojeto, status } = req.body;

  if (!nome || !descprojeto || !status) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const query = 'INSERT INTO projetos (nome, descprojeto, status) VALUES (?, ?, ?)';
  db.query(query, [nome, descprojeto, status], (err, result) => {
    if (err) {
      console.error('Erro ao inserir projeto:', err);
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, nome, descprojeto, status });
  });
});

app.put('/projetos/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send('O campo status é obrigatório.');
  }

  const query = 'UPDATE projetos SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar projeto:', err);
      return res.status(500).send(err);
    }
    res.status(200).send(`Projeto com ID ${id} atualizado.`);
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});