const express = require('express');
const router = express.Router();

router.get('/api/v1/get_score', (req, res) => {
  const data = { message: 'Données de l\'API' };
  res.json(data);
});

module.exports = router;