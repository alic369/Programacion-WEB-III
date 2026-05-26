import mysql from 'mysql2/promise';

//Conexion a MySQL
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatos'
});