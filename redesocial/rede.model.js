const mongoose = require('mongoose');

const Model = new mongoose.Schema({

    nome : String,
    idade : Number,
    status : String,
    interesses :{ type: [{ name: String}], default: undefined }

});


module.exports = Model;