# Aula Prática 1

Para iniciar o sv é json-server -w (nome da db)

gte é "greater than equal" (>=)
lte é "lower than equal" (<=)

/cidades?população_gte=1000000 isto significa população maior ou igual a 1M
&população_lte=5000000 isto significa população menor ou igual a 5M
&_sort=nome isto significa ordenar por nome
&_order=desc isto significa de forma descendente

/cidades?população_gte=1000000&população_lte=5000000&_sort=nome&_order=desc

/ligações?origem=C1 indica a origem
&distância_gte=200 indica a distancia minima
&_sort=distância ordenar por distancia
&_limit=1 escolher apenas o primeiro (mais perto de 200km possivel)

/ligacoes?origem=c1&distância_gte=200&_sort=distância&_limit=1

