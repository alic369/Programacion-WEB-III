import express from 'express';
import {
    obtUsuarios,
    obtEmpleados,
    obtEmpleadosActivos,
    obtEmpleadoPorID,
    
    registrarEmpleado,
    registrarDueno,
    activarEmpleado,
    desactivarEmpleado,
    modificarEmpleado,
    eliminarEmpleado
} from "../controladores/usuarioControlador.js";

const rutas = express.Router();

rutas.get('/activos', obtEmpleadosActivos);
rutas.get('/empleados', obtEmpleados);
rutas.get('/', obtUsuarios);
rutas.get('/:id', obtEmpleadoPorID);

rutas.post('/admin', registrarDueno);
rutas.post('/empleado', registrarEmpleado);

rutas.patch('/:id', modificarEmpleado);
rutas.patch('/:id/activar', activarEmpleado);
rutas.patch('/:id/desactivar', desactivarEmpleado);

rutas.delete('/:id', eliminarEmpleado);

export default rutas;