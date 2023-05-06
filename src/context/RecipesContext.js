import { createContext } from 'react';

export const RecipesContext = createContext();

const fetchAPI = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data); // futuramente alterar esse log para gravar os dados no contexto
};

const handleCategories = (link, search) => ({
  ingredientsURL: `https://www.${link}.com/api/json/v1/1/filter.php?i=${search}`,
  nameURL: `https://www.${link}.com/api/json/v1/1/search.php?s=${search}`,
  firstLetterURL: `https://www.${link}.com/api/json/v1/1/search.php?f=${search}`,
});

export const handleApiURL = (location, type, search) => {
  const mealURL = 'themealdb';
  let { ingredientsURL, nameURL, firstLetterURL } = handleCategories(mealURL, search);
  if (location === '/drinks') {
    const cocktailURL = 'thecocktaildb';
    ingredientsURL = handleCategories(cocktailURL, search).ingredientsURL;
    nameURL = handleCategories(cocktailURL, search).nameURL;
    firstLetterURL = handleCategories(cocktailURL, search).firstLetterURL;
  }
  switch (type) {
  case 'ingredients':
    fetchAPI(ingredientsURL);
    break;
  case 'name':
    fetchAPI(nameURL);
    break;
  case 'first-letter':
    fetchAPI(firstLetterURL);
    break;
  default:
    break;
  }
};
