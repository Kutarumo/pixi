const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Créer une nouvelle base de données SQLite (ou la connecter à une existante)
const db = new sqlite3.Database('./src/database.sqlite');

// Créez une table pour stocker les données (si elle n'existe pas déjà)
db.run('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER)');

app.use(express.static(path.join(__dirname, '')));

// Route pour enregistrer les données
app.get('/saveData', (req, res) => {
  const data = { name: 'data', value: 123 };

  // Insérez les données dans la table
  db.run('INSERT INTO data (name, value) VALUES (?, ?)', [data.name, data.value], (err) => {
    if (err) {
      return res.status(500).json({message: 'Erreur lors de l\'enregistrement des données.'});
    }
    res.json({message: 'Données enregistrées avec succès.'});
  });
});

app.post('/getData', (req, res) => {
  // Insérez les données dans la table
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
