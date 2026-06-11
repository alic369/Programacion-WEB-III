import { pool } from '../config/bd.js';

export const obtClienteTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT * FROM cliente'
    );

    return resultado;
};

export const obtCliente = async (id) => {
    const [resultado] = await pool.query(
        'SELECT * FROM cliente WHERE id = ?',
        [id]
    );

    return resultado[0];
};

export const obtClientePorEmail = async (email) => {
    const [resultado] = await pool.query(
        'SELECT * FROM cliente WHERE email = ?',
        [email]
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

    if (filtros.email) {
        conditions.push('email LIKE ?');
        params.push(`%${filtros.email}%`);
    }

    if (filtros.telefono) {
        conditions.push('telefono LIKE ?');
        params.push(`%${filtros.telefono}%`);
    }

    let sql = 'SELECT * FROM cliente';

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [resultado] = await pool.query(sql, params);

    return resultado;
};

export const insertaCliente = async (cliente) => {

    const {
        nombre,
        email,
        telefono
    } = cliente;

    const [resultado] = await pool.query(
        `INSERT INTO cliente
        (nombre, email, telefono)
        VALUES (?,?,?)`,
        [nombre, email, telefono]
    );

    return await obtCliente(resultado.insertId);
};

export const actualizaCliente = async (id, cliente) => {

    let campos = [];
    let params = [];

    if (cliente.nombre !== undefined) {
        campos.push('nombre = ?');
        params.push(cliente.nombre);
    }

    if (cliente.email !== undefined) {
        campos.push('email = ?');
        params.push(cliente.email);
    }

    if (cliente.telefono !== undefined) {
        campos.push('telefono = ?');
        params.push(cliente.telefono);
    }

    if (campos.length === 0) {
        return null;
    }

    const sql = `
        UPDATE cliente
        SET ${campos.join(', ')}
        WHERE id = ?
    `;

    params.push(id);

    await pool.query(sql, params);

    return await obtCliente(id);
};

export const eliminaCliente = async (id) => {

    await pool.query(
        'DELETE FROM cliente WHERE id = ?',
        [id]
    );

    return id;
};