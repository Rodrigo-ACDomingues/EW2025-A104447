var contrato = require('../models/contrato')

module.exports.getContratos = () => {
    return contrato
        .find()
        .exec()
}

module.exports.getContratosById = id => {
    return contrato
        .findById(id)
        .exec()

        /*
        .findOne({_id : id})
        .exec()
        */
    
}

module.exports.getContratosByEntidade = entidade => {
    return contrato.find({entidade_comunicante : entidade}).exec()
}

module.exports.getContratosByNIPC = nipc => {
    return contrato.find({ NIPC_entidade_comunicante: nipc }).exec()
};

module.exports.getEntidades = () => {
    return contrato.find().distinct('entidade_comunicante').sort({entidade_comunicante : 1}).exec()
}

module.exports.getTipos = () => {
    return contrato.find().distinct('tipoprocedimento').sort({tipoprocedimento : 1}).exec()
}

module.exports.insert = contr => {
    var contrToSave = new contrato(contr)
    return contrToSave.save()
}

module.exports.delete = id => {
    return contrato.findByIdAndDelete(id).exec()
}

module.exports.update = (contr, id) => {
    return contrato.findByIdAndUpdate(id, contr, {new : true}).exec()
}