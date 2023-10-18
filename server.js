const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./src/database.sqlite');

db.run('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER)');

app.use(express.static(path.join(__dirname, '')));

app.get('/saveData', (req, res) => {
  const data = { name: 'data', value: 123 };

  db.run('INSERT INTO data (name, value) VALUES (?, ?)', [data.name, data.value], (err) => {
    if (err) {
      return res.status(500).json({message: 'Erreur lors de l\'enregistrement des données.'});
    }
    res.json({message: 'Données enregistrées avec succès.'});
  });
});

app.post('/getData', (req, res) => {

  db.all('SELECT * FROM data', (err, rows) => {
    if (err) {
      return res.status(500).json({message: 'Erreur lors de la la récupération des données.'});
    }
    res.json({message: 'Données récupérées avec succès.', data: rows});
  });
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
