import { pool } from '../config/bd.js';

export const obtCategoriaTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT * FROM categoria');
    return resultado;
};

export const obtCategoriasActiva = async () => {
    const [resultado] = await pool.query(
        'SELECT * FROM categoria WHERE activo = TRUE'
    );
    return resultado;
};

export const obtCategoria = async (id) => {
    const [resultado] = await pool.query(
        'SELECT * FROM categoria WHERE id = ?',
        [id]
    );

    return resultado[0];
};

export const obtFiltros = async (filtros) => {
    let conditions = [];
    let params = [];

    if (filtros.nombre) {
        conditions.push('nombre LIKE ?');
        params.push(`%${filtros.nombre}%`);
    }

    if (filtros.activo !== undefined) {
        conditions.push('activo = ?');
        params.push(filtros.activo === 'true');
    }

    let sql = 'SELECT * FROM categoria';

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [resultado] = await pool.query(sql, params);

    return resultado;
};

export const insertaCategoria = async (categoria) => {
    const { nombre, descripcion, imagen_url } = categoria;

    const [resultado] = await pool.query(
        `INSERT INTO categoria
        (nombre, descripcion, imagen_url)
        VALUES (?,?,?)`,
        [nombre, descripcion, imagen_url]
    );

    return await obtCategoria(resultado.insertId);
};

export const activaCategoria = async (id) => {
    await pool.query(
        'UPDATE categoria SET activo = TRUE WHERE id = ?',
        [id]
    );
};

export const desactivaCategoria = async (id) => {
    await pool.query(
        'UPDATE categoria SET activo = FALSE WHERE id = ?',
        [id]
    );
};

export const actualizaCategoria = async (id, categoria) => {

    let campos = [];
    let params = [];

    if (categoria.nombre !== undefined) {
        campos.push('nombre = ?');
        params.push(categoria.nombre);
    }

    if (categoria.descripcion !== undefined) {
        campos.push('descripcion = ?');
        params.push(categoria.descripcion);
    }

    if (categoria.imagen_url !== undefined) {
        campos.push('imagen_url = ?');
        params.push(categoria.imagen_url);
    }

    if (campos.length === 0) {
        return null;
    }

    const sql = `
        UPDATE categoria
        SET ${campos.join(', ')}
        WHERE id = ?
    `;

    params.push(id);

    await pool.query(sql, params);

    return await obtCategoria(id);
};

export const eliminaCategoria = async (id) => {
    await pool.query(
        'DELETE FROM categoria WHERE id = ?',
        [id]
    );

    return id;
};