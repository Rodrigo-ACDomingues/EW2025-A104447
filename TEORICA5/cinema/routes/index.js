var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', 
    { title: 'Engenharia Web 2025',
      docente: 'jcr',
      instituicao: 'DI-UM'
     });
});

router.get('/filmes', function(req, res) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
        res.render('filmes', {lfilmes: resp.data, tit: 'Lista de Filmes'})
    })
    .catch(error => {
        console.log(error);
        res.render('error', {error: error})
    });
})

router.get('/filmes/edit/:id', function(req, res) {
  console.log("ID do filme:", req.params.id); // Verifique se o ID está correto aqui
  axios.get(`http://localhost:3000/filmes/${req.params.id}`)
    .then(resp => {
      res.render('editFilme', { filme: resp.data, tit: 'Editar Filme' });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

router.delete('/filmes/:id', function(req, res) {
  axios.delete(`http://localhost:3000/filmes/${req.params.id}`)
    .then(() => {
      res.status(200).send('Filme deleted'); // Respond with a status after deletion
    })
    .catch(error => {
      console.log("Erro ao apagar filme:", error);
      res.status(500).send('Erro ao apagar filme'); // Respond with an error status
    });
});



module.exports = router;

