import { pool } from '../config/bd.js';

export const obtVentaTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT * FROM venta');
    return resultado;
};

export const obtVenta = async (id) => {
    const [resultado] = await pool.query(
        'SELECT * FROM venta WHERE id = ?',
        [id]
    );
    return resultado[0];
};

export const obtDetalleVenta = async (venta_id) => {
    const [resultado] = await pool.query(
        'SELECT * FROM detalle_venta WHERE venta_id = ?',
        [venta_id]
    );
    return resultado;
};

export const obtProductoVenta = async (id) => {
    const [resultado] = await pool.query(
        'SELECT id, precio, stock FROM producto WHERE id = ?',
        [id]
    );
    return resultado[0];
};

export const insertaVenta = async (cliente_id, usuario_id, total) => {
    const [resultado] = await pool.query(
        `INSERT INTO venta (cliente_id, usuario_id, total)
         VALUES (?,?,?)`,
        [cliente_id || null, usuario_id, total]
    );

    return resultado.insertId;
};

export const insertaDetalleVenta = async (
    venta_id,
    producto_id,
    cantidad,
    precio_unitario
) => {
    await pool.query(
        `INSERT INTO detalle_venta
        (venta_id, producto_id, cantidad, precio_unitario)
        VALUES (?,?,?,?)`,
        [venta_id, producto_id, cantidad, precio_unitario]
    );
};

export const descuentaStock = async (producto_id, cantidad) => {
    await pool.query(
        `UPDATE producto
         SET stock = stock - ?
         WHERE id = ?`,
        [cantidad, producto_id]
    );
};

export const cancelaVenta = async (id) => {
    await pool.query(
        `UPDATE venta SET cancelada = TRUE WHERE id = ?`,
        [id]
    );
};