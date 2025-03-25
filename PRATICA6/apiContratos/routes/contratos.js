var express = require('express');
var router = express.Router();
var contrato = require('../controllers/contrato')

/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.query.entidade){
    contrato.getContratosByEntidade(req.query.entidade)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else if(req.query.tipo){
    contrato.getContratosByTipo(req.query.tipo)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else {
    contrato.getContratos()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
  }
});

// GET entidades ordenadas alfabeticamente

router.get('/entidades', function(req, res, next) {
  contrato.getEntidades()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

// GET tipos ordenadas alfabeticamente

router.get('/tipos', function(req, res, next) {
  contrato.getTipos()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

// GET Contrato by ID

router.get('/:id', function(req, res, next) {
  contrato.getContratosById(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

// POST inserir novo contrato

router.post('/', function(req, res, next) {
  contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

// PUT contrato

router.put('/:id', function(req, res, next) {
  contrato.update(req.body, req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

// DELETE contrato

router.delete('/:id', function(req, res, next) {
  contrato.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
