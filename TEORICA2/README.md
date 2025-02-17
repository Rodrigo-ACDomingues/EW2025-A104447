# Aula 2

# Dependencias

npm install <nome> --save 
dependencias de produção são as necessárias para meter o programa a correr

npm install <nome> --save-dev 
dependencias de desenvolvimento como por exemplo modulos de debbuging devem ser salvos aqui pq para o produto final estes nao interessam


# nodejs:json-server Fast API
Serve para testar ideias de forma rápida (vamos dar json-server na primeira parte do semestre)

Uma API é uma interface entre uma base de dados e um browser.

CRUD
Create - inserir (POST)
Retrieve - consultar, listar e pesquisar (GET)
Update - alterar (PUT)
Delete - apagar (DELETE)

# json-server: installation
npm install -g json-server@0.17.4


# json-server: operators - filtering
http://.../.../...?
?data=2025-02-07&ano=3
?nome=Ana

Retrieve all students that study guitar
GET http://localhost:3000/alunos?instrumento=Guitarra

# json-server: pagination
_page and _limit parameters
In the link header you'll get first,prev, next and last links.
GET http://localhost:3000/alunos_page=2

# json-server: ordering
_sort and _order parameters
GET http://localhost:3000/alunos?_sort=id&_order=asc

# json-server: slicing
_start and _limit parameters
GET http://localhost:3000/alunos?_start=100&_limit=6

# Para o TPC desta Semana
1. json-server

2. Aplicação em nodejs (vamos dar na aula pratica 11-02-2025)

