const fs = require('fs');

// Ler o arquivo db.json
const data = JSON.parse(fs.readFileSync('cinema.json', 'utf8'));

// Verificar se a chave "filmes" existe
if (!data.filmes) {
  console.error("❌ Erro: A chave 'filmes' não foi encontrada no db.json!");
  process.exit(1);
}

// Adicionar um ID único para cada filme
data.filmes = data.filmes.map((filme, index) => ({
  id: index + 1, // Gera IDs sequenciais (1, 2, 3...)
  ...filme
}));

// Escrever de volta no db.json
fs.writeFileSync('cinema.json', JSON.stringify(data, null, 2));

console.log("✅ IDs adicionados com sucesso!");
