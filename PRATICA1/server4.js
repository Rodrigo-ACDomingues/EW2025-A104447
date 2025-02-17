const http = require('http');
const meta = require('./auxi');
const axios = require('axios');

http.createServer((req, resp) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);

    switch(req.method) {
        case 'GET':            
            switch(req.url) {
                case '/cidades':
                    axios.get('http://localhost:3000/cidades?_sort=nome&_order=asc')
                    .then(ans => {
                        var cities = ans.data; 
                        resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                        resp.write("<h1>Cidades</h1>");
                        resp.write("<ul>");
                        cities.forEach(element => {
                            resp.write(`<li>${element.nome}</li>`);
                            //console.log(element);
                        });
                        resp.write("</ul>");
                        resp.end();
                    }).catch(err => {
                        console.log("Error on " + req.url + "=> " + err);
                        resp.writeHead(500, {'content-type':'text/html;charset=utf-8'});
                        //resp.write(err);
                        resp.end();
                    });
                    break;
                case '/ligacoes': 
                    resp.writeHead(501, {'content-type':'text/html;charset=utf-8'}); 
                    resp.end();   
                    break;
                default:
                    resp.writeHead(404, {'content-type':'text/html;charset=utf-8'});
                    resp.end();
                    break;
            };
            //resp.write("<p>OlÃ¡ turma de 2025!</p><i class=\"bi bi-check2\"></i>");
            break;
        
        default:
            resp.writeHead(405, {'content-type':'text/html;charset=utf-8'});
            resp.end();
            break;
    }

    

}).listen(1234);

console.log("Server listening on port 1234.")