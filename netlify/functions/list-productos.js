// netlify/functions/list-productos.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Obtém variáveis de ambiente
  const repoOwner = process.env.GITHUB_USER || 'lorenareisx';
  const repoName = process.env.GITHUB_REPO || 'sennacar';
  
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/produtos`);
    
    const files = response.data
      .filter(file => file.name.endsWith('.json'))
      .map(file => file.name);

    return {
      statusCode: 200,
      body: JSON.stringify(files),
    };
  } catch (error) {
    // Fallback para lista fixa se a API falhar
    const fallbackFiles = ["produto1.json", "exemplo.json"];
    return {
      statusCode: 200,
      body: JSON.stringify(fallbackFiles),
    };
  }
};