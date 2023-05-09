import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [item, setItem] = useState([]);
  const { location } = useHistory();

  const fetchAPI = useCallback(async () => {
    const id = location.pathname.split('/').pop();
    if (location.pathname.includes('meals')) {
      const URL_MEALS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const apiMeals = await fetch(URL_MEALS);
      const data = await apiMeals.json();
      console.log(data.meals);
      setItem(data.meals);
    }
    if (location.pathname.includes('drinks')) {
      const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const apiDrinks = await fetch(URL_DRINKS);
      const data = await apiDrinks.json();
      console.log(data.drinks);
      setItem(data.drinks);
    }
  }, [location]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const MAX_LENGHT = 13;
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={
          location.pathname.includes('/meals')
            ? item[0]?.strMealThumb
            : item[0]?.strDrinkThumb
        }
        alt={
          location.pathname.includes('/meals')
            ? item[0]?.strMeal
            : item[0]?.strDrinkThumb
        }
        width="325"
        height="200"
      />

      <h1 data-testid="recipe-title">
        {
          location.pathname.includes('/meals')
            ? item[0]?.strMeal
            : item[0]?.strDrink
        }
      </h1>

      <h1 data-testid="recipe-category">
        {
          location.pathname.includes('/meals')
            ? item[0]?.strCategory
            : item[0]?.strAlcoholic
        }
      </h1>

      {
        item.length !== 0 && (
          Object.keys(item[0]).map((key, index) => {
            if (key.includes('strIngredient') && item[0][key] !== null) {
              const ingredientIndex = parseInt(key.substring(MAX_LENGHT), 10) - 1;
              return (
                <p
                  key={ index }
                  data-testid={
                    `${ingredientIndex}-ingredient-name-and-measure`
                  }
                >
                  { `${item[0][key]} ${item[0][`strMeasure${ingredientIndex + 1}`]}` }
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
            data-testid="video"
            width="325"
            height="200"
            src={
              `https://www.youtube.com/embed/${
                item[0]?.strYoutube.split('=').pop()}`
            }
            title="Embedded YouTube video"
            allow="accelerometer; autoplay;
            sclipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }

    </>
  );
}
