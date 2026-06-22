import { getPool } from '../db/initMySQLConnection.js';

export const getIngredients = async () => {
  const pool = getPool();
  const [ingredients] = await pool.query('SELECT id, name, `desc`, img FROM ingredients ORDER BY name');
  return ingredients;
};
