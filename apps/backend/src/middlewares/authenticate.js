import createHttpError from 'http-errors';
import { getPool } from '../db/initMySQLConnection.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  const pool = getPool();
  const [[session]] = await pool.query(
    'SELECT * FROM sessions WHERE access_token = ?',
    [token],
  );

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.access_token_valid_until)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const [[user]] = await pool.query(
    'SELECT id, name, email, avatar, created_at, updated_at FROM users WHERE id = ?',
    [session.user_id],
  );

  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;
  next();
};
