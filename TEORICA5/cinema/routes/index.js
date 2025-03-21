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

router.get('/filmes/delete/:id', function(req, res) {
  axios.delete('http://localhost:3000/filmes/' + req.params.id)
    .then(() => {
      res.status(200).redirect('/filmes')
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
})

router.get('/filmes/edit/:id', function(req, res) {
  axios.get('http://localhost:3000/filmes/' + req.params.id)
    .then(resp => {
      res.status(200).render('editFilme', {'filme' : resp.data})
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
})

router.post('/filmes/edit/:id', function(req, res) {

  if (!Array.isArray(req.body.cast)) {
    req.body.cast = [req.body.cast];
  }

  if (!Array.isArray(req.body.genres)) {
    req.body.genres = [req.body.genres];
  }

  axios.put('http://localhost:3000/filmes/' + req.params.id, req.body)
    .then(resp => {
      console.log(resp.data)
      res.status(200).redirect('/filmes')
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
})

module.exports = router;

