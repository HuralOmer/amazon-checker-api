// Render.com URL'inizi buraya yazacaksınız
const API_BASE_URL = 'https://your-app-name.onrender.com';

const marketplaces = {
  'Amazon.com (US)': 'com',
  'Amazon UK': 'co.uk',
  'Amazon Germany': 'de',
  'Amazon France': 'fr',
  'Amazon Italy': 'it',
  'Amazon Spain': 'es',
  'Amazon Japan': 'co.jp',
  'Amazon Canada': 'ca'
};

document.getElementById('checkButton').addEventListener('click', checkProduct);

async function checkProduct() {
  const asin = document.getElementById('asinInput').value.trim();
  if (!asin) {
      alert('Lütfen bir ASIN numarası girin');
      return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<p>Kontrol ediliyor...</p>';

  try {
      const response = await fetch(`${API_BASE_URL}/check/${asin}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const results = await response.json();

      resultsDiv.innerHTML = '';

      for (const [name, domain] of Object.entries(marketplaces)) {
          const card = document.createElement('div');
          card.className = 'marketplace-card';
          
          const result = results[domain] || { isAvailable: false, error: true };

          card.innerHTML = `
              <h3>${name}</h3>
              <div class="status">
                  <div class="status-dot ${result.isAvailable ? 'available' : 'unavailable'}"></div>
                  <span>${result.isAvailable ? 'Mevcut' : 'Mevcut Değil'}</span>
              </div>
              <a href="https://www.amazon.${domain}/dp/${asin}" target="_blank" class="marketplace-link">
                  Ürünü Görüntüle
              </a>
          `;

          resultsDiv.appendChild(card);
      }
  } catch (error) {
      resultsDiv.innerHTML = '<p>Hata oluştu. Lütfen tekrar deneyin.</p>';
      console.error('Error:', error);
  }
}