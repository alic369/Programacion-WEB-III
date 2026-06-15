import express from 'express';
import {
    obtProductos,
    obtProductosDisponibles,
    obtProductoPorID,
    obtConFiltros,
    insertarProducto,
    activarProducto,
    desactivarProducto,
    actualizarProducto,
    eliminarProducto
} from '../controladores/productoControlador.js';

const rutas = express.Router();

rutas.get('/activos', obtProductosDisponibles);
rutas.get('/buscar', obtConFiltros);
rutas.get('/', obtProductos);
rutas.get('/:id', obtProductoPorID);

rutas.post('/', insertarProducto);

rutas.patch('/:id', actualizarProducto);

rutas.patch('/:id/activar', activarProducto);
rutas.patch('/:id/desactivar', desactivarProducto);

rutas.delete('/:id', eliminarProducto);

export default rutas;