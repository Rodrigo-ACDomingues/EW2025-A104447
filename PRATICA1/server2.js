const http = require('http');
const meta = require('./auxi');

http.createServer((req, resp) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);

    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
    resp.write("<p>Olá turma de 2025!</p>");

    switch(req.url) {
        case '/data':
            resp.write(meta.myDateTime());
            break;
        case '/nome':
            resp.write(meta.myName());
            break;
        case '/turma':
            resp.write(meta.turma);
            break;
        default : break;
    }

    resp.end();
}).listen(1234);

console.log("Server listening on port 1234.")

//Assim estamos a escrever em html a mensagem