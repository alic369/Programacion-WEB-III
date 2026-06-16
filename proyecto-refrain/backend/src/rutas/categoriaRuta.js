import express from 'express';
import crearUpload from '../middleware/upload.js';
import {
    obtCategorias,
    obtCategoriasActivas,
    obtCategoriaPorID,
    obtConFiltros,
    insertarCategoria,
    activarCategoria,
    desactivarCategoria,
    modificarCategoria,
    eliminarCategoria,
    validarInsert,
    validarUpdate
} from '../controladores/categoriaControlador.js';

const rutas = express.Router();
const uploadCategoria = crearUpload("categorias");

rutas.get('/activos', obtCategoriasActivas);
rutas.get('/buscar', obtConFiltros);
rutas.get('/', obtCategorias);
rutas.get('/:id', obtCategoriaPorID);

rutas.patch('/:id/activar', activarCategoria);
rutas.patch('/:id/desactivar', desactivarCategoria);

rutas.post(
    '/',
    (req, res, next) => uploadCategoria.single("imagen")(req, res, next),
    validarInsert,
    insertarCategoria
);

rutas.patch(
    '/:id',
    (req, res, next) => uploadCategoria.single("imagen")(req, res, next),
    validarUpdate,
    modificarCategoria
);

rutas.delete('/:id', eliminarCategoria);

export default rutas;