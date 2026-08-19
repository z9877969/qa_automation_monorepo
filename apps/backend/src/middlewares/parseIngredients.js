export const parseIngredients = (req, res, next) => {
  if (typeof req.body?.ingredients === 'string') {
    try {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    } catch {
      // leave the raw string in place; Joi will reject it with a clear error
    }
  }
  next();
};
