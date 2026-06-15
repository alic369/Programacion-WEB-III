import { pool } from '../config/bd.js';

export const obtTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT id, nombre, email, rol, activo FROM usuario');
    return resultado;
};

export const obtEmpleadoTodo = async () => {
    const [resultado] = await pool.query(
        'SELECT id, nombre, email, activo FROM usuario WHERE rol like "empleado"');
    return resultado;
};

export const obtEmpleadosActivo = async () => {
    const [resultado] = await pool.query(
      'SELECT id, nombre, email FROM usuario WHERE activo = TRUE AND rol like "empleado"'
    );
    return resultado;
};

export const obtEmpleado = async (id) => {
    const [resultado] = await pool.query(
        'SELECT id, nombre, email, activo FROM usuario WHERE id = ? AND rol like "empleado"', [id]);
    return resultado[0];
};

export const obtDueno = async (id) => {
    const [resultado] = await pool.query(
        'SELECT id, nombre, email, activo FROM usuario WHERE id = ? AND rol like "dueno"', [id]);
    return resultado[0];
};

export const obtUsuarioPorEmail = async (email) => {
    const [resultado] = await pool.query(
        'SELECT * FROM usuario WHERE email = ?', [email]);
    return resultado[0];
};

export const registraEmpleado = async (empleado) => {
    const {nombre, email, pwdu} = empleado;
    const [resultado] = await pool.query(
        'INSERT INTO usuario(nombre, email, pwdu) VALUES (?,?,?)',
        [nombre, email, pwdu]);

    return await obtEmpleado(resultado.insertId);
};

export const registraDueno = async (dueno) => {
    const {nombre, email, pwdu} = dueno;
    const [resultado] = await pool.query(
        'INSERT INTO usuario(nombre, email, pwdu, rol) VALUES (?,?,?,?)',
        [nombre, email, pwdu, 'dueno']);

    return await obtDueno(resultado.insertId);
};

export const desactivaEmpleado = async (id) => {
    await pool.query(
        'UPDATE usuario SET activo = FALSE WHERE id = ? AND rol = "empleado"',[id]);
};

export const activaEmpleado = async (id) => {
    await pool.query(
        'UPDATE usuario SET activo = TRUE WHERE id = ? AND rol = "empleado"',[id]);
};

export const modificaEmpleado = async (id, empleado) => {

    let campos = [];
    let params = [];

    if (empleado.nombre !== undefined) {
        campos.push('nombre = ?');
        params.push(empleado.nombre);
    }

    if (empleado.email !== undefined) {
        campos.push('email = ?');
        params.push(empleado.email);
    }

    if (campos.length === 0) {
        return null;
    }

    const sql = `UPDATE usuario
                SET ${campos.join(', ')}
                WHERE id = ? AND rol = "empleado" `;

    params.push(id);

    await pool.query(sql, params);

    return await obtEmpleado(id);
};

export const eliminaEmpleado = async (id) => {
    await pool.query(
        'DELETE FROM usuario WHERE id = ? AND rol like "empleado"', [id]);
    return id;
};

