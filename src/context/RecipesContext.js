import { createContext } from 'react';

export const RecipesContext = createContext();

const fetchURL = async (URL, location) => {
  const response = await fetch(URL);
  const data = await response.json();
  if (location === '/meals') return data.meals;
  return data.drinks;
};

const handleCategories = (link, search) => ({
  ingredientsURL: `https://www.${link}.com/api/json/v1/1/filter.php?i=${search}`,
  nameURL: `https://www.${link}.com/api/json/v1/1/search.php?s=${search}`,
  firstLetterURL: `https://www.${link}.com/api/json/v1/1/search.php?f=${search}`,
});

export const fetchAPI = (location, type, search) => {
  const mealURL = 'themealdb';
  let { ingredientsURL, nameURL, firstLetterURL } = handleCategories(mealURL, search);
  if (location === '/drinks') {
    const cocktailURL = 'thecocktaildb';
    ingredientsURL = handleCategories(cocktailURL, search).ingredientsURL;
    nameURL = handleCategories(cocktailURL, search).nameURL;
    firstLetterURL = handleCategories(cocktailURL, search).firstLetterURL;
  }
  switch (type) {
  case 'name':
    return fetchURL(nameURL, location);
  case 'first-letter':
    return fetchURL(firstLetterURL, location);
  default:
    return fetchURL(ingredientsURL, location);
  }
};
