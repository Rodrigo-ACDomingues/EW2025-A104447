const http = require('http');
const meta = require('./auxi');

http.createServer((req, resp) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);

    switch(req.method) {
        case 'GET':
            switch(req.url) {
                case '/data':
                    resp.write(200, {'Content-Type' : 'text/html;charset=utf-8'});
                    resp.write("<p>Olá turma de 2025!</p>");
                    break;
                default :
                    resp.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    break;
            }

            default :
                resp.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
                break;
        }

    resp.end();
}).listen(1234);

console.log("Server listening on port 1234.")