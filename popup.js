// Render.com API URL'inizi buraya yazın
const API_URL = 'https://amazon-checker-api.onrender.com'; // Render.com'dan aldığınız URL

// API çağrısı yapan fonksiyon
async function checkProduct(url) {
  try {
      console.log('API çağrısı yapılıyor:', API_URL);
      const response = await fetch(`${API_URL}/check-product`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API yanıtı:', data);
      return data;
  } catch (error) {
      console.error('API hatası:', error);
      throw error;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('checkButton');
  const resultDiv = document.getElementById('result');

  checkButton.addEventListener('click', async () => {
      try {
          // Test amaçlı API çağrısı
          const result = await checkProduct('test-url');
          resultDiv.textContent = JSON.stringify(result);
      } catch (error) {
          resultDiv.textContent = 'Hata: ' + error.message;
      }
  });
});
