// netlify/functions/list-productos.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // Caminho absoluto mais confiável
    const baseDir = process.env.NETLIFY_BUILD_BASE || process.cwd();
    const productsDir = path.join(baseDir, 'data', 'produtos');
    
    // Debug: verifique se o caminho está correto
    console.log('Tentando acessar o diretório:', productsDir);

    if (!fs.existsSync(productsDir)) {
      throw new Error(`Diretório não encontrado: ${productsDir}`);
    }

    const files = fs.readdirSync(productsDir);
    const jsonFiles = files.filter(file => 
      file.endsWith('.json') && 
      fs.statSync(path.join(productsDir, file)).isFile()
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
      body: JSON.stringify({ 
        error: 'Erro ao listar produtos',
        details: error.message,
        currentDir: process.cwd(),
        dirContents: fs.existsSync('data') ? fs.readdirSync('data') : 'data não existe'
      })
    };
  }
};