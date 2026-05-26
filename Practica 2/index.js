import express from "express"; // crea la variable express
import { pool } from "./config/bd.js";

// Middleware
const app = express();  // llama a la función de express,
app.use(express.json()); // Lectura y parseo del body

// Definiendo solicitudes y rutas
// req: solicitudes al servidor
// res: respuesta del servidor

//#1
app.post('/categorias', async (req, res) => {
    const { nombre, descripcion } = req.body;
    await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion] );
    res.status(201).json({ mensaje: 'Categoría creada correctamente' });
});

//#2
app.get('/categorias', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM categorias');
    res.status(200).json(resultado);
});

//#3
app.get('/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const [categoria] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id] );
    const [productos] = await pool.query('SELECT * FROM productos WHERE categoria_id = ?', [id] );
    res.status(200).json({ ...categoria[0], productos });
});

//#4
app.patch('/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;
    await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id] );
    res.status(200).json({ mensaje: 'Categoría actualizada correctamente' });
});

//#5
app.delete('/categorias/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM productos WHERE categoria_id = ?', [id]);
    await pool.query('DELETE FROM categorias WHERE id = ?', [id] );
    res.status(200).json({ mensaje: 'Categoría y productos eliminados correctamente' });
});

//#
app.get('/productos', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM productos');
    res.status(200).json(resultado);
});

// Define un puerto y levanta el servidor
const puerto = 3001;
app.listen(puerto, () => { console.log(`Servidor en http://localhost:${puerto}`);
});