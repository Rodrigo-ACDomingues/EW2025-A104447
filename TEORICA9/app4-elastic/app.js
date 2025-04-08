const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiros', upload.array('myFile'), function (req, res) {
    console.log("Informação sobre os ficheiros:")
    console.log(JSON.stringify(req.files))
    console.log("Informação sobre os campos textuais: ")
    console.log(JSON.stringify(req.body))
    
    req.files.forEach((f) => {
        console.log('cdir: ' + __dirname)
        let oldPath = __dirname + '/' + f.path
        console.log('oldPath: ' + oldPath)
        let newPath = __dirname + '/public/fileStore/' + f.originalname
        console.log('newPath: ' + newPath)

        fs.rename(oldPath, newPath, function(error) {
            if (error) throw error
        })
    });


    res.send(`<p>Got ${req.files.length} files.</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



