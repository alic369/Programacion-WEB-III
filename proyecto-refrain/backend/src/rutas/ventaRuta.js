import express from 'express';

import {
    obtVentas,
    obtVentaPorID,
    insertarVenta,
    cancelarVenta
} from '../controladores/ventaControlador.js';

const router = express.Router();

router.get('/', obtVentas);
router.get('/:id', obtVentaPorID);

router.post('/', insertarVenta);

router.patch('/:id/cancelar', cancelarVenta);

export default router;