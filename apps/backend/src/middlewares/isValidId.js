import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { recipeId } = req.params;
  if (!recipeId || !/^\d+$/.test(recipeId)) {
    throw createHttpError(400, 'Bad request: id must be a positive integer');
  }
  next();
};
