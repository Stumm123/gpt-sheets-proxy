const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGo0G8VI3FOtjYDX84nqNNTS2mNG8obVOJcLMTza5IgDmriTy3hvMibaAgNfzM-6v5xg/exec';

app.get('/leads', async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL, { params: req.query });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/leads', async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy läuft! Benutze /leads (GET/POST)');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy läuft auf Port ${PORT}`));
