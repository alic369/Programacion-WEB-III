import express from 'express';

import {
    obtCategorias,
    obtCategoriasActivas,
    obtCategoriaPorID,
    obtConFiltros,
    insertarCategoria,
    activarCategoria,
    desactivarCategoria,
    modificarCategoria,
    eliminarCategoria
} from '../controladores/categoriaControlador.js';

const rutas = express.Router();

rutas.get('/activos', obtCategoriasActivas);
rutas.get('/buscar', obtConFiltros);
rutas.get('/', obtCategorias);
rutas.get('/:id', obtCategoriaPorID);

rutas.post('/', insertarCategoria);

rutas.patch('/:id', modificarCategoria);

rutas.patch('/:id/activar', activarCategoria);
rutas.patch('/:id/desactivar', desactivarCategoria);

rutas.delete('/:id', eliminarCategoria);

export default rutas;