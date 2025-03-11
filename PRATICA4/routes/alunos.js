var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/alunos?_sort=nome')
    .then(resp => {
      res.status(200).render('studentsListPage', {'slist' : resp.data, 'date' : date})
    })
    .catch(erro => {
      res.status(500).render("error", {'error' : erro})
    })
});

router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render('studentsFormPage', {'date' : date})
});

router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var result = req.body;
  axios.post('http://localhost:3000/alunos', result)
    .then(resp => {
      console.log(resp.data)
      res.status(201).redirect('/alunos')
    })
    .catch(erro => {
      res.status(500).render("error", {'error' : erro})
    })
});




module.exports = router;
