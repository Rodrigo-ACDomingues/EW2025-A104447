var Projeto = require('../models/projeto')

module.exports.findAll = () => {
    return Projeto.find().exec()
}

module.exports.findByUC = (uc) => {
    return Projeto.find({uc : uc}).exec()
}

module.exports.findById = (id) => {
    return Projeto.findById(id).exec()
}