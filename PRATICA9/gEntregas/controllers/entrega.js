var express = require('express');
var router = express.Router();
var Entrega = require('../models/entrega');
var multer = require('multer');
var fs = require('fs');
var jszip = require('jszip');
var xml2js = require('xml2js');

module.exports.findAll = () => {
    return Entrega.find().exec()
}

module.exports.findById = (id) => {
    return Entrega.findById(id).exec()
}

module.exports.save = async (entrega) => {
    if(await Entrega.find({_id: entrega._id}).exec().length < 1) {
        var entregaDB = new Entrega(entrega)
        return entregaDB.save()
    }
}

module.exports.update = (id, entrega) => {
    return Entrega.findByIdAndUpdate(id, entrega).exec()
}

module.exports.delete = async (id, justificacao) => {
    var entrega = await Entrega.findByIdAndDelete(id, {new : true})

    var hEntrega = new hEntrega({
        ...entrega,
        date_del : new Date(),
        justificacao : justificacao
    })

    console.log(hEntrega)

    return hEntrega.save()
}