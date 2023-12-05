const mongoose = require('mongoose');
const Juego = require('../models/Juego'); // Asegúrate de importar el modelo

exports.crearJuego = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        let juego = new Juego(req.body);
        await juego.save();
        res.status(201).json(juego);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}


exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.json(juegos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.actualizarJuego = async (req, res) => {
    try {
        const { nombre, price, discount, img, stock } = req.body;
        if (!nombre || !price || !img || !stock) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        let juego = await Juego.findById(req.params.id);

        if (!juego) {
            return res.status(404).json({ msg: 'No existe el juego' });
        }

        juego.nombre = nombre;
        juego.price = price;
        juego.discount = discount;
        juego.img = img;
        juego.stock = stock;

        juego = await Juego.findOneAndUpdate({ _id: req.params.id }, juego, { new: true });
        res.json(juego);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}


exports.obtenerJuego = async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);

        if (!juego) {
            return res.status(404).json({ msg: 'No existe el juego' });
        }

        res.json(juego);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.eliminarJuego = async (req, res) => {
    try {
        let juego = await Juego.findById(req.params.id);

        if (!juego) {
            return res.status(404).json({ msg: 'No existe el juego' });
        }

        await Juego.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Juego Eliminado' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}


exports.obtenerJuegoPorId = async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);

        if (!juego) {
            return res.status(404).json({ msg: 'No existe el juego' });
        }

        res.json(juego);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}
