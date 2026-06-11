import express from 'express';

import {
    obtClientes,
    obtClientePorID,
    obtConFiltros,
    insertarCliente,
    modificarCliente,
    eliminarCliente
} from '../controladores/clienteControlador.js';

const rutas = express.Router();

rutas.get('/buscar', obtConFiltros);
rutas.get('/', obtClientes);
rutas.get('/:id', obtClientePorID);

rutas.post('/', insertarCliente);

rutas.patch('/:id', modificarCliente);

rutas.delete('/:id', eliminarCliente);

export default rutas;