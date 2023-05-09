import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { RecipesContext } from '../context/RecipesContext';

const MAX_CARDS = 12;

export default function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const [dataRecipes, setDataRecipes] = useState([]);
  const history = useHistory();

  const getEndPoint = (pathname) => {
    if (pathname === '/drinks') {
      return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  };

  const fetchDrinksOrMeals = useCallback(async () => {
    const { location: { pathname } } = history;
    const FETCH_ENDPOINT = getEndPoint(pathname);
    const response = await fetch(FETCH_ENDPOINT);
    const data = await response.json();
    const valuesOfData = Object.values(data);
    const reduceData = valuesOfData[0].splice(0, MAX_CARDS);
    setDataRecipes(reduceData);
  }, [history]);

  useEffect(() => {
    fetchDrinksOrMeals();
  }, [fetchDrinksOrMeals]);
  return (
    !recipes.length
      && (
        <ul>
          {
            dataRecipes.map((recipe, ind) => (<RecipeCard
              recipe={ recipe }
              index={ ind }
              key={ ind }
            />))
          }
        </ul>
      )
  );
}
