import { pool } from "../config/bd.js";

export const registraLog = async (usuario_id, ip, navegador, evento) => {

    await pool.query(
        `INSERT INTO log_acceso
        (usuario_id, ip, navegador, evento)
        VALUES (?,?,?,?)`,
        [
            usuario_id,
            ip,
            navegador,
            evento
        ]
    );

};