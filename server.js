const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// CORS ayarları
app.use(cors({
  origin: '*', // Geliştirme aşamasında tüm originlere izin ver
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});

// Ürün kontrol endpoint'i
app.post('/check-product', (req, res) => {
  try {
      const { url } = req.body;
      // Test yanıtı
      res.json({
          success: true,
          message: 'Ürün kontrol edildi',
          url: url
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
