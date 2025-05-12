var express = require('express');
var router = express.Router();
var Entrega = require('../controllers/entrega');
var multer = require('multer');
var fs = require('fs');
var jszip = require('jszip');
var xml2js = require('xml2js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Entrega.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).jsonp(err))

    //TODO: GET /entregas/projeto
});

router.get('/:id', function(req, res, next) {
  Entrega.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).jsonp(err))
});

router.post('/', multer.single('file'), function(req, res, next) {
  var oldPath = __dirname + '/../' + req.file.path;
  console.log(oldPath);

  var zipData = fs.readFileSync(oldPath);

  jszip.loadAsync(zipData)
    .then(zip =>  {
      zip.file('PR.xml').async('string')
        .then(xmlContent => {
          parser = new xml2js.Parser({explicitArray : false})
          parser.parseString(xmlContent, (err, result) => {
            if (err) res.status(500).jsonp(err);

            var newPath = __dirname + `/../public/fileStore/${result.pr.metadata.projeto[0]}/${req.file.originalname}`;
            console.log(newPath);

            fs.rename(oldPath, newPath, err => {
              if (err) throw err;
            });

            var entrega = {
              _id: result.pr.metadata.id,
              date: new Date(),
              uc: result.pr.metadata.uc,
              projeto: result.pr.metadata.projeto,
              titulo: result.pr.metadata.titulo,
              equipa_id: result.pr.equipa.id,
              equipa_desc: result.pr.equipa.nome,
              file: newPath,
              obs: result.pr.obs
            }

            Entrega.save(entrega)
              .then(data => res.status(201).jsonp(data))
              .catch(err => res.status(500).jsonp(err))
          })
        })
        .catch(err => res.status(500).jsonp(err))
    })
    .catch(err => res.status(500).jsonp(err))
})

router.put('/:id', function(req, res, next) {
  Entrega.update(req.params.id, req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).jsonp(err))
});

router.delete('/:id', function(req, res, next) {
  Entrega.deleteById(req.params.id, req.body.justificacao)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).jsonp(err))
});

module.exports = router;
