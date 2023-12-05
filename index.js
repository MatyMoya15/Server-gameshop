const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario');
const productoRoutes = require('./routes/producto');
const juegoRoutes = require('./routes/juego');

const app = express();

conectarDB();
app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);
app.use('/api/juegos', juegoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
