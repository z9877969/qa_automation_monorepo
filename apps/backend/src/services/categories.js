import { getPool } from '../db/initMySQLConnection.js';

export const getCategories = async () => {
  const pool = getPool();
  const [categories] = await pool.query('SELECT id, name FROM categories ORDER BY name');
  return categories;
};
