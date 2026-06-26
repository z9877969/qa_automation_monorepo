import { getPool } from '../db/initMySQLConnection.js';

export const getCurrentUserController = async (req, res) => {
  const user = req.user;
  const pool = getPool();

  const [favRows] = await pool.query(
    'SELECT recipe_id FROM user_favorites WHERE user_id = ?',
    [user.id],
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully found user',
    data: { ...user, favorites: favRows.map(r => r.recipe_id) },
  });
};
