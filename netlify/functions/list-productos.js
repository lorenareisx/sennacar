// netlify/functions/list-productos.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  console.log('Iniciando função list-productos'); // Log de debug
  
  try {
    // Ajuste o caminho para garantir que está correto
    const productsDir = path.join(process.cwd(), 'data', 'produtos');
    console.log('Tentando acessar:', productsDir); // Log do caminho

    // Verifica se o diretório existe
    if (!fs.existsSync(productsDir)) {
      console.error('Diretório não encontrado:', productsDir);
      throw new Error('Diretório de produtos não encontrado');
    }

    const files = fs.readdirSync(productsDir);
    console.log('Arquivos encontrados:', files); // Log dos arquivos

    const jsonFiles = files.filter(file => {
      const filePath = path.join(productsDir, file);
      return file.endsWith('.json') && fs.statSync(filePath).isFile();
    });

    console.log('Arquivos JSON filtrados:', jsonFiles); // Log final

    return {
      statusCode: 200,
      body: JSON.stringify(jsonFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Erro na função:', error); // Log de erro detalhado
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erro ao listar produtos',
        details: error.message 
      })
    };
  }
};