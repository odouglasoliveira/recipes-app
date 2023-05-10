import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [item, setItem] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const { location: { pathname } } = useHistory();

  const getEndPoint = (path, id) => {
    if (path.includes('drinks')) {
      return {
        endPoint: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        suggestion: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      };
    }
    return {
      endPoint: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      suggestion: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    };
  };

  const fetchAPI = useCallback(async () => {
    const id = pathname.split('/').pop();
    const { endPoint, suggestion } = getEndPoint(pathname, id);
    const requestDrinksOrMeals = await fetch(endPoint);
    const dataDrinksOrMeals = await requestDrinksOrMeals.json();
    const requestSugestions = await fetch(suggestion);
    const dataSugestions = await requestSugestions.json();
    if (pathname.includes('meals')) {
      setItem(dataDrinksOrMeals.meals);
      setSuggestions(dataSugestions.drinks);
    }
    if (pathname.includes('drinks')) {
      setItem(dataDrinksOrMeals.drinks);
      setSuggestions(dataSugestions.meals);
    }
  }, [pathname]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const MAX = 6;
  const MAX_LENGHT = 13;
  return (
    <>
      <section>
        <img
          data-testid="recipe-photo"
          src={ pathname?.includes('meals')
            ? item[0]?.strMealThumb
            : item[0]?.strDrinkThumb }
          alt={
            pathname?.includes('meals')
              ? item[0]?.strMeal
              : item[0]?.strDrinkThumb
          }
          width="325"
          height="200"
        />

        <h1 data-testid="recipe-title">
          {
            pathname?.includes('meals')
              ? item[0]?.strMeal
              : item[0]?.strDrink
          }
        </h1>

        <h1 data-testid="recipe-category">
          {
            pathname?.includes('meals')
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
          pathname.includes('meals') && (
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
      </section>
      <section className="carrosel">
        {
          suggestions?.slice(0, MAX).map((suggestion, index) => (
            <div
              className="carrossel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <img
                src={
                  pathname?.includes('meals')
                    ? suggestion.strDrinkThumb
                    : suggestion.strMealThumb
                }
                alt={
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              </p>
            </div>))
        }
      </section>
    </>
  );
}
