var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/alunos?_sort=nome')
    .then(resp => {
      res.status(200).render('studentsListPage', {'slist' : resp.data, 'date' : date})
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});

router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16)
  res.status(200).render('studentFormPage', {'date' : date})
});

router.post('/registo', function(req, res, next) {
  var body = req.body
  axios.post('http://localhost:3000/alunos', body)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/alunos')
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});

router.get('/delete/:idAluno', function(req, res, next) {
  var id = req.params.idAluno
  axios.delete('http://localhost:3000/alunos/' + id)
    .then(() => {
      res.status(200).redirect('/alunos')
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});


router.get('/edit/:idAluno', function(req, res, next) {
  var id = req.params.idAluno
  var date = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/alunos/' + id)
    .then(resp => {
      res.status(200).render('studentFormEditPage', {'aluno' : resp.data, 'date' : date})
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});


router.post('/edit/:idAluno', function(req, res, next) {
  var id = req.params.idAluno
  var body = req.body
  axios.put('http://localhost:3000/alunos/' + id, body)
    .then(resp => {
      console.log(resp.data)
      res.status(200).redirect('/alunos')
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});

router.get('/:idAluno', function(req, res, next) {
  var id = req.params.idAluno
  axios.get('http://localhost:3000/alunos/' + id)
    .then(resp => {
      res.status(200).render('studentPage', {'aluno': resp.data})
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});

module.exports = router;
