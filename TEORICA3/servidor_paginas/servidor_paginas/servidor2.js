import { createServer } from 'http'
import { myName, myDateTime, turma } from './aux.js'

var myServer = createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write("<p>Criada com o node.js por " + 
        myName() + " em " + myDateTime() + " na turma " 
        + turma + "</p>")
    res.end()
})

myServer.listen(7777)
console.log("Servidor à escuta na porta 7777...")