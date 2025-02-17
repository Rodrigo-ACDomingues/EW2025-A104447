const http = require('http');

http.createServer((req, resp) => {
    resp.writeHead(200, {'content-type':'text/plain;charset=utf8'});
    resp.write("Ola turma de 2025!");
    resp.end();
}).listen(1234);

console.log("Server listening on port 1234.")

//Assim estamos a escrever em texto a mensagem