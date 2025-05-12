var mongoose = require('mongoose');

var entregaSchema = new mongoose.Schema({
    _id : String,
    date : Date,
    uc : String,
    projeto : String,
    titulo : String,
    equipa_id : String,
    equipa_desc : String,
    file : String,
    obs : String,
    data_del : Date,
    justificacao : String
}, {versionKey : false});

module.exports = mongoose.model('hEntrega', hEntregaSchema);