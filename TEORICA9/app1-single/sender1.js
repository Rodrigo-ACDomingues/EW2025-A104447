const   axios = require('axios'),
        FormData = require( "form-data" ),
        fs = require('fs')

const form = new FormData();
const filepath = "../ficheiros-cartoons/coyotte.png"; 
// Adicionar informação ao formulário virtual
// ...
form.append("myFile", fs.createReadStream(filepath));
form.append("desc", "Um cartoon do Coiote!");

axios.post( "http://localhost:15000/ficheiro", form )
    .then(resposta => {
        console.log("Enviado com sucesso.")
        console.log(JSON.stringify(resposta))
    })
    .catch(erro => {
        console.log(JSON.stringify(erro))
    })

  


