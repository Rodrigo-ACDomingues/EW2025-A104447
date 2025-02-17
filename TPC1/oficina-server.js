import { createServer } from 'http'
import axios from 'axios'
import { genMainPage, genRepPage } from './mypages.js'
import { readFile } from 'fs'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(genMainPage(d))
        res.end()
    } 
    else if (req.url == '/reps') {
        axios.get('http://localhost:3000/reparacoes')
            .then(response => {
                var reps = response.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(genRepPage(reps,d))
                res.write('<ul>')
                reps.forEach(rep => {
                    res.write(`<li>${rep.id}: ${rep.descricao}</li>`)
                })
                res.write('</ul>')
                res.end()
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if(req.url.match(/w3\.css$/))
        readFile("w3.css",function(erro, dados){
        if(erro)
        {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.end(dados)
        }
    })
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(3017)

console.log('Servidor a correr na porta 3017...')
