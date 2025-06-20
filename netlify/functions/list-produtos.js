const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    // Ajuste o caminho conforme sua estrutura
    const files = fs.readdirSync(path.join(process.cwd(), 'data', 'produtos'));
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    return {
      statusCode: 200,
      body: JSON.stringify(jsonFiles)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};