const formatRecipe = (recipe, type) => {
  if (type.includes('/meals')) {
    return ({
      id: recipe[0]?.idMeal,
      type: 'meal',
      nationality: recipe[0]?.strArea,
      category: recipe[0]?.strCategory,
      alcoholicOrNot: '',
      name: recipe[0]?.strMeal,
      image: recipe[0]?.strMealThumb,
    });
  }
  return ({
    id: recipe[0]?.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe[0]?.strCategory,
    alcoholicOrNot: recipe[0]?.strAlcoholic,
    name: recipe[0]?.strDrink,
    image: recipe[0]?.strDrinkThumb,
  });
};

export default formatRecipe;

export const addFavoriteRecipe = (item, pathname) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipe = formatRecipe(item, pathname);
  const newFavoriteRecipes = favoriteRecipes.filter((favorite) => (
    favorite.id !== recipe.id
  ));
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};

export const removeFavoriteRecipe = (item, pathname) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipe = formatRecipe(item, pathname);
  const newFavoriteRecipes = [...favoriteRecipes, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};
