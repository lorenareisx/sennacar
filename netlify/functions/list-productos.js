// netlify/functions/list-productos.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Substitua pelo seu usuário e repositório
    const response = await axios.get('https://api.github.com/repos/lorenareisx/sennacar/contents/data/produtos');
    const files = response.data
      .filter(file => file.name.endsWith('.json'))
      .map(file => file.name);

    return {
      statusCode: 200,
      body: JSON.stringify(files),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erro ao listar produtos',
        details: error.message
      })
    };
  }
};