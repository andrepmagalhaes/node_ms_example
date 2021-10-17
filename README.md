# Como rodar

- necessário docker e docker-compose

1. make build para construir as imagens dos containers
2. make up para subir os containers
3. rota de acesso /toEmail recebendo parametros path e targetEmail por query. path: url da api ; targetEmail: endereço de email a receber os dados. Exemplo: http://localhost:8080/toEmail?targetEmail=andrepimentelm@gmail.com&path=https://vtexstore.codeby.com.br/api/catalog_system/pub/products/search
4. make down para desmontar os containers
