import { pool } from '../config/bd.js';

export const obtProductoTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT * FROM producto');
    return resultado;
};

export const obtDisponibles = async () => {
    const [resultado] = await pool.query(
      'SELECT * FROM producto WHERE activo = TRUE AND stock > 0'
    );
    return resultado;
};

export const obtProducto = async (id) => {
    const [resultado] = await pool.query(
        'SELECT * FROM producto WHERE id = ?', [id]);
    return resultado[0];
};

export const obtFiltros = async (filtros) => {
    let conditions = [];
    let params = [];

    if (filtros.nombre) {
        conditions.push('nombre LIKE ?');
        params.push(`%${filtros.nombre}%`);
    }

    if (filtros.categoria_id) {
        conditions.push('categoria_id = ?');
        params.push(filtros.categoria_id);
    }

    if (filtros.activo !== undefined) {
        conditions.push('activo = ?');
        params.push(filtros.activo === 'true');
    }

    let sql = 'SELECT * FROM producto';

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [resultado] = await pool.query(sql, params);
    return resultado;
};

export const insertaProducto = async (producto) => {
    const {nombre, precio, stock, categoria_id, imagen_url} = producto;
    const [resultado] = await pool.query(
        'INSERT INTO producto(nombre, precio, stock, categoria_id, imagen_url) VALUES (?,?,?,?,?)',
        [nombre, precio, stock, categoria_id, imagen_url]);

    return await obtProducto(resultado.insertId);
};

export const desactivaProducto = async (id) => {    
    await pool.query(
      `UPDATE producto SET activo = FALSE WHERE id = ?`,
      [id]
    );
};

export const activaProducto = async (id) => {    
    await pool.query(
      `UPDATE producto SET activo = TRUE WHERE id = ?`,
      [id]
    );
};

export const actualizaProducto = async (id, producto) => {

    let campos = [];
    let params = [];

    if (producto.nombre !== undefined) {
        campos.push('nombre = ?');
        params.push(producto.nombre);
    }

    if (producto.precio !== undefined) {
        campos.push('precio = ?');
        params.push(producto.precio);
    }

    if (producto.stock !== undefined) {
        campos.push('stock = ?');
        params.push(producto.stock);
    }

    if (producto.categoria_id !== undefined) {
        campos.push('categoria_id = ?');
        params.push(producto.categoria_id);
    }

    if (producto.imagen_url !== undefined) {
        campos.push('imagen_url = ?');
        params.push(producto.imagen_url);
    }

    if (campos.length === 0) {
        return null;
    }

    const sql =
        `UPDATE producto
         SET ${campos.join(', ')}
         WHERE id = ?`;

    params.push(id);

    await pool.query(sql, params);

    return await obtProducto(id);
};

export const eliminaProducto = async (id) => {
    await pool.query(
        'DELETE FROM producto WHERE id = ?', [id]);
    return id;
};

