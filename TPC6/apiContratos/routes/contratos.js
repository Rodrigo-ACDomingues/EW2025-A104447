var express = require('express');
var router = express.Router();
var contrato = require('../controllers/contrato')

// Rota principal que renderiza a página inicial com todos os contratos
router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    contrato.getContratosByEntidade(req.query.entidade)
      .then(data => res.status(200).render('index', { contratos: data })) // Passa os contratos para o index.pug
      .catch(erro => res.status(500).jsonp(erro));
  }
  else if (req.query.tipo) {
    contrato.getContratosByTipo(req.query.tipo)
      .then(data => res.status(200).render('index', { contratos: data })) // Passa os contratos para o index.pug
      .catch(erro => res.status(500).jsonp(erro));
  }
  else {
    contrato.getContratos()
      .then(data => res.status(200).render('index', { contratos: data })) // Passa todos os contratos para o index.pug
      .catch(erro => res.status(500).jsonp(erro));
  }
});

// Rota para ver os detalhes de um contrato
router.get('/:id', function(req, res, next) {
  contrato.getContratosById(req.params.id)
    .then(data => {res.status(200).render('contratos', { contrato: data })})
    .catch(erro => res.status(500).jsonp(erro));
});

// Rota para ver os detalhes de uma entidade
router.get('/entidades/:nipc', function(req, res, next) {
  contrato.getContratosByNIPC(req.params.nipc)
    .then(data => {let total = data.reduce((sum, contrato) => sum + parseFloat(contrato.precoContratual), 0);
    res.status(200).render('entidades', { contratos: data, nipc: req.params.nipc, entidade: data[0].entidade_comunicante, total: total})})
    .catch(erro => res.status(500).jsonp(erro));
});

// Rota para obter as entidades
router.get('/entidades', function(req, res, next) {
  contrato.getEntidades()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// Rota para obter os tipos de contratos
router.get('/tipos', function(req, res, next) {
  contrato.getTipos()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// Post para inserir um novo contrato
router.post('/', function(req, res, next) {
  contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// Delete para remover um contrato
router.delete('/:id', function(req, res, next) {
  contrato.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// PUT para atualizar um contrato
router.put('/:id', function(req, res, next) {
  contrato.update(req.body, req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
