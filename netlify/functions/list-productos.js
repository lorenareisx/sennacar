// netlify/functions/list-productos.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // Caminho para a pasta de produtos (relativo à raiz do projeto)
    const productsDir = path.join(process.cwd(), 'data', 'produtos');
    
    // Lê o conteúdo do diretório
    const files = fs.readdirSync(productsDir);
    
    // Filtra apenas arquivos JSON (exclui diretórios e outros arquivos)
    const jsonFiles = files.filter(file => 
      file.endsWith('.json') && fs.statSync(path.join(productsDir, file)).isFile()
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(jsonFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao listar produtos' })
    };
  }
};