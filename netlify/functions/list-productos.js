// netlify/functions/list-productos.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Configurações (substitua com seus dados)
  const REPO_OWNER = 'lorenareisx';
  const REPO_NAME = 'sennacar';
  const FOLDER_PATH = 'data/produtos';
  
  try {
    // URL da API do GitHub para listar conteúdo do diretório
    const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FOLDER_PATH}`;
    
    console.log(`Acessando: ${apiUrl}`); // Log para debug
    
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Netlify-Sennacar-App',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    // Filtra apenas arquivos JSON
    const jsonFiles = response.data
      .filter(item => item.type === 'file' && item.name.endsWith('.json'))
      .map(item => item.name);

    console.log('Arquivos encontrados:', jsonFiles); // Log para debug

    return {
      statusCode: 200,
      body: JSON.stringify(jsonFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
  } catch (error) {
    console.error('Erro completo:', error); // Log detalhado
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Erro ao listar produtos',
        details: error.message,
        response: error.response?.data
      })
    };
  }
};