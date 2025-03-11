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

module.exports = router;

