const   axios = require('axios'),
        FormData = require( "form-data" ),
        fs = require('fs')

const form = new FormData();
var filepath = "../ficheiros-cartoons/coyotte.png"; 
form.append("myFile", fs.createReadStream(filepath));
form.append("desc", "Uma imagem do coyote");

filepath = "../ficheiros-cartoons/bugs-bunny.jpg";
form.append("myFile", fs.createReadStream(filepath));
form.append("desc", "O coelho mais famoso");

filepath = "../fpessoa/alma.txt"; 
form.append("myFile", fs.createReadStream(filepath));
form.append("desc", "A alma segundo Pessoa...");

filepath = "../fpessoa/arte.txt"; 
form.append("myFile", fs.createReadStream(filepath));
form.append("desc", "A arte segundo Pessoa...");

axios.post( "http://localhost:15002/ficheiros", form )
    .then(resposta => {
        console.log("Enviado com sucesso.")
        console.log(JSON.stringify(resposta.data))
    })
    .catch(erro => {
        console.log(JSON.stringify(erro))
    })

  


