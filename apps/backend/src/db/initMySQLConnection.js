import mysql from 'mysql2/promise';
import { getEnvVar } from '../utils/getEnvVar.js';

let pool;

export const initMySQLConnection = async () => {
  pool = mysql.createPool({
    host: getEnvVar('MYSQL_HOST', 'localhost'),
    port: Number(getEnvVar('MYSQL_PORT', '3306')),
    user: getEnvVar('MYSQL_USER'),
    password: getEnvVar('MYSQL_PASSWORD'),
    database: getEnvVar('MYSQL_DB'),
    waitForConnections: true,
    connectionLimit: 10,
  });

  const conn = await pool.getConnection();
  conn.release();
  console.log('MySQL connection successfully established!');
};

export const getPool = () => pool;
