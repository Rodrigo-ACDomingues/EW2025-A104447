var express = require('express');
var router = express.Router();
var Projeto = require('../controllers/projeto')
var Entrega = require('../controllers/entrega')
const Auth = require('../auth/auth')

/* GET home page. */
router.get('/', Auth.validateDoc, function(req, res, next) {
  if (req.query.uc){
    Projeto.findByUC(req.query.uc)
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  } else {
    Projeto.findAll()
        .then(data => res.status(200).jsonp(data))
        .catch(err => res.status(500).jsonp(err))
  }
});

router.get('/:id', Auth.validateDoc, async function(req, res, next) {
  var nEntrega = await Entrega.countEntregasByProject(req.params.id)

  Projeto.findById(req.params.id)
    .then(data => res.status(200).jsonp({
      ...data.toObject(),
      numero_entregas : nEntrega
    }))
    .catch(err => res.status(500).jsonp(err))
});

module.exports = router;
