import axios from "axios";

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGo0G8VI3FOtjYDX84nqNNTS2mNG8obVOJcLMTza5IgDmriTy3hvMibaAgNfzM-6v5xg/exec';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(GOOGLE_SCRIPT_URL, { params: req.query });
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
        headers: { 'Content-Type': 'application/json' }
      });
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
