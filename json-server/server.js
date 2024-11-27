const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'DanielCS11',
  database: 'projects_jwt'
});

app.post('/projetos', (req, res) => {
  const { nome, descprojeto, status_name, status_key } = req.body;

  if (!nome || !descprojeto || !status_name || !status_key) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const query = 'INSERT INTO projetos (nome, descprojeto, status_name, status_key) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, descprojeto, status_name, status_key], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, nome, descprojeto, status_name, status_key });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});