// netlify/functions/list-productos.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Lista fixa como fallback
    const fallbackFiles = [
      "produto1.json",
      "exemplo.json"
    ];
    
    return {
      statusCode: 200,
      body: JSON.stringify(fallbackFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 200, // Mantém 200 para o frontend continuar funcionando
      body: JSON.stringify(["produto1.json", "exemplo.json"])
    };
  }
};