import createHttpError from 'http-errors';
import { getPool } from '../db/initMySQLConnection.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const RECIPE_WITH_INGREDIENTS_SQL = `
  SELECT
    r.id, r.title, r.category, r.owner_id, r.area, r.calories,
    r.instructions, r.description, r.thumb, r.time,
    r.created_at, r.updated_at,
    ri.ingredient_id, ri.measure,
    i.name AS ingredient_name, i.\`desc\` AS ingredient_desc, i.img AS ingredient_img
  FROM recipes r
  LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
  LEFT JOIN ingredients i ON i.id = ri.ingredient_id
`;

const groupRecipeRows = (rows) => {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        title: row.title,
        category: row.category,
        owner_id: row.owner_id,
        area: row.area,
        calories: row.calories,
        instructions: row.instructions,
        description: row.description,
        thumb: row.thumb,
        time: row.time,
        created_at: row.created_at,
        updated_at: row.updated_at,
        ingredients: [],
      });
    }
    if (row.ingredient_id) {
      map.get(row.id).ingredients.push({
        id: row.ingredient_id,
        name: row.ingredient_name,
        desc: row.ingredient_desc,
        img: row.ingredient_img,
        measure: row.measure,
      });
    }
  }
  return [...map.values()];
};

export const getAllRecipes = async ({ page = 1, perPage = 12, filter = {} }) => {
  const pool = getPool();
  const offset = (page - 1) * perPage;

  const conditions = [];
  const params = [];

  if (filter.category) {
    conditions.push('r.category = ?');
    params.push(filter.category);
  }
  if (filter.area) {
    conditions.push('r.area = ?');
    params.push(filter.area);
  }
  if (filter.ingredient) {
    conditions.push(`r.id IN (
      SELECT ri2.recipe_id FROM recipe_ingredients ri2
      JOIN ingredients i2 ON i2.id = ri2.ingredient_id
      WHERE i2.name LIKE ?
    )`);
    params.push(`%${filter.ingredient}%`);
  }
  if (filter.title) {
    conditions.push('r.title LIKE ?');
    params.push(`%${filter.title}%`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(DISTINCT r.id) AS total FROM recipes r ${where}`,
    params,
  );

  const [idRows] = await pool.query(
    `SELECT r.id FROM recipes r ${where} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
    [...params, perPage, offset],
  );

  const ids = idRows.map((r) => r.id);
  const paginationData = calculatePaginationData(total, page, perPage);

  if (!ids.length) return { data: [], ...paginationData };

  const [rows] = await pool.query(
    `${RECIPE_WITH_INGREDIENTS_SQL}
     WHERE r.id IN (${ids.map(() => '?').join(',')})
     ORDER BY r.created_at DESC`,
    ids,
  );

  return { data: groupRecipeRows(rows), ...paginationData };
};

export const getOwnRecipes = async ({ page = 1, perPage = 12, owner }) => {
  const pool = getPool();
  const offset = (page - 1) * perPage;

  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM recipes WHERE owner_id = ?',
    [owner],
  );

  const [idRows] = await pool.query(
    'SELECT id FROM recipes WHERE owner_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [owner, perPage, offset],
  );

  const ids = idRows.map((r) => r.id);
  const paginationData = calculatePaginationData(total, page, perPage);

  if (!ids.length) return { data: [], ...paginationData };

  const [rows] = await pool.query(
    `${RECIPE_WITH_INGREDIENTS_SQL}
     WHERE r.id IN (${ids.map(() => '?').join(',')})
     ORDER BY r.created_at DESC`,
    ids,
  );

  return { data: groupRecipeRows(rows), ...paginationData };
};

export const getRecipeById = async (recipeId) => {
  const pool = getPool();

  const [rows] = await pool.query(
    `${RECIPE_WITH_INGREDIENTS_SQL} WHERE r.id = ?`,
    [recipeId],
  );

  if (!rows.length) return null;

  return groupRecipeRows(rows)[0];
};

export const createRecipe = async (payload) => {
  const pool = getPool();
  const { title, category, owner, area, calories, instructions, description, thumb, time, ingredients } = payload;

  const [result] = await pool.query(
    `INSERT INTO recipes (title, category, owner_id, area, calories, instructions, description, thumb, time)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, category, owner, area || null, calories || null, instructions, description, thumb || null, time],
  );

  const recipeId = result.insertId;

  if (ingredients) {
    const parsed = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
    for (const ing of parsed) {
      await pool.query(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, measure) VALUES (?, ?, ?)',
        [recipeId, ing.id, ing.measure],
      );
    }
  }

  return getRecipeById(recipeId);
};

export const deleteRecipe = async (recipeId, userId) => {
  const pool = getPool();

  const [[recipe]] = await pool.query(
    'SELECT id, owner_id FROM recipes WHERE id = ?',
    [recipeId],
  );

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (recipe.owner_id !== userId) {
    throw createHttpError(403, 'You are not allowed to delete this recipe');
  }

  await pool.query('DELETE FROM recipes WHERE id = ?', [recipeId]);
};

export const addFavoriteRecipes = async (userId, recipeId) => {
  const pool = getPool();

  const [[existing]] = await pool.query(
    'SELECT 1 FROM user_favorites WHERE user_id = ? AND recipe_id = ?',
    [userId, recipeId],
  );

  if (existing) {
    throw createHttpError(400, 'Recipe is already in favorites');
  }

  await pool.query(
    'INSERT INTO user_favorites (user_id, recipe_id) VALUES (?, ?)',
    [userId, recipeId],
  );
};

export const delFavoriteRecipes = async (userId, recipeId) => {
  const pool = getPool();
  await pool.query(
    'DELETE FROM user_favorites WHERE user_id = ? AND recipe_id = ?',
    [userId, recipeId],
  );
};

export const getFavoriteRecipes = async ({ page = 1, perPage = 12, userId }) => {
  const pool = getPool();
  const offset = (page - 1) * perPage;

  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM user_favorites WHERE user_id = ?',
    [userId],
  );

  const [idRows] = await pool.query(
    `SELECT r.id FROM recipes r
     JOIN user_favorites uf ON uf.recipe_id = r.id
     WHERE uf.user_id = ?
     ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
    [userId, perPage, offset],
  );

  const ids = idRows.map((r) => r.id);
  const paginationData = calculatePaginationData(total, page, perPage);

  if (!ids.length) return { data: [], ...paginationData };

  const [rows] = await pool.query(
    `${RECIPE_WITH_INGREDIENTS_SQL}
     WHERE r.id IN (${ids.map(() => '?').join(',')})
     ORDER BY r.created_at DESC`,
    ids,
  );

  return { data: groupRecipeRows(rows), ...paginationData };
};
