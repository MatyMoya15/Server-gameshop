const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Antes de guardar el usuario, hasheamos la contraseña
UsuarioSchema.pre('save', async function (next) {
    const usuario = this;
    if (usuario.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
    }
    next();
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararContraseña = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
