import express from 'express';
import path from "path";
import cors from 'cors';

import productoRuta from './src/rutas/productoRuta.js';
import categoriaRuta from './src/rutas/categoriaRuta.js';
import clienteRuta from './src/rutas/clienteRuta.js';
import usuarioRuta from './src/rutas/usuarioRuta.js';
import ventaRuta from './src/rutas/ventaRuta.js';
import authRuta from './src/rutas/auth.js';

import { pool } from './src/config/bd.js';

const app = express();
app.set("trust proxy", true);

// middleware
app.use(cors());
app.use(express.json());

// subida de archivos
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// auth
app.use('/auth', authRuta);

// rutas
app.use('/productos', productoRuta);
app.use('/categorias', categoriaRuta);
app.use('/clientes', clienteRuta);
app.use('/usuarios', usuarioRuta);
app.use('/ventas', ventaRuta);

// test DB
/*
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            error: 'Error conectando a la base de datos',
            detail: error.message
        });
    }
});
*/

// servidor
const PUERTO = 3001;

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});