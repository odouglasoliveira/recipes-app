import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [item, setItem] = useState([]);
  const { location } = useHistory();

  const fetchAPI = useCallback(async () => {
    const id = location.pathname.split('/').pop();
    if (location.pathname.includes('/meals')) {
      const URL_MEALS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const apiMeals = await fetch(URL_MEALS);
      const data = await apiMeals.json();
      console.log(data.meals);
      setItem(data.meals);
    }
    if (location.pathname.includes('/drinks')) {
      const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const apiDrinks = await fetch(URL_DRINKS);
      const data = await apiDrinks.json();
      console.log(data.drink);
      setItem(data.drink);
    }
  }, [location]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const videoId = item[0]?.strYoutube.split('=').pop();

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ item[0]?.strMealThumb}
        alt={ item[0]?.strMeal }
        width="325"
        height="200"
      />

      <h1 data-testid="recipe-title">{ item[0]?.strMeal }</h1>

      <h1 data-testid="recipe-category">{ item[0]?.strCategory}</h1>

      {
        item.length !== 0 && (
          Object.keys(item[0]).map((key, index) => {
            if (key.includes('strIngredient')) {
              const ingredientIndex = parseInt(key.substring(13)) - 1;
              return (
                <p key={index} data-testid={`${ingredientIndex}-ingredient-name-and-measure`}>
                  {item[0][key]}
                </p>
              );
            }
            return null;
          })
        )
      }

      <p data-testid="instructions">{ item[0]?.strInstructions}</p>

      {
        location.pathname.includes('meals') && (
          <iframe
            width="325"
            height="200"
            src={ `https://www.youtube.com/embed/${videoId}` }
            title="Embedded YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }

    </>
  );
}
