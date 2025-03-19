const mongoose = require("mongoose");
const ArqSonSchema = new mongoose.Schema({
    prov: {type: String, required: true }, //Provincia
    local: {type: String, required: true }, //Localidade
    tit: {type: String, required: true }, // Titulo
    musico: {type: String}, //Musico (pode ser nulo)
    

})