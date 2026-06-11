import {
    obtVentaTodo,
    obtVenta,
    obtDetalleVenta,
    obtProductoVenta,
    insertaVenta,
    insertaDetalleVenta,
    descuentaStock,
    cancelaVenta
} from '../modelos/ventaModelo.js';

export const obtVentas = async (req, res) => {
    try {
        const ventas = await obtVentaTodo();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtVentaPorID = async (req, res) => {
    try {
        const venta = await obtVenta(req.params.id);

        if (!venta)
            return res.status(404).json({ error: 'Venta no encontrada' });

        const detallesDB = await obtDetalleVenta(req.params.id);

        res.status(200).json({
            ...venta,
            detalles: detallesDB
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertarVenta = async (req, res) => {
    try {

        const { cliente_id, usuario_id, detalles: detallesReq} = req.body;

        if (!usuario_id)
            return res.status(400).json({ error: 'usuario_id requerido' });

        if (!Array.isArray(detallesReq) || detallesReq.length === 0)
            return res.status(400).json({ error: 'detalles inválidos' });

        let total = 0;
        let datos = [];

        for (const d of detallesReq) {

            if (!d.producto_id || !d.cantidad || d.cantidad <= 0)
                return res.status(400).json({ error: 'detalle inválido' });

            const producto = await obtProductoVenta(d.producto_id);

            if (!producto)
                return res.status(404).json({
                    error: `Producto ${d.producto_id} no existe`
                });

            if (producto.stock < d.cantidad)
                return res.status(400).json({
                    error: `Stock insuficiente en producto ${d.producto_id}`
                });

            total += producto.precio * d.cantidad;

            datos.push({
                producto_id: d.producto_id,
                cantidad: d.cantidad,
                precio_unitario: producto.precio
            });
        }

        const venta_id = await insertaVenta(cliente_id, usuario_id, total);

        for (const d of datos) {
            await insertaDetalleVenta(
                venta_id,
                d.producto_id,
                d.cantidad,
                d.precio_unitario
            );

            await descuentaStock(d.producto_id, d.cantidad);
        }

        const venta = await obtVenta(venta_id);
        const detallesDB = await obtDetalleVenta(venta_id);

        res.status(201).json({...venta, detalles: detallesDB });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const cancelarVenta = async (req, res) => {
    try {
        const venta = await obtVenta(req.params.id);

        if (!venta)
            return res.status(404).json({ error: 'Venta no encontrada' });

        await cancelaVenta(req.params.id);

        res.status(200).json({ mensaje: 'Venta cancelada correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};