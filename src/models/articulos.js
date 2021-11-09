const mongoose = require("mongoose");
const articuloSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    marca:{
        type:String,
        required:false
    },
    stock:{
        type:Number,
        required:false
    }
});

module.exports = mongoose.model('Articulo',articuloSchema)