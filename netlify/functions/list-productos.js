exports.handler = async () => {
  // URL direta para os arquivos no GitHub (bruta, sem API)
  const githubContentUrl = "https://raw.githubusercontent.com/lorenareisx/sennacar/main/data/produtos/";
  
  try {
    // Lista fixa inicial (fallback)
    let files = ["produto1.json", "exemplo.json"];
    
    // Tenta buscar a lista dinâmica (opcional)
    const response = await fetch(`${githubContentUrl}?random=${Date.now()}`);
    const html = await response.text();
    // Extrai .json do HTML (simples, sem API)
    const dynamicFiles = html.match(/href="([^"]+\.json)"/g)?.map(m => m.split('"')[1]) || [];
    if (dynamicFiles.length > 0) files = dynamicFiles;
    
    return { statusCode: 200, body: JSON.stringify(files) };
  } catch (error) {
    return { statusCode: 200, body: JSON.stringify(files) }; // Sem erro, usa fallback
  }
};