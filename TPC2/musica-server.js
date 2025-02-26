import { createServer } from 'http'
import axios from 'axios';
import { genMainPage, genAlunosPage, genCursosPage, genInstrumentosPage } from './musicapages.js'
import { readFile } from 'fs'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()  
    }
    else if(req.url == '/alunos'){
        axios.get('http://localhost:3000/alunos')
            .then(function(resp){
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genAlunosPage(alunos , d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/cursos'){
        axios.get('http://localhost:3000/cursos')
            .then(function(resp){
                var cursos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genCursosPage(cursos , d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/instrumentos'){
        axios.get('http://localhost:3000/instrumentos')
            .then(function(resp){
                var instrumentos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genInstrumentosPage(instrumentos , d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/cursos\/[%a-zA-Z0-9]+$/)){
        var curso = req.url.split('/')[2]
        curso = curso.replace('%20', ' ')
        axios.get(`http://localhost:3000/alunos?curso=` + curso)
            .then(function(resp){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genAlunosPage(resp.data, curso, null, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/instrumentos\/[%a-zA-Z0-9]+$/)){
        var instrumento = req.url.split('/')[2]
        instrumento = instrumento.replace('%20', ' ')
        axios.get(`http://localhost:3000/alunos?instrumento=` + instrumento)
            .then(function(resp){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genAlunosPage(resp.data, null, instrumento, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }

}).listen(3001)

console.log('Servidor à escuta na porta 3001...')

