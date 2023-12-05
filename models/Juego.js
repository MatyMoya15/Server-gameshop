const mongoose = require('mongoose');

const JuegoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    img: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Juego', JuegoSchema);