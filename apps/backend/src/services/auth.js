import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { getPool } from '../db/initMySQLConnection.js';

export const registerUser = async (payload) => {
  const pool = getPool();

  const [[existing]] = await pool.query(
    'SELECT id FROM users WHERE email = ?',
    [payload.email],
  );
  if (existing) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [payload.name, payload.email, hashedPassword],
  );

  const [[user]] = await pool.query(
    'SELECT id, name, email, avatar, created_at, updated_at FROM users WHERE id = ?',
    [result.insertId],
  );

  return user;
};

export const loginUser = async (payload) => {
  const pool = getPool();

  const [[user]] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [payload.email],
  );
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await pool.query('DELETE FROM sessions WHERE user_id = ?', [user.id]);

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

  const [result] = await pool.query(
    `INSERT INTO sessions
       (user_id, access_token, refresh_token, access_token_valid_until, refresh_token_valid_until)
     VALUES (?, ?, ?, ?, ?)`,
    [user.id, accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil],
  );

  return {
    id: result.insertId,
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async ({ sessionId, refreshToken }) => {
  const pool = getPool();
  await pool.query(
    'DELETE FROM sessions WHERE id = ? AND refresh_token = ?',
    [sessionId, refreshToken],
  );
};
