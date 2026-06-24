export const parseFilterParams = (query) => {
  const { category, ingredient, search } = query;
  const filter = {};

  if (category) {
    filter.category = category;
  }
  if (ingredient) {
    filter.ingredient = ingredient;
  }
  if (search) {
    filter.title = search;
  }
  return filter;
};
