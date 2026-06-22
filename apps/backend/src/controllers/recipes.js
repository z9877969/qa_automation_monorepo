import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getOwnRecipes,
  addFavoriteRecipes,
  delFavoriteRecipes,
  getFavoriteRecipes,
  deleteRecipe,
} from '../services/recipes.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToPublicDir } from '../utils/saveFileToPublicDir.js';

export const getOwnRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const recipes = await getOwnRecipes({
    page,
    perPage,
    owner: req.user.id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found own recipes!',
    data: recipes,
  });
};

export const createRecipeController = async (req, res, next) => {
  try {
    let thumb = null;
    if (req.file) {
      thumb = await saveFileToPublicDir(req.file, 'recipes');
    }

    const recipe = await createRecipe({
      ...req.body,
      owner: req.user.id,
      thumb,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a recipe!',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const addFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await addFavoriteRecipes(userId, recipeId);

  res.json({
    status: 200,
    message: 'Recipe successfully added to favorites',
  });
};

export const delFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await delFavoriteRecipes(userId, recipeId);

  res.status(204).end();
};

export const getFavoriteRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const userId = req.user.id;

  const result = await getFavoriteRecipes({ page, perPage, userId });

  const message = result.totalItems > 0
    ? 'Successfully found favorite recipes!'
    : 'No favorite recipes found.';

  res.status(200).json({
    status: 200,
    message,
    ...result,
  });
};

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getAllRecipes({ page, perPage, filter });

  const message = recipes.totalItems > 0
    ? 'Successfully found recipes!'
    : 'No recipes found matching your criteria.';

  res.status(200).json({
    status: 200,
    message,
    data: recipes,
  });
};

export const deleteOwnRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  await deleteRecipe(recipeId, userId);

  res.status(200).json({
    status: 200,
    message: `Recipe with ID ${recipeId} has been successfully deleted.`,
  });
};
