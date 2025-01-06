const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Rate limiter - IP başına 15 dakikada maksimum 100 istek
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Ana sayfa endpoint'i
app.get('/', (req, res) => {
  res.send('Amazon Checker API is running!');
});

// ASIN kontrolü endpoint'i
app.get('/check/:asin', async (req, res) => {
  const { asin } = req.params;

  const results = {};
  const marketplaces = {
      'com': 'US',
      'co.uk': 'UK',
      'de': 'Germany',
      'fr': 'France',
      'it': 'Italy',
      'es': 'Spain',
      'co.jp': 'Japan',
      'ca': 'Canada'
  };

  try {
      const checkPromises = Object.entries(marketplaces).map(async ([domain, country]) => {
          try {
              const response = await axios.get(`https://www.amazon.${domain}/dp/${asin}`, {
                  headers: {
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                      'Accept-Language': 'en-US,en;q=0.5'
                  },
                  timeout: 5000
              });
              results[domain] = {
                  isAvailable: true,
                  country: country
              };
          } catch (error) {
              results[domain] = {
                  isAvailable: false,
                  country: country,
                  error: true
              };
          }
      });

      await Promise.all(checkPromises);
      res.json(results);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});