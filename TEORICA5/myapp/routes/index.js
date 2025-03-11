var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', 
    { title: 'Engenharia Web 2025',
      docente: 'jcr',
      instituicao: 'DI-UM'
     });
});

module.exports = router;
