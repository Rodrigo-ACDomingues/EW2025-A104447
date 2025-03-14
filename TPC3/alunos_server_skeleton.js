// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == '/' || req.url == '/alunos') {
                    axios.get('http://localhost:3000/alunos/')
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(templates.studentsListPage(resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end()
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/(A|PG)\d+$/)) {
                    //TODO
                    res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.end()
                }

                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == '/alunos/registo') {
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }

                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {
                    id = req.url.split('/')[3]
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            aluno = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(templates.studentFormEditPage(aluno, d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end()
                        })
                }

                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/(A|PG)\d+$/)) {
                    id = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(`<p>Registo Eliminado</p>
                            <a href="/alunos/registo">Voltar atras</a>`)
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end()
                        })
                }

                // GET ? -> Lancar um erro
                else {
                    //TODO
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url == '/alunos/registo') {
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.post('http://localhost:3000/alunos', result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write(`<p>Registo Inserido: ${JSON.stringify(resp.data)}</p>
                                <a href="/alunos/registo">Voltar atras</a>`)
                                res.end()
                            })
                            .catch(erro => {
                                console.log(erro)
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.end()
                            })
                        } else { // em caso de tao ter resultado
                            console.log("No body data")
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end()
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put('http://localhost:3000/alunos/' + result.id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write(`<p>Registo Atualizado: ${JSON.stringify(resp.data)}</p>
                                <a href="/alunos/registo">Voltar atras</a>`)
                                res.end()
                            })
                            .catch(erro => {
                                console.log(erro)
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.end()
                            })
                        } else { // em caso de tao ter resultado
                            console.log("No body data")
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end()
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.end()
                }
                break;

            case "PUT":
                // PUT /alunos/:id --------------------------------------------------------------------
                if (req.url.match(/\/alunos\/(A|PG)\d+$/)) {
                    let id = req.url.split('/')[2]
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put('http://localhost:3000/alunos/' + id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write(`<p>Registo Atualizado com Sucesso: ${JSON.stringify(resp.data)}</p>
                                <a href="/alunos">Voltar à lista de alunos</a>`)
                                res.end()
                            })
                            .catch(erro => {
                                console.log(erro)
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write(`<p>Erro ao atualizar o registo.</p>`)
                                res.end()
                            })
                        } else {
                            res.writeHead(400, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(`<p>Erro: Dados do pedido PUT inválidos.</p>`)
                            res.end()
                        }
                    })
                } 
                else {
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(`<p>Recurso não encontrado.</p>`)
                    res.end()
                }
                break
    
            case "DELETE":
                // DELETE /alunos/:id --------------------------------------------------------------------
                if (req.url.match(/\/alunos\/(A|PG)\d+$/)) {
                    let id = req.url.split('/')[2]
                    axios.delete('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(`<p>Registo com id ${id} eliminado com sucesso.</p>
                            <a href="/alunos">Voltar à lista de alunos</a>`)
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(`<p>Erro ao eliminar o registo.</p>`)
                            res.end()
                        })
                } 
                else {
                    res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(`<p>Recurso não encontrado.</p>`)
                    res.end()
                }
                break
                
            default: 
                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write("<p>Método não suportado: " + req.method + "</p>")
                res.end()
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



