const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, confirmarContraseña } = req.body;

    // Verifica si las contraseñas coinciden
    if (password !== confirmarContraseña) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password,
    });

    await nuevoUsuario.save();

    // Generar token JWT
    const token = jwt.sign({ userId: nuevoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Hubo un error interno en el servidor' });
  }
};

// Login de usuario
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    // Verifica si el usuario existe
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verifica la contraseña
    const contraseñaValida = await usuario.compararContraseña(password);

    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Genera token JWT
    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Hubo un error interno en el servidor' });
  }
};
