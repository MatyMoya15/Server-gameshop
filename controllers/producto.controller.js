const mongoose = require('mongoose');
const Producto = require('../models/Producto');

exports.crearProducto = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        let producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.obtenerProductos = async(req, res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.actualizarProducto = async(req, res)=>{
    
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        if (!nombre || !categoria || !ubicacion || !precio) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.nombre = nombre
        producto.categoria = categoria
        producto.ubicacion = ubicacion
        producto.precio = precio

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, producto, {new: true})
        res.json(producto);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.obtenerProducto = async(req, res)=>{
    
    try {
        const {nombre, categoria, ubicacion, precio} = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        
        res.json(producto);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await Producto.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Producto Eliminado' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error interno en el servidor' });
    }
}